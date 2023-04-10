const imageInput = document.getElementById('imageInput');
const tileButton = document.getElementById('tileButton');
const saveButton = document.getElementById('saveButton');
const originalCanvas = document.getElementById('originalCanvas');
const tiledCanvas = document.getElementById('tiledCanvas');
const originalContext = originalCanvas.getContext('2d');
const tiledContext = tiledCanvas.getContext('2d');

let originalImage;

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    originalImage = new Image();
    originalImage.src = reader.result;
    originalImage.onload = () => {
      originalCanvas.width = originalImage.width;
      originalCanvas.height = originalImage.height;
      originalContext.drawImage(originalImage, 0, 0);
    };
  };
});

tileButton.addEventListener('click', () => {
  const tileCount = prompt('How many rows x columns would you like to use?');
  const tileWidth = originalImage.width / tileCount;
  const tileHeight = originalImage.height / tileCount;
  tiledCanvas.width = tileWidth * tileCount;
  tiledCanvas.height = tileHeight * tileCount;
  for (let x = 0; x < tileCount; x++) {
    for (let y = 0; y < tileCount; y++) {
      tiledContext.drawImage(originalImage, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    }
  }
});

saveButton.addEventListener('click', () => {
  const dataURL = tiledCanvas.toDataURL();
  const link = document.createElement('a');
  link.download = 'tiled-image.png';
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

