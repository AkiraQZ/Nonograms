import { createNonogramTable }
from "/components/nonograms-grid/nonograms-grid.js";

const body = document.querySelector('body');
const nonogramGrid = createNonogramTable('hard');
body.appendChild(nonogramGrid);
