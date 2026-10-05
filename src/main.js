const COLORS = [
  { name: 'Red', hex: '#f94144' },
  { name: 'Orange', hex: '#f9844a' },
  { name: 'Yellow', hex: '#f9c74f' },
  { name: 'Green', hex: '#90be6d' },
  { name: 'Blue', hex: '#4cc9f0' },
  { name: 'Purple', hex: '#9b5de5' },
  { name: 'Pink', hex: '#ff5d8f' },
  { name: 'Brown', hex: '#8d6e63' },
  { name: 'White', hex: '#fffaf0' },
  { name: 'Black', hex: '#2d3142' }
];

const GRID_SIZE = 8;
const ERASER = '#fffaf0';

const state = {
  selectedColor: COLORS[6],
  cells: Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ERASER)
};

const palette = document.querySelector('#palette');
const artboard = document.querySelector('#artboard');
const selectedColorLabel = document.querySelector('#selected-color-label');
const resetBtn = document.querySelector('#reset-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const eraseBtn = document.querySelector('#erase-btn');

function renderPalette() {
  palette.innerHTML = '';

  COLORS.forEach((color) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'color-swatch';
    button.style.background = color.hex;
    button.title = color.name;
    button.setAttribute('aria-label', `Select ${color.name} color`);

    if (state.selectedColor.name === color.name) {
      button.classList.add('selected');
    }

    button.addEventListener('click', () => {
      state.selectedColor = color;
      selectedColorLabel.textContent = color.name;
      renderPalette();
    });

    palette.appendChild(button);
  });
}

function renderArtboard() {
  artboard.innerHTML = '';

  state.cells.forEach((cellColor, index) => {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'art-cell';
    cell.style.background = cellColor;
    cell.setAttribute('aria-label', `Color cell ${index + 1}`);

    cell.addEventListener('click', () => {
      state.cells[index] = state.selectedColor.hex;
      renderArtboard();
    });

    artboard.appendChild(cell);
  });
}

function resetBoard() {
  state.cells = Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ERASER);
  state.selectedColor = COLORS[6];
  selectedColorLabel.textContent = state.selectedColor.name;
  renderPalette();
  renderArtboard();
}

function rainbowBurst() {
  state.cells = state.cells.map(() => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    return randomColor.hex;
  });
  renderArtboard();
}

function eraseBoard() {
  state.selectedColor = { name: 'White', hex: ERASER };
  selectedColorLabel.textContent = 'White';
  renderPalette();
}

resetBtn.addEventListener('click', resetBoard);
rainbowBtn.addEventListener('click', rainbowBurst);
eraseBtn.addEventListener('click', eraseBoard);

selectedColorLabel.textContent = state.selectedColor.name;
renderPalette();
renderArtboard();
