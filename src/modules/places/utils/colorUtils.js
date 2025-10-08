export function generateColorById(id) {
  const hash = Math.abs(
    String(id)
      .split('')
      .reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)
  );

  const hue = hash % 360;
  const saturation = 70 + (hash % 30);
  const lightness = 45 + (hash % 20);

  const l = lightness / 100;
  const a = (saturation * Math.min(l, 1 - l)) / 100;
  const f = n => {
    const k = (n + hue / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}
