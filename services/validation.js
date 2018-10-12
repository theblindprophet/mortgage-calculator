const NUMBER_REGEX = /^-?\.?[0-9]+(?:\.[0-9]+)?$/;

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
  } else if (Number(loanAmount.value) <= 0) {
    loanAmount.classList.add('invalid');
    invalidMessages.push(`'Loan Amount' must be greater than 0.`);
  } else if (Number(loanAmount.value) > 1000000000) {
    loanAmount.classList.add('invalid');
    invalidMessages.push(`'Loan Amount' cannot be more than 1000000000.`);
  }
  if (!annualInterestRate.value) {
    annualInterestRate.classList.add('invalid');
    invalidMessages.push(`'Annual Interest Rate' is a required field.`);
  } else if (!NUMBER_REGEX.test(annualInterestRate.value)) {
    annualInterestRate.classList.add('invalid');
    invalidMessages.push(`'Annual Interest Rate' has an invalid format.`);
  } else if (Number(annualInterestRate.value) <= 0) {
    annualInterestRate.classList.add('invalid');
    invalidMessages.push(`'Annual Interest Rate' must be great than 0.`);
  } else if (Number(annualInterestRate.value) > 50) {
    annualInterestRate.classList.add('invalid');
    invalidMessages.push(`'Annual Interest Rate' cannot be more than 50%.`);
  }
  if (!loanLength.value) {
    loanLength.classList.add('invalid');
    invalidMessages.push(`'Loan Length' is a required field.`);
  } else if (!NUMBER_REGEX.test(loanLength.value)) {
    loanLength.classList.add('invalid');
    invalidMessages.push(`'Loan Length' has an invalid format.`);
  } else if (Number(loanLength.value) <= 0) {
    loanLength.classList.add('invalid');
    invalidMessages.push(`'Loan Length' must be greater than 0.`);
  } else if (Number(loanLength.value) > 50) {
    loanLength.classList.add('invalid');
    invalidMessages.push(`'Loan Length' cannot be more than 50 years.`);
  }
  if (!extraPayment.value) {
    extraPayment.classList.add('invalid');
    invalidMessages.push(`'Extra Payment' is a required field.`);
  } else if (!NUMBER_REGEX.test(extraPayment.value)) {
    extraPayment.classList.add('invalid');
    invalidMessages.push(`'Extra Payment' has an invalid format.`);
  } else if (Number(extraPayment.value) < 0) {
    extraPayment.classList.add('invalid');
    invalidMessages.push(`'Extra Payment' must be greater than or equal to 0.`);
  } else if (Number(loanAmount.value) && Number(extraPayment.value) > Number(loanAmount.value)) {
    extraPayment.classList.add('invalid');
    invalidMessages.push(`'Extra Payment' cannot be more than 'Loan Amount'.`);
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

  
  if (invalidMessages.length === 0) {
    return true;
  }
  invalid(invalidMessages);
  return false;
};

invalid = invalidMessages => {
  const content = invalidMessages.map(m => `<div>${m}</div>`).join('');
  document.querySelector('#invalid-message').innerHTML = content;
  document.querySelector('#invalid-message').classList.add('active');
};

module.exports = { validate };
