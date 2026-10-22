import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const id = searchParams.get('id');

  let title = "REO代購 - 預購填單";
  let image = "https://kpvlemwmgehusbievyqj.supabase.co/storage/v1/object/public/images/HVIqacTbkAAQIVT.jpg";

  try {
    if (id && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
      const { data, error } = await supabase
        .from('groups')
        .select('團務名稱, 圖片')
        .eq('id', id)
        .single();

      if (data && !error) {
        if (data["團務名稱"]) {
          title = `${data["團務名稱"]} - REO代購 預購填單`;
        }
        if (data["圖片"]) {
          let imgUrl = data["圖片"];
          if (imgUrl.includes('drive.google.com')) {
            const fileIdMatch = imgUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (fileIdMatch) {
              image = `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
            }
          } else {
            image = imgUrl;
          }
        }
      }
    }
  } catch (err) {
    // 就算資料庫連線失敗，也不會報 500，會安全使用預設圖與標題
    console.error(err);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta property="og:title" content="${title}">
        <meta property="og:image" content="${image}">
        <meta property="og:description" content="點擊進入查看商品詳情並填寫預購單！">
        <meta http-equiv="refresh" content="0;url=/?id=${id || ''}">
      </head>
      <body>
        <script>window.location.href = "/?id=${id || ''}";</script>
      </body>
    </html>
  `);
}
