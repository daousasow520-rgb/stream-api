// api/proxy.js
export default async function handler(req, res) {
  try {
    // On récupère l'URL passée en query
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    // On récupère le flux depuis le serveur distant
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0" // certains serveurs exigent un UA valide
      }
    });

    // Convertit en buffer pour renvoyer le flux
    const buffer = await response.arrayBuffer();

    // On renvoie le flux avec CORS friendly
    res.setHeader("Content-Type", "video/mp4"); // ou "application/vnd.apple.mpegurl" pour m3u8
    res.setHeader("Access-Control-Allow-Origin", "*"); // clé pour AppCreator24
    res.send(Buffer.from(buffer));

  } catch (err) {
    res.status(500).json({ error: "server error", message: err.toString() });
  }
        }
