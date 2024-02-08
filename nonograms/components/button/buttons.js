/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */

import {
  resetNonogram,
  clearNonogram,
  createNonogramTable,
} from '../nonograms-grid/nonograms-grid';

function getResetButton() {
  const button = document.createElement('button');
  button.className = 'button';
  button.id = 'reset-button';
  button.textContent = 'reset';
  button.addEventListener('click', () => {
    resetNonogram();
  });
  return button;
}

function getDefButton(content) {
  const button = document.createElement('button');
  button.className = 'button';
  button.textContent = `${content}`;
  button.id = `${content}-button`;
  button.addEventListener('click', () => {
    clearNonogram();
    app.prepend(createNonogramTable(content));
  });
  return button;
}

export function getButtons() {
  const block = document.createElement('div');
  block.className = 'buttons-wrapper';
  const easyButton = getDefButton('easy');
  const mediumButton = getDefButton('medium');
  const hardButton = getDefButton('hard');
  const resetButton = getResetButton();
  block.appendChild(easyButton);
  block.appendChild(mediumButton);
  block.appendChild(hardButton);
  block.appendChild(resetButton);
  return block;
}
