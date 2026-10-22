export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const id = searchParams.get('id');

  // 預設的標題與圖片
  let title = "REO代購 - 預購填單";
  let image = "https://reo-pre-order.com.tw/logo.png"; // 可以換成你的預設圖片網址

  // 如果你有需要針對特定 id 給予不同標題，也可以在這裡用簡單的判斷式處理

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta property="og:title" content="${title}">
        <meta property="og:image" content="${image}">
        <meta property="og:description" content="點擊進入 REO 代購頁面參與預購！">
        <meta http-equiv="refresh" content="0;url=/?id=${id || ''}">
      </head>
      <body>
        <script>window.location.href = "/?id=${id || ''}";</script>
      </body>
    </html>
  `);
}
