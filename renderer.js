const {  } = require('./services/calculations');
const { validate } = require('./services/validation');

// Register event listeners
document.querySelector('#calculate').addEventListener('click', validate);

keyboardListener();
