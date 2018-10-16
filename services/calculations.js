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
    if (newTotal < monthlyPayment + extraPayment) {
      totalPaid += newTotal;
      newTotal = 0;
    } else {
      newTotal = newTotal - (monthlyPayment - (newTotal * (annualInterestRate / 100) / 12)) - extraPayment;
      extraPaymentsPaid += extraPayment;
      totalPaid += monthlyPayment + extraPayment;
    }

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
  const totalsTable = createTable(totals);
  document.querySelector('#table .table').remove();
  document.querySelector('#table').append(totalsTable);
};

const createSummariesElement = (summary) => {
  const summaries = document.createElement('div');
  summaries.id = 'summaries';

  const total = document.createElement('span');
  const totalBold = document.createElement('b');
  totalBold.textContent = 'Total: ';
  const totalSpan = document.createElement('span');
  totalSpan.textContent = `$${(Math.round(summary.totalPaid * 100) / 100).toFixed(2)}`;
  total.append(totalBold);
  total.append(totalSpan);
  const interest = document.createElement('span');
  const interestBold = document.createElement('b');
  interestBold.textContent = 'Interest: ';
  const interestSpan = document.createElement('span');
  interestSpan.textContent = `$${(Math.round(summary.totalInterest * 100) / 100).toFixed(2)}`;
  interest.append(interestBold);
  interest.append(interestSpan);
  const saved = document.createElement('span');
  const savedBold = document.createElement('b');
  savedBold.textContent = 'Saved: ';
  const savedSpan = document.createElement('span');
  savedSpan.textContent = `$${(Math.round(summary.saved * 100) / 100).toFixed(2)}`;
  saved.append(savedBold);
  saved.append(savedSpan);
  const monthly = document.createElement('span');
  const monthlyBold = document.createElement('b');
  monthlyBold.textContent = 'Monthly Payment: ';
  const monthlySpan = document.createElement('span');
  monthlySpan.textContent = `$${(Math.round(summary.monthlyPayment * 100) / 100).toFixed(2)}`;
  monthly.append(monthlyBold);
  monthly.append(monthlySpan);
  const years = document.createElement('span');
  const yearsBold = document.createElement('b');
  yearsBold.textContent = 'Years: ';
  const yearsSpan = document.createElement('span');
  yearsSpan.textContent = `${(Math.round((summary.numOfMonths / 12) * 10) / 10).toFixed(1)}`;
  years.append(yearsBold);
  years.append(yearsSpan);

  summaries.append(total);
  summaries.append(interest);
  summaries.append(saved);
  summaries.append(monthly);
  summaries.append(years);
  return summaries;
};

const createTable = (totals) => {
  const table = document.createElement('div');
  table.classList.add('table')
  const trHead = document.createElement('div');
  const monthColumn = document.createElement('div');
  monthColumn.textContent = 'Month #';
  const monthStringColumn = document.createElement('div');
  monthStringColumn.textContent = 'Month';
  const loanRemainingColumn = document.createElement('div');
  loanRemainingColumn.textContent = 'Loan Remaining';
  const interestPaidColumn = document.createElement('div');
  interestPaidColumn.textContent = 'Total Interest Paid';
  const extraPaymentsColumn = document.createElement('div');
  extraPaymentsColumn.textContent = 'Extra Payments Made';
  const totalPaidColumn = document.createElement('div');
  totalPaidColumn.textContent = 'Total Paid';
  trHead.append(monthColumn);
  trHead.append(monthStringColumn);
  trHead.append(loanRemainingColumn);
  trHead.append(interestPaidColumn);
  trHead.append(extraPaymentsColumn);
  trHead.append(totalPaidColumn);
  table.append(trHead);
  totals.forEach(row => {
    const tr = document.createElement('div');
    const month = document.createElement('div');
    month.textContent = row.month;
    const monthString = document.createElement('div');
    monthString.textContent = row.monthString;
    const loanRemaining = document.createElement('div');
    loanRemaining.textContent = `$${Math.round((row.loanRemaining * 100) / 100).toFixed(2)}`;
    const interestPaid = document.createElement('div');
    interestPaid.textContent = `$${Math.round((row.interestPaid * 100) / 100).toFixed(2)}`;
    const extraPayments = document.createElement('div');
    extraPayments.textContent = `$${Math.round((row.extraPayments * 100) / 100).toFixed(2)}`;
    const totalPaid = document.createElement('div');
    totalPaid.textContent = `$${Math.round((row.totalPaid * 100) / 100).toFixed(2)}`;
    tr.appendChild(month);
    tr.appendChild(monthString);
    tr.appendChild(loanRemaining);
    tr.appendChild(interestPaid);
    tr.appendChild(extraPayments);
    tr.appendChild(totalPaid);
    table.append(tr);
  });
  return table;
};

module.exports = { calculateTotals };
