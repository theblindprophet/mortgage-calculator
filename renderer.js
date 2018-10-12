const { calculateTotals } = require('./services/calculations');
const { validate } = require('./services/validation');

const execute = () => {
  if (validate()) {
    calculateTotals();
  }
};

// Register event listeners
document.querySelector('#calculate').addEventListener('click', execute);
