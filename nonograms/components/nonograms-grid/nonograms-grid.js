/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
import {
  easyNonograms,
  mediumNonograms,
  hardNonograms,
} from '../nonograms-base/nonograms-base';

let clickedCount = 0;
const cross = document.createElement('div');
const app = document.querySelector('#app');

// randomize what template we get
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function resetNonogram() {
  const cells = document.querySelectorAll('.nonogram-table .td__content .td__cell');
  cells.forEach((cell) => {
    if (cell.classList.contains('clicked')) {
      cell.classList.remove('clicked');
    }
    if (cell.childElementCount > 0) {
      cell.removeChild(cross);
    }
  });
  clickedCount = 0;
}

export function clearNonogram() {
  const cells = document
    .querySelectorAll('.nonogram-table .td__content .td__cell');
  const app = document.querySelector('#app');
  const table = document.querySelector('#app .nonogram-table');
  app.removeChild(table);
  clickedCount = 0;
  cells.forEach((cell) => {
    if (cell.classList.contains('clicked')) {
      cell.classList.remove('clicked');
    }
    if (cell.childElementCount > 0) {
      cell.removeChild(cross);
    }
  });
}

// counting ones for create nonograms first column and row
// (with numbers)
// this function return object with two arrays
// two arrays with arrays (sry)
function countGroups(matrix) {
  const rows = matrix.map((row) => {
    const groups = [];
    let currentGroup = 0;

    for (let i = 0; i < row.length; i++) {
      if (row[i] === 1) {
        currentGroup++;
      } else if (currentGroup > 0) {
        groups.push(currentGroup);
        currentGroup = 0;
      }
    }

    if (currentGroup > 0) {
      groups.push(currentGroup);
    }

    return groups;
  });

  const columns = matrix[0].map((col, i) => {
    const column = matrix.map((row) => row[i]);
    const groups = [];
    let currentGroup = 0;

    for (let j = 0; j < column.length; j++) {
      if (column[j] === 1) {
        currentGroup++;
      } else if (currentGroup > 0) {
        groups.push(currentGroup);
        currentGroup = 0;
      }
    }

    if (currentGroup > 0) {
      groups.push(currentGroup);
    }

    return groups;
  });

  return { rows, columns };
}

// geting template from DB
function getNonogram(dif) {
  let item;
  let id;
  switch (dif) {
    case 'easy':
      // yea, hardcode
      // lesh go!!!
      id = getRandomInt(1, 15).toString();
      item = easyNonograms.find((obj) => obj.id === id);
      break;
    case 'medium':
      id = getRandomInt(16, 30).toString();
      item = mediumNonograms.find((obj) => obj.id === id);
      break;
    case 'hard':
      id = getRandomInt(31, 34).toString();
      item = hardNonograms.find((obj) => obj.id === id);
      break;
    default:
      console.error('Dificulty not chosen');
      break;
  }
  return item.nonogram;
}
export function createNonogramTable(dif) {
  const nonogramGrid = document.createElement('table');
  nonogramGrid.className = 'nonogram-table';
  const nonogram = getNonogram(dif);
  const nonogramObj = countGroups(nonogram);
  const gridHeader = document.createElement('tr');
  gridHeader.className = 'tb__header';
  // добавление пустой ячейки для правильной видимости
  const emptySlot = document.createElement('td');
  emptySlot.className = 'header__empty';
  gridHeader.appendChild(emptySlot);
  for (let index = 0; index < nonogramObj.columns.length; index++) {
    const element = document.createElement('td');
    element.className = 'tb__header__col';
    element.textContent = nonogramObj.columns[index].join('\n');
    gridHeader.appendChild(element);
  }
  nonogramGrid.appendChild(gridHeader);
  for (let index = 0; index < nonogramObj.rows.length; index++) {
    const row = document.createElement('tr');
    row.className = 'td__content';
    row.id = `row-${index + 1}`;
    const firstColumn = document.createElement('td');
    const content = nonogramObj.rows[index].join(' ');
    firstColumn.className = 'td__first__col';
    firstColumn.id = `row-${index + 1}`;
    firstColumn.textContent = content;
    row.appendChild(firstColumn);
    for (let index1 = 0; index1 < nonogramObj.columns.length; index1++) {
      const element = document.createElement('td');
      element.className = 'td__cell';
      const content = nonogram[index][index1];
      if (content === 1) {
        element.classList.add('td__cell__filled');
      }
      row.appendChild(element);
    }
    nonogramGrid.appendChild(row);
  }
  const cells = nonogramGrid.querySelectorAll('.td__cell');
  const filledCells = nonogramGrid.querySelectorAll('.td__cell__filled');
  cross.className = 'cross';
  cells.forEach((cell) => {
    cell.addEventListener('click', function () {
      this.classList.toggle('clicked');
      if (cell.childElementCount > 0) {
        cell.removeChild(cross);
      }
    });
  });
  cells.forEach((cell) => {
    cell.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      cell.classList.remove('clicked');
      if (cell.childElementCount > 0) {
        cell.removeChild(cross);
      } else {
        cell.appendChild(cross);
      }
    });
  });
  filledCells.forEach((filledCell) => {
    filledCell.addEventListener('click', function () {
      if (this.classList.contains('clicked')) {
        clickedCount++;
        console.log(clickedCount);
        if (clickedCount === filledCells.length) {
          console.log('Nonogram complited');
        }
      } else {
        clickedCount--;
        console.log(clickedCount);
      }
    });
  });
  filledCells.forEach((filledCell) => {
    filledCell.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (!filledCell.classList.contains('clicked')
      && filledCell.childElementCount > 0) {
        clickedCount--;
        console.log(clickedCount);
      }
    });
  });
  return nonogramGrid;
}
