// Cloudflare Pages Functions API: Track Clicks
// Route: /api/track (POST)

// In-memory fallback if KV binding is absent
const memoryStore = {
  totals: { whatsapp: 0, call: 0 },
  daily: {},
  pages: {},
  positions: {},
  recent: []
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    let payload = {};
    const contentType = request.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      payload = await request.json().catch(() => ({}));
    } else {
      const text = await request.text().catch(() => "");
      try {
        payload = JSON.parse(text);
      } catch (e) {
        payload = {};
      }
    }

    const eventRaw = String(payload.event || "").toLowerCase();
    const isWhatsApp = eventRaw.includes("whatsapp") || eventRaw === "wa";
    const isCall = eventRaw.includes("call") || eventRaw.includes("phone") || eventRaw === "tel";

    if (!isWhatsApp && !isCall) {
      return new Response(JSON.stringify({ error: "Invalid event type" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const eventType = isWhatsApp ? "whatsapp" : "call";
    const rawPage = String(payload.page || "/").trim() || "/";
    const page = rawPage.startsWith("/") ? rawPage : `/${rawPage}`;
    const position = String(payload.position || "other").trim().slice(0, 50);
    const link = String(payload.link || "").trim().slice(0, 200);
    const timestamp = Number(payload.timestamp) || Date.now();

    // Determine device from User-Agent
    const ua = request.headers.get("User-Agent") || "";
    let device = "Desktop";
    if (/mobile/i.test(ua)) {
      device = "Mobile";
    } else if (/tablet|ipad/i.test(ua)) {
      device = "Tablet";
    }

    // IST date formatting (UTC + 5:30)
    const istOffset = 5.5 * 3600 * 1000;
    const istDateObj = new Date(timestamp + istOffset);
    const dateStr = istDateObj.toISOString().split("T")[0]; // YYYY-MM-DD
    const timeStr = istDateObj.toISOString().replace("T", " ").substring(0, 19) + " IST";

    const clickRecord = {
      id: "clk_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
      event: eventType,
      page: page,
      position: position,
      device: device,
      link: link,
      timestamp: timestamp,
      time_ist: timeStr,
      date_ist: dateStr
    };

    // If Cloudflare KV is available, update persistent KV keys
    if (env && env.CLICKS_KV) {
      const kv = env.CLICKS_KV;

      // 1. Total counters
      const totalKey = `total:${eventType}`;
      const currentTotal = parseInt(await kv.get(totalKey) || "0", 10);
      await kv.put(totalKey, String(currentTotal + 1));

      // 2. Daily counters
      const dailyKey = `daily:${dateStr}:${eventType}`;
      const currentDaily = parseInt(await kv.get(dailyKey) || "0", 10);
      await kv.put(dailyKey, String(currentDaily + 1));

      // 3. Page counters (stored in a JSON map for efficiency)
      const pageKey = "stats:pages";
      let pageStats = {};
      try {
        const rawPages = await kv.get(pageKey);
        if (rawPages) pageStats = JSON.parse(rawPages);
      } catch (e) {}

      if (!pageStats[page]) {
        pageStats[page] = { whatsapp: 0, call: 0, total: 0 };
      }
      pageStats[page][eventType] = (pageStats[page][eventType] || 0) + 1;
      pageStats[page].total = (pageStats[page].total || 0) + 1;
      await kv.put(pageKey, JSON.stringify(pageStats));

      // 4. Position counters (stored in a JSON map)
      const posKey = "stats:positions";
      let posStats = {};
      try {
        const rawPos = await kv.get(posKey);
        if (rawPos) posStats = JSON.parse(rawPos);
      } catch (e) {}

      if (!posStats[position]) {
        posStats[position] = { whatsapp: 0, call: 0, total: 0 };
      }
      posStats[position][eventType] = (posStats[position][eventType] || 0) + 1;
      posStats[position].total = (posStats[position].total || 0) + 1;
      await kv.put(posKey, JSON.stringify(posStats));

      // 5. Recent Clicks Log (Last 100 clicks)
      const recentKey = "stats:recent_clicks";
      let recentList = [];
      try {
        const rawRecent = await kv.get(recentKey);
        if (rawRecent) recentList = JSON.parse(rawRecent);
      } catch (e) {}

      recentList.unshift(clickRecord);
      if (recentList.length > 100) {
        recentList = recentList.slice(0, 100);
      }
      await kv.put(recentKey, JSON.stringify(recentList));
    } else {
      // In-memory fallback
      memoryStore.totals[eventType]++;
      memoryStore.daily[dateStr] = memoryStore.daily[dateStr] || { whatsapp: 0, call: 0 };
      memoryStore.daily[dateStr][eventType]++;

      memoryStore.pages[page] = memoryStore.pages[page] || { whatsapp: 0, call: 0, total: 0 };
      memoryStore.pages[page][eventType]++;
      memoryStore.pages[page].total++;

      memoryStore.positions[position] = memoryStore.positions[position] || { whatsapp: 0, call: 0, total: 0 };
      memoryStore.positions[position][eventType]++;
      memoryStore.positions[position].total++;

      memoryStore.recent.unshift(clickRecord);
      if (memoryStore.recent.length > 100) memoryStore.recent.pop();
    }

    return new Response(JSON.stringify({
      success: true,
      event: eventType,
      page: page,
      position: position,
      timestamp: timestamp,
      time_ist: timeStr
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: "Internal Error",
      message: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
export { memoryStore };
