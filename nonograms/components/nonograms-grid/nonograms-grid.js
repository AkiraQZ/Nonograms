/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
import {
  easyNonograms,
  mediumNonograms,
  hardNonograms,
} from '../nonograms-base/nonograms-base';

// randomize what template we get
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  // adding empty slot, for correct visability
  const emptySlot = document.createElement('td');
  emptySlot.className = 'header__empty';
  gridHeader.appendChild(emptySlot);
  for (let index = 0; index < nonogramObj.columns.length; index++) {
    const element = document.createElement('td');
    const content = nonogramObj.columns[index].join('');
    element.className = `tb__header__col-${index + 1}`;
    element.textContent = content;
    gridHeader.appendChild(element);
  }
  nonogramGrid.appendChild(gridHeader);
  // fixing problem
  for (let index = 0; index < nonogramObj.rows.length; index++) {
    const row = document.createElement('tr');
    row.className = 'td__content';
    row.id = `row-${index + 1}`;
    const firstColumn = document.createElement('td');
    const content = nonogramObj.rows[index].join('');
    firstColumn.className = 'td__first__col';
    firstColumn.id = `row-${index + 1}`;
    firstColumn.textContent = content;
    row.appendChild(firstColumn);
    for (let index1 = 0; index1 < nonogramObj.columns.length;
      index1++) {
      const element = document.createElement('td');
      element.className = 'td__cell';
      row.appendChild(element);
    }
    nonogramGrid.appendChild(row);
  }
  return nonogramGrid;
}
