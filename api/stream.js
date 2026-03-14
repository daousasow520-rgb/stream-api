export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "No URL provided" });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": url
      }
    });

    const html = await response.text();

    const match = html.match(/https?:\/\/[^"' ]+\.(mp4|m3u8)[^"' ]*/);

    if (!match) {
      return res.status(404).json({ error: "stream not found" });
    }

    const stream = match[0];

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ stream });

  } catch (err) {
    return res.status(500).json({ error: "server error", message: err.toString() });
  }
}
