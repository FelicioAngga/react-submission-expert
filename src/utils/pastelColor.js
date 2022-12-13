const categoryColor = [
  '#E97777', '#E7FBBE', '#98A8F8', '#D9D7F1', '#FEBE8C',
  '#B1BCE6', '#99C4C8', '#BE8C63', '#C3DBD9', '#9AD0EC',
];

function getRandomPastelColor() {
  const color = categoryColor[Math.floor(Math.random() * categoryColor.length)];
  return color;
}

export { categoryColor, getRandomPastelColor };
