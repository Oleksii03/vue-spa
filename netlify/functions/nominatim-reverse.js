const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

exports.handler = async event => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers: CORS_HEADERS };
    }

    const { lat, lon, format = 'json', lang = 'uk' } = event.queryStringParameters || {};

    if (!lat || !lon) {
      return {
        statusCode: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required query parameters: lat, lon' }),
      };
    }

    const url = new URL('https://nominatim.openstreetmap.org/reverse');
    url.searchParams.set('format', format);
    url.searchParams.set('lat', lat);
    url.searchParams.set('lon', lon);

    const resp = await fetch(url.toString(), {
      headers: {
        'User-Agent':
          'TerraView/1.0 (+https://oleksii03.github.io/vue-spa; contact: aapd8896@gmail.com)',
        'Accept-Language': lang,
        Referer: 'https://oleksii03.github.io/vue-spa/',
      },
    });

    const text = await resp.text();

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        body: text,
      };
    }

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Proxy error', details: String(err) }),
    };
  }
};
