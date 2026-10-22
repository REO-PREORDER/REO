import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const id = searchParams.get('id');

  let title = "REO代購 - 預購填單";
  let image = "https://kpvlemwmgehusbievyqj.supabase.co/storage/v1/object/public/images/HVIqacTbkAAQIVT.jpg"; // 預設備用圖

  if (id) {
    // 從 Supabase 的 groups 表格用 id 找出該團的名稱與圖片
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
        // 如果是 Google 雲端硬碟連結，幫忙轉換成可直接預覽的格式 (若已經是 Supabase 圖片網址則直接使用)
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
