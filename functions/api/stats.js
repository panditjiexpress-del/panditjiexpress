// Cloudflare Pages Functions API: Stats & Analytics Retrieval
// Route: /api/stats (GET, POST)

import { memoryStore } from "./track.js";

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400"
    }
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  const istOffset = 5.5 * 3600 * 1000;
  const now = new Date(Date.now() + istOffset);
  const todayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

  // Generate last 14 days dates
  const last14Days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() + istOffset - i * 24 * 3600 * 1000);
    last14Days.push(d.toISOString().split("T")[0]);
  }

  let totalWhatsApp = 0;
  let totalCalls = 0;
  let todayWhatsApp = 0;
  let todayCalls = 0;
  let pageStats = {};
  let positionStats = {};
  let recentClicks = [];
  const dailyTrends = [];

  if (env && env.CLICKS_KV) {
    const kv = env.CLICKS_KV;

    // Fetch totals
    const [rawTotalWa, rawTotalCall, rawTodayWa, rawTodayCall, rawPages, rawPos, rawRecent] = await Promise.all([
      kv.get("total:whatsapp"),
      kv.get("total:call"),
      kv.get(`daily:${todayStr}:whatsapp`),
      kv.get(`daily:${todayStr}:call`),
      kv.get("stats:pages"),
      kv.get("stats:positions"),
      kv.get("stats:recent_clicks")
    ]);

    totalWhatsApp = parseInt(rawTotalWa || "0", 10);
    totalCalls = parseInt(rawTotalCall || "0", 10);
    todayWhatsApp = parseInt(rawTodayWa || "0", 10);
    todayCalls = parseInt(rawTodayCall || "0", 10);

    try {
      if (rawPages) pageStats = JSON.parse(rawPages);
    } catch (e) {}

    try {
      if (rawPos) positionStats = JSON.parse(rawPos);
    } catch (e) {}

    try {
      if (rawRecent) recentClicks = JSON.parse(rawRecent);
    } catch (e) {}

    // Fetch daily trend numbers for last 14 days
    const dailyPromises = last14Days.map(async (d) => {
      const [wa, call] = await Promise.all([
        kv.get(`daily:${d}:whatsapp`),
        kv.get(`daily:${d}:call`)
      ]);
      const wCount = parseInt(wa || "0", 10);
      const cCount = parseInt(call || "0", 10);
      return {
        date: d,
        whatsapp: wCount,
        call: cCount,
        total: wCount + cCount
      };
    });

    const dailyResults = await Promise.all(dailyPromises);
    dailyTrends.push(...dailyResults);
  } else {
    // In-memory fallback
    totalWhatsApp = memoryStore.totals.whatsapp || 0;
    totalCalls = memoryStore.totals.call || 0;
    todayWhatsApp = (memoryStore.daily[todayStr] && memoryStore.daily[todayStr].whatsapp) || 0;
    todayCalls = (memoryStore.daily[todayStr] && memoryStore.daily[todayStr].call) || 0;
    pageStats = memoryStore.pages || {};
    positionStats = memoryStore.positions || {};
    recentClicks = memoryStore.recent || [];

    for (const d of last14Days) {
      const wCount = (memoryStore.daily[d] && memoryStore.daily[d].whatsapp) || 0;
      const cCount = (memoryStore.daily[d] && memoryStore.daily[d].call) || 0;
      dailyTrends.push({
        date: d,
        whatsapp: wCount,
        call: cCount,
        total: wCount + cCount
      });
    }
  }

  // Format top pages as sorted list
  const pagesList = Object.entries(pageStats).map(([page, data]) => ({
    page,
    whatsapp: data.whatsapp || 0,
    call: data.call || 0,
    total: (data.whatsapp || 0) + (data.call || 0)
  })).sort((a, b) => b.total - a.total);

  // Format positions as sorted list
  const positionsList = Object.entries(positionStats).map(([position, data]) => ({
    position,
    whatsapp: data.whatsapp || 0,
    call: data.call || 0,
    total: (data.whatsapp || 0) + (data.call || 0)
  })).sort((a, b) => b.total - a.total);

  const responseData = {
    summary: {
      total_whatsapp: totalWhatsApp,
      total_calls: totalCalls,
      total_clicks: totalWhatsApp + totalCalls,
      today_whatsapp: todayWhatsApp,
      today_calls: todayCalls,
      today_clicks: todayWhatsApp + todayCalls,
      today_date: todayStr
    },
    top_pages: pagesList,
    positions: positionsList,
    daily_trends: dailyTrends,
    recent_clicks: recentClicks.slice(0, 50),
    storage_type: env && env.CLICKS_KV ? "Cloudflare KV (Persistent)" : "In-Memory (Live Edge)",
    updated_at: new Date().toISOString()
  };

  return new Response(JSON.stringify(responseData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}

// Support reset / test action with PIN protection
export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const pin = url.searchParams.get("pin");

  // Admin PIN protection (default: panditji2026)
  if (pin !== "panditji2026") {
    return new Response(JSON.stringify({ error: "Unauthorized: Invalid PIN" }), {
      status: 401,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  if (action === "reset") {
    if (env && env.CLICKS_KV) {
      const kv = env.CLICKS_KV;
      await Promise.all([
        kv.put("total:whatsapp", "0"),
        kv.put("total:call", "0"),
        kv.put("stats:pages", "{}"),
        kv.put("stats:positions", "{}"),
        kv.put("stats:recent_clicks", "[]")
      ]);
    }
    memoryStore.totals = { whatsapp: 0, call: 0 };
    memoryStore.daily = {};
    memoryStore.pages = {};
    memoryStore.positions = {};
    memoryStore.recent = [];

    return new Response(JSON.stringify({ success: true, message: "Counters reset successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  return new Response(JSON.stringify({ error: "Unknown action" }), {
    status: 400,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}
