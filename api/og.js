export default function handler(req, res) {
  const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const id = searchParams.get('id');
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>REO代購 - 預購填單</title>
        <meta property="og:title" content="REO代購 - 預購填單">
        <meta property="og:image" content="https://kpvlemwmgehusbievyqj.supabase.co/storage/v1/object/public/images/HVIqacTbkAAQIVT.jpg">
        <meta property="og:description" content="點擊進入 REO 代購頁面參與預購！">
        <meta http-equiv="refresh" content="0;url=/?id=${id || ''}">
      </head>
      <body>
        <script>window.location.href = "/?id=${id || ''}";</script>
      </body>
    </html>
  `);
}
