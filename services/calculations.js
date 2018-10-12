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
  let saved = 0;
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
};

module.exports = { calculateTotals };
