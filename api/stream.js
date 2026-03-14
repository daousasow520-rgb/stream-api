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

    // cherche mp4 ou m3u8
    const match = html.match(/https?:\/\/[^"' ]+\.(mp4|m3u8)[^"' ]*/);

    if (!match) {
      return res.status(404).json({
        error: "stream not found"
      });
    }

    return res.status(200).json({
      stream: match[0]
    });

  } catch (error) {

    return res.status(500).json({
      error: "server error",
      message: error.toString()
    });

  }

}
