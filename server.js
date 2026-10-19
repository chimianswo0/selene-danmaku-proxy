const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const DANDANPLAY_API = 'https://api.dandanplay.net';

// 代理弹弹play API
app.use('/api', async (req, res) => {
  try {
    const targetUrl = `${DANDANPLAY_API}${req.originalUrl}`;
    console.log('Proxying to:', targetUrl);
    
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://www.dandanplay.com',
        'Referer': 'https://www.dandanplay.com/',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': 'dandanplay_token=anonymous',
      },
    });
    
    const data = await response.text();
    console.log('Response status:', response.status);
    console.log('Response length:', data.length);
    if (data.length < 1000) {
      console.log('Response:', data);
    }
    
    res.set('Content-Type', 'application/json');
    res.status(response.status);
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
