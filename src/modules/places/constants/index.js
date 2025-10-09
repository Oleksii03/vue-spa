const NOMINATIM_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_NOMINATIM_BASE_URL)
    ? import.meta.env.VITE_NOMINATIM_BASE_URL
    : ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD)
        ? 'https://nominatim.openstreetmap.org/reverse'
        : '/api/nominatim/reverse');

export { NOMINATIM_BASE_URL, buildReverseUrl };

function buildReverseUrl({ lat, lon, format = 'json', lang = 'uk' }) {
  // If override provided (e.g., Netlify/Vercel/Cloudflare proxy)
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_NOMINATIM_BASE_URL) {
    const base = import.meta.env.VITE_NOMINATIM_BASE_URL;
    const u = new URL(base);
    u.searchParams.set('format', format);
    u.searchParams.set('lat', String(lat));
    u.searchParams.set('lon', String(lon));

    // Netlify function supports `lang` param, direct Nominatim supports `accept-language`
    if (base.includes('.netlify/functions')) {
      u.searchParams.set('lang', lang);
    } else {
      u.searchParams.set('accept-language', lang);
    }

    return u.toString();
  }

  // Production fallback (GitHub Pages without backend): use AllOrigins CORS proxy
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

  // Dev: use Vite proxy
  const qs = new URLSearchParams({ format, lat: String(lat), lon: String(lon), 'accept-language': lang }).toString();
  return `/api/nominatim/reverse?${qs}`;
}
