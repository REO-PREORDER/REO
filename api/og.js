export default function handler(req, res) {
  const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const id = searchParams.get('id');

  // 固定的漂亮封面圖與預覽標題
  const title = "REO代購 - 預購填單";
  const image = "https://kpvlemwmgehusbievyqj.supabase.co/storage/v1/object/public/images/HVIqacTbkAAQIVT.jpg";

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta property="og:title" content="${title}">
        <meta property="og:image" content="${image}">
        <meta property="og:description" content="點擊進入 REO 代購頁面參與最新預購！">
        <meta http-equiv="refresh" content="0;url=/?id=${id || ''}">
      </head>
      <body>
        <script>window.location.href = "/?id=${id || ''}";</script>
      </body>
    </html>
  `);
}
