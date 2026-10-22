import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://kpvlemwmgehusbievyqj.supabase.co', 
  process.env.SUPABASE_ANON_KEY || 'sb_publishable_793taIIHtCXRa3JtzkdcRg_Q18IjaWo'
);

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const id = searchParams.get('id');

  let title = "REO代購 - 預購填單";
  let image = "https://你的預設Logo圖片網址.png";

  if (id) {
    const { data, error } = await supabase
      .from('groups')
      .select('name, image')
      .eq('id', id)
      .single();

    if (data) {
      title = `${data.name} - REO代購`;
      if (data.image) image = data.image;
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
        <meta property="og:description" content="點擊進入 REO 代購頁面參與預購！">
        <meta http-equiv="refresh" content="0;url=/?id=${id || ''}">
      </head>
      <body>
        <script>window.location.href = "/?id=${id || ''}";</script>
      </body>
    </html>
  `);
}
