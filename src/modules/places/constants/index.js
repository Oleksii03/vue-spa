const NOMINATIM_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_NOMINATIM_BASE_URL)
    ? import.meta.env.VITE_NOMINATIM_BASE_URL
    : ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD)
        ? 'https://nominatim.openstreetmap.org/reverse'
        : '/api/nominatim/reverse');

export { NOMINATIM_BASE_URL };
