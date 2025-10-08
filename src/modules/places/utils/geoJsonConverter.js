import { generateColorById } from './colorUtils.js';

export function convertToGeoJSON(polygons) {
  if (!Array.isArray(polygons)) {
    throw new Error('Polygons must be an array');
  }

  const features = polygons.map(polygon => {
    if (!polygon.id || !polygon.name || !Array.isArray(polygon.polygon)) {
      throw new Error('Invalid polygon structure');
    }

    const coordinates = polygon.polygon.map(coord => [coord.lng, coord.lat]);

    if (coordinates.length > 0) {
      const first = coordinates[0];
      const last = coordinates[coordinates.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        coordinates.push([...first]);
      }
    }

    const color = generateColorById(polygon.id);

    return {
      type: 'Feature',
      properties: {
        id: polygon.id,
        name: polygon.name,
        color: color,
        fillColor: color,
        fillOpacity: 0.3,
        weight: 2,
        opacity: 0.8,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates],
      },
    };
  });

  return {
    type: 'FeatureCollection',
    features: features,
  };
}
