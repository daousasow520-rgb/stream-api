export default async function handler(req, res) {
  try {

    const stream = "https://zebi.xalaflix.design/movie/1407934/free-kyh3f1/master.m3u8";

    const response = await fetch(stream, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.text();

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(data);

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
