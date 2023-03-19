export function randomGradientColor() {
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = hue1 + 60 > 360 ? hue1 - 300 : hue1 + 60;
  const saturation = Math.floor(Math.random() * 31) + 70;
  const lightness1 = Math.floor(Math.random() * 21) + 40;
  const lightness2 = Math.floor(Math.random() * 21) + 40;
  return `linear-gradient(${hue1}deg, hsl(${hue1}, ${saturation}%, ${lightness1}%),hsl(${hue2}, ${saturation}%, ${lightness2}%))`;
}
