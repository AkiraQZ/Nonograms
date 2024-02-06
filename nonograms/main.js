import { createNonogramTable }
from "/components/nonograms-grid/nonograms-grid.js";

const app = document.createElement('div');
app.id = 'app';

const body = document.querySelector('body');
const nonogramGrid = createNonogramTable('hard');

app.appendChild(nonogramGrid);
body.appendChild(app);
