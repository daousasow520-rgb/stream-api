import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const embedUrl = "https://vidzy.live/embed-lz3bcc50g4mw.html";

    const response = await fetch(embedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://vidzy.live/"
      }
    });

    const html = await response.text();

    const regex = /https:\/\/v6\.vidzy\.live\/hls2\/[^"]+master\.m3u8[^"]*/i;
    const match = html.match(regex);

    if (!match) {
      return res.status(404).json({ error: "stream not found" });
    }

    res.status(200).json({ stream: match[0] });

  } catch (e) {
    res.status(500).json({ error: "server error" });
  }
        }
