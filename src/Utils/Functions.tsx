export function calculateMonthlyMortgage(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number,
): number {
  if (principal <= 0) {
    throw new Error("Principal amount must be greater than zero.");
  }
  if (annualInterestRate <= 0) {
    throw new Error("Annual interest rate must be greater than zero.");
  }
  if (loanTermYears <= 0) {
    throw new Error("Loan term must be greater than zero.");
  }

  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const numerator =
    principal *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
  const monthlyPayment = numerator / denominator;

  return Math.round(monthlyPayment * 100) / 100;
}
