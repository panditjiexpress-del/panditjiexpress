// Cloudflare Pages Functions Middleware
// Enables Markdown Content Negotiation (acceptmarkdown.com) & Agent-Friendly 404s

const NOT_FOUND_MARKDOWN = `# 404 Not Found

The requested resource was not found on Pandit Ji Express (https://panditjiexpress.in).

## Available Resources & Guidance
- **Agent Instructions & When-to-Use**: https://panditjiexpress.in/llms.txt
- **Full Service Directory & Machine-Readable Spec**: https://panditjiexpress.in/llms-full.txt
- **XML Sitemap**: https://panditjiexpress.in/sitemap.xml
- **Pooja Services Index**: https://panditjiexpress.in/services
- **Online Booking Form**: https://panditjiexpress.in/booking

For direct priest consultation and ceremony scheduling in Bangalore, contact Pandit Shyam Sundar at +91 90657 88789.
`;

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const acceptHeader = request.headers.get("Accept") || "";
  const wantsMarkdown = acceptHeader.toLowerCase().includes("text/markdown");

  // Call the downstream asset or route handler
  const response = await next();

  // Handle 404 status (both from static 404.html and missing assets)
  if (response.status === 404) {
    if (wantsMarkdown) {
      return new Response(NOT_FOUND_MARKDOWN, {
        status: 404,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        }
      });
    }

    const headers = new Headers(response.headers);
    headers.set("Vary", "Accept");
    return new Response(response.body, {
      status: 404,
      statusText: "Not Found",
      headers: headers
    });
  }

  // Handle Markdown Content Negotiation on homepage (/) and root paths
  if (wantsMarkdown && (url.pathname === "/" || url.pathname === "/index.html")) {
    // Fetch llms.txt as the authoritative Markdown representation of the site
    const markdownUrl = new URL("/llms.txt", request.url);
    const markdownResponse = await context.env.ASSETS ? await context.env.ASSETS.fetch(markdownUrl) : await fetch(markdownUrl);
    
    let markdownBody = "";
    if (markdownResponse && markdownResponse.ok) {
      markdownBody = await markdownResponse.text();
    } else {
      markdownBody = `# Pandit Ji Express\n\n> Verified North Indian Vedic Pandit & Purohit Services in Bangalore\n\nSee full index at https://panditjiexpress.in/llms.txt\n`;
    }

    return new Response(markdownBody, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept",
        "Cache-Control": "public, max-age=0, must-revalidate"
      }
    });
  }

  // Ensure Vary: Accept is always present on HTML and other responses
  const headers = new Headers(response.headers);
  const existingVary = headers.get("Vary");
  if (existingVary) {
    if (!existingVary.toLowerCase().includes("accept")) {
      headers.set("Vary", `${existingVary}, Accept`);
    }
  } else {
    headers.set("Vary", "Accept");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}
