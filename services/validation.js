const NUMBER_REGEX = /^\.?[0-9]+(?:\.[0-9]+)?$/;

validate = () => {
  const fields = document.querySelectorAll('#loan-amount, #annual-interest-rate, #loan-length, #extra-payment, #start-date');
  const [loanAmount, annualInterestRate, loanLength, extraPayment, startDate] = fields;

  fields.forEach(field => {
    field.classList.remove('invalid');
  });
  document.querySelector('#invalid-message').innerHTML = '';
  document.querySelector('#invalid-message').classList.remove('active');

  // TODO: Add min and max checks
  const invalidMessages = [];
  if (!loanAmount.value) {
    loanAmount.classList.add('invalid');
    invalidMessages.push(`'Loan Amount' is a required field.`);
  } else if (!NUMBER_REGEX.test(loanAmount.value)) {
    loanAmount.classList.add('invalid');
    invalidMessages.push(`'Loan Amount' has an invalid format.`);
  }
  if (!annualInterestRate.value) {
    annualInterestRate.classList.add('invalid');
    invalidMessages.push(`'Annual Interest Rate' is a required field.`);
  } else if (!NUMBER_REGEX.test(annualInterestRate.value)) {
    annualInterestRate.classList.add('invalid');
    invalidMessages.push(`'Annual Interest Rate' has an invalid format.`);
  }
  if (!loanLength.value) {
    loanLength.classList.add('invalid');
    invalidMessages.push(`'Loan Length' is a required field.`);
  } else if (!NUMBER_REGEX.test(loanLength.value)) {
    loanLength.classList.add('invalid');
    invalidMessages.push(`'Loan Length' has an invalid format.`);
  }
  if (!extraPayment.value) {
    extraPayment.classList.add('invalid');
    invalidMessages.push(`'Extra Payment' is a required field.`);
  } else if (!NUMBER_REGEX.test(extraPayment.value)) {
    extraPayment.classList.add('invalid');
    invalidMessages.push(`'Extra Payment' has an invalid format.`);
  }
  const lowestDateTime = new Date('1900-01-01').getTime();
  const startDateTime = new Date(startDate.value).getTime();
  if (!startDate.value) {
    startDate.classList.add('invalid');
    invalidMessages.push(`'Start Date' is a required field.`);
  } else if (startDateTime < lowestDateTime) {
    startDate.classList.add('invalid');
    invalidMessages.push(`'Start Date' must be after January 01, 1900.`);
  }

  invalid(invalidMessages);
};

invalid = invalidMessages => {
  if (invalidMessages.length > 0) {
    const content = invalidMessages.map(m => `<div>${m}</div>`).join('');
    document.querySelector('#invalid-message').innerHTML = content;
    document.querySelector('#invalid-message').classList.add('active');
  }
};

module.exports = { validate };
