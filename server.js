const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const DANDANPLAY_API = 'https://api.dandanplay.net';

// 代理弹弹play API
app.use('/api', async (req, res) => {
  try {
    const targetUrl = `${DANDANPLAY_API}${req.originalUrl}`;
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'User-Agent': 'Selene/1.0',
        'Origin': 'https://www.dandanplay.com',
        'Referer': 'https://www.dandanplay.com/',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    
    const data = await response.text();
    res.set('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
