// CACHE / OPTS
let border = true;
let boxes = [];

const clearGrid = () => {
  boxes.forEach((box) => {
    box.style.backgroundColor = 'white';
    border ? (box.style.border = '1px solid black') : '';
  });
};

const onNewClick = () => {
  let rows = parseInt(prompt('How many rows?'));
  let columns = parseInt(prompt('How many columns?'));

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

const saveBoxes = () => {
  const key = prompt('Enter a name for your grid:');

  while (!key) {
    alert('Invalid input. Please try again.');

    key = prompt('Enter a name for your grid:');
  }

  // Loop over boxes to save the background color
  let colors = [];

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
  e.target.style.backgroundColor = 'black';
};

const createGrid = (rows, columns) => {
  let divs = rows * columns;
  let containerWidth = Math.floor(window.innerWidth * 0.4);
  let boxWidth = Math.floor(containerWidth / columns);
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
    temp.addEventListener('mouseover', onHover);

    // Add to DOM
    container.appendChild(temp);

    // Add to cache
    boxes.push(temp);
  }

  container.style = `width: ${boxWidth * columns}px;`;
};

const init = () => {
  createGrid(16, 16);

  document.querySelector('.change').addEventListener('click', onNewClick);
  document.querySelector('.clear').addEventListener('click', clearGrid);
  document.querySelector('.borders').addEventListener('click', toggleBorder);
  document.querySelector('.save').addEventListener('click', saveBoxes);
  document.querySelector('.load').addEventListener('click', loadBoxes);
  document
    .querySelector('.resetStorage')
    .addEventListener('click', clearStorage);
};

init();
