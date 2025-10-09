export { buildReverseUrl, buildSearchUrl };

function buildReverseUrl({ lat, lon, format = 'json', lang = 'uk' }) {
  if (
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_NOMINATIM_BASE_URL
  ) {
    const base = import.meta.env.VITE_NOMINATIM_BASE_URL;
    const u = new URL(base);
    u.searchParams.set('format', format);
    u.searchParams.set('lat', String(lat));
    u.searchParams.set('lon', String(lon));

    if (base.includes('.netlify/functions')) {
      u.searchParams.set('lang', lang);
    } else {
      u.searchParams.set('accept-language', lang);
    }

    return u.toString();
  }

  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD) {
    const target = new URL('https://nominatim.openstreetmap.org/reverse');
    target.searchParams.set('format', format);
    target.searchParams.set('lat', String(lat));
    target.searchParams.set('lon', String(lon));
    target.searchParams.set('accept-language', lang);

    const proxy = new URL('https://api.allorigins.win/raw');
    proxy.searchParams.set('url', target.toString());

    return proxy.toString();
  }

  const qs = new URLSearchParams({
    format,
    lat: String(lat),
    lon: String(lon),
    'accept-language': lang,
  }).toString();
  return `/api/nominatim/reverse?${qs}`;
}

function buildSearchUrl({ q, format = 'json', lang = 'uk', polygon_geojson = 1, limit = 1 }) {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
    const params = new URLSearchParams({
      format,
      q,
      'accept-language': lang,
      polygon_geojson: String(polygon_geojson),
      limit: String(limit),
    }).toString();
    return `/api/nominatim/search?${params}`;
  }

  // In production, use public CORS proxy for search requests
  const target = new URL('https://nominatim.openstreetmap.org/search');
  target.searchParams.set('format', format);
  target.searchParams.set('q', q);
  target.searchParams.set('accept-language', lang);
  target.searchParams.set('polygon_geojson', String(polygon_geojson));
  target.searchParams.set('limit', String(limit));

  const proxy = new URL('https://api.allorigins.win/raw');
  proxy.searchParams.set('url', target.toString());

  return proxy.toString();
}
