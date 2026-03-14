export default async function handler(req, res) {
  try {

    const embed = "https://uqload.is/embed-5e82mh3e60r1.html";

    const response = await fetch(embed, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    // chercher le lien mp4 dans la page
    const match = html.match(/https?:\/\/[^"' ]+\.mp4[^"' ]*/);

    if (!match) {
      return res.status(404).json({ error: "stream not found" });
    }

    const videoUrl = match[0];

    const video = await fetch(videoUrl);
    const buffer = await video.arrayBuffer();

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(Buffer.from(buffer));

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
