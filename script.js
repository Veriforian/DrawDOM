// CACHE / OPTS
let border = true;
let boxes = [];
let rows = 16;
let columns = 16;
let currColor = 'black';

const clearGrid = () => {
  boxes.forEach((box) => {
    box.style.backgroundColor = 'white';
    border ? (box.style.border = '1px solid black') : '';
  });
};

const onNewClick = () => {
  rows = parseInt(prompt('How many rows?')) || false;
  columns = parseInt(prompt('How many columns?')) || false;

  while (
    isNaN(rows) ||
    isNaN(columns) ||
    rows < 1 ||
    columns < 1 ||
    rows > 100 ||
    columns > 100
  ) {
    alert('Invalid input. Please try again. (1-100)');

    rows = parseInt(prompt('How many rows?'));
    columns = parseInt(prompt('How many columns?'));
  }

  document.querySelector('.container').innerHTML = '';

  createGrid(rows, columns);
};

const toggleBorder = () => {
  border = !border;

  boxes.forEach((box) => {
    border
      ? (box.style.border = '1px solid black')
      : (box.style.border = 'none');
  });
};

const changeColor = () => {
  let color = document.querySelector('.color_wheel').value;

  currColor = color;
};

const saveBoxes = () => {
  const key = prompt('Enter a name for your grid:');

  while (!key) {
    alert('Invalid input. Please try again.');

    key = prompt('Enter a name for your grid:');
  }

  // Loop over boxes to save the background color
  let colors = [];

  // Save row and column count to recreate grid
  colors.push(rows);
  colors.push(columns);

  boxes.forEach((box) => {
    colors.push(box.style.backgroundColor);
  });

  localStorage.setItem(key, JSON.stringify(colors));

  alert('Grid saved.');
};

const loadBoxes = () => {
  const key = prompt('Enter the name of the grid to load:');

  while (!key) {
    alert('Invalid input. Please try again.');

    key = prompt('Enter the name of the grid to load:');
  }

  const data = JSON.parse(localStorage.getItem(key));

  if (!data || data.length === 0) {
    alert('Grid not found.');
    return;
  }

  // Set grid to the correct size
  rows = data.shift();
  columns = data.shift();

  document.querySelector('.container').innerHTML = '';

  createGrid(rows, columns);

  // Loop over boxes to load the background color
  boxes.forEach((box, i) => {
    box.style.backgroundColor = data[i];
  });

  alert('Grid loaded.');
};

const clearStorage = () => {
  localStorage.clear();

  alert('Storage cleared.');
};

const onHover = (e) => {
  e.preventDefault();

  e.target.style.backgroundColor = `${currColor || 'black'}`;
};

const createGrid = (createRows, createColumns) => {
  let divs = createRows * createColumns;
  let containerWidth = Math.floor(window.innerWidth * 0.4);
  let boxWidth = Math.floor(containerWidth / createColumns);
  let container = document.querySelector('.container');

  // reset cache
  boxes = [];

  for (var i = 0; i < divs; i++) {
    // Create div
    let temp = document.createElement('div');

    temp.style = `width: ${boxWidth}px; height: ${boxWidth}px; display: inline-block; ${
      border ? 'border: 1px solid black;' : ''
    }`;
    temp.classList.add('box');

    // Add event listener
    temp.addEventListener('dragover', onHover);
    temp.addEventListener('onmousedown', (e) => e.preventDefault());

    // Add to DOM
    container.appendChild(temp);

    // Add to cache
    boxes.push(temp);
  }

  container.style = `width: ${boxWidth * createColumns}px; `;
};

const init = () => {
  createGrid(rows, columns);

  document.querySelector('.change').addEventListener('click', onNewClick);
  document.querySelector('.clear').addEventListener('click', clearGrid);
  document.querySelector('.borders').addEventListener('click', toggleBorder);
  document.querySelector('.color_wheel').addEventListener('input', changeColor);
  document.querySelector('.save').addEventListener('click', saveBoxes);
  document.querySelector('.load').addEventListener('click', loadBoxes);
  document
    .querySelector('.resetStorage')
    .addEventListener('click', clearStorage);
};

init();
