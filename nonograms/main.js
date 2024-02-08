/* eslint-disable import/prefer-default-export */
import { createNonogramTable }
from "/components/nonograms-grid/nonograms-grid.js";
import { getButtons } from "/components/button/buttons.js";

export const app = document.createElement('div');
app.id = 'app';

const body = document.querySelector('body');
const nonogramGrid = createNonogramTable('easy');
const buttons = getButtons();

app.appendChild(nonogramGrid);
app.appendChild(buttons);
body.appendChild(app);
