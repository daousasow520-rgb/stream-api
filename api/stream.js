import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const embedUrl = "https://uqload.is/embed-5e82mh3e60r1.html";

    const response = await fetch(embedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://uqload.is/"
      }
    });

    const html = await response.text();

    const regex = /https:\/\/v6\.uqload\.is\/hls2\/[^"]+master\.m3u8[^"]*/i;
    const match = html.match(regex);

    if (!match) {
      return res.status(404).json({ error: "stream not found" });
    }

    res.status(200).json({ stream: match[0] });

  } catch (e) {
    res.status(500).json({ error: "server error" });
  }
        }
