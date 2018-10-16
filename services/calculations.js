const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const calculateTotals = () => {
  const fields = document.querySelectorAll('#loan-amount, #annual-interest-rate, #loan-length, #extra-payment, #start-date');
  let [loanAmount, annualInterestRate, loanLength, extraPayment, startDate] = fields;
  loanAmount = Number(loanAmount.value);
  annualInterestRate = Number(annualInterestRate.value);
  loanLength = Number(loanLength.value);
  extraPayment = Number(extraPayment.value);
  startDate = new Date(startDate.value);

  const totalPaymentNoExtra = (annualInterestRate / 1200 * loanAmount * loanLength * 12) /
                                (1 - Math.pow(1 + annualInterestRate / 1200, -1 * loanLength * 12));
  const totalInterestNoExtra = totalPaymentNoExtra - loanAmount;
  const monthlyPayment = totalPaymentNoExtra / (loanLength * 12);

  let newTotal = loanAmount;
  let numOfMonths = 0;
  let interestPaid = 0;
  let extraPaymentsPaid = 0;
  let totalPaid = 0;
  const values = [{
    month: numOfMonths,
    monthString: `${months[startDate.getMonth()]}, ${startDate.getFullYear()}`,
    loanRemaining: loanAmount,
    interestPaid,
    extraPayments: extraPaymentsPaid,
    totalPaid
  }];
  while (newTotal > 0) {
    numOfMonths++;
    interestPaid += newTotal * (annualInterestRate / 100) / 12;
    newTotal = newTotal - (monthlyPayment - (newTotal * (annualInterestRate / 100) / 12)) - extraPayment;
    extraPaymentsPaid += extraPayment;
    totalPaid += monthlyPayment + extraPayment;

    const monthDate = new Date(startDate.getTime());
    monthDate.setMonth(monthDate.getMonth() + numOfMonths);
    values.push({
      month: numOfMonths,
      monthString: `${months[monthDate.getMonth()]}, ${monthDate.getFullYear()}`,
      loanRemaining: newTotal,
      interestPaid,
      extraPayments: extraPaymentsPaid,
      totalPaid
    });
  }
  
  const totalInterest = totalPaid - loanAmount;
  const saved = totalPaymentNoExtra - totalPaid;

  renderData({ totalPaid, totalInterest, saved, monthlyPayment, numOfMonths }, values);
};

const renderData = (summary, totals) => {
  const summaries = createSummariesElement(summary);
  document.querySelector('#calculations #summaries').remove();
  document.querySelector('#calculations').append(summaries);
  document.querySelector('#calculations .empty').style.display = 'none';
};

const createSummariesElement = (summary) => {
  const summaries = document.createElement('div');
  summaries.id = 'summaries';

  const total = document.createElement('span');
  const totalBold = document.createElement('b').textContent = 'Total: ';
  const totalSpan = document.createElement('span').textContent = `$${(Math.round(summary.totalPaid * 100) / 100).toFixed(2)}`;
  total.append(totalBold);
  total.append(totalSpan);
  const interest = document.createElement('span');
  const interestBold = document.createElement('b').textContent = 'Interest: ';
  const interestSpan = document.createElement('span').textContent = `$${(Math.round(summary.totalInterest * 100) / 100).toFixed(2)}`;
  interest.append(interestBold);
  interest.append(interestSpan);
  const saved = document.createElement('span');
  const savedBold = document.createElement('b').textContent = 'Saved: ';
  const savedSpan = document.createElement('span').textContent = `$${(Math.round(summary.saved * 100) / 100).toFixed(2)}`;
  saved.append(savedBold);
  saved.append(savedSpan);
  const monthly = document.createElement('span');
  const monthlyBold = document.createElement('b').textContent = 'Monthly Payment: ';
  const monthlySpan = document.createElement('span').textContent = `$${(Math.round(summary.monthlyPayment * 100) / 100).toFixed(2)}`;
  monthly.append(monthlyBold);
  monthly.append(monthlySpan);
  const years = document.createElement('span');
  const yearsBold = document.createElement('b').textContent = 'Years: ';
  const yearsSpan = document.createElement('span').textContent = `${(Math.round((summary.numOfMonths / 12) * 10) / 10).toFixed(1)}`;
  years.append(yearsBold);
  years.append(yearsSpan);

  summaries.append(total);
  summaries.append(interest);
  summaries.append(saved);
  summaries.append(monthly);
  summaries.append(years);
  return summaries;
};

module.exports = { calculateTotals };
