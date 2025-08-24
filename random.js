function hashCode(token) {
  var hash = 0;
  if (token.length === 0) return hash;
  for (let i = 0; i < token.length; i++) {
    hash = ((hash << 5) - hash) + token.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function makeRandomAvatar(token) {
  const canvas = document.createElement('canvas', {class: 'my-canvas'});
  const pixelSize = 50;
  canvas.id = 'random-avatar-gen';
  canvas.height = pixelSize * 5;
  canvas.width = pixelSize * 5;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const codes = token.split('').map(char => char.charCodeAt(0));
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < codes.length; i++) {
    r = (r + codes[i] * 1) % 256;
    g = (g + codes[i] * 2) % 256;
    b = (b + codes[i] * 3) % 256;
  }

  const hash = hashCode(token);

  // ctx.fillStyle = 'rgb(240, 240, 240)';
  // ctx.fillRect(0, 0, 5 * pixelSize, 5 * pixelSize);
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

  for (let i = 0; i < 15; ++i) {
    const col = Math.floor(i / 5);
    const row = i % 5;
    const bit = (hash >> i) & 1;
    if (bit) {
      ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
      if (i < 10) {
        ctx.fillRect(
            (4 - col) * pixelSize, row * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  const dataUrl = canvas.toDataURL('image/png');
  canvas.parentElement.removeChild(canvas);
  return dataUrl;
}

window.onload = () => {
  const image = document.getElementById('avatar');
  const randomText = Math.random().toString(36).substring(2, 15);
  image.src = makeRandomAvatar(randomText);
  const input = document.getElementById('input');
  input.value = randomText;  // show the random text in the input box

  document.getElementById('button').addEventListener('click', () => {
    const text = input.value;
    if (text) {
      image.src = makeRandomAvatar(text);
    }
  });
}
