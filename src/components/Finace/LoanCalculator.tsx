import React, { useState } from "react";
import { Calculator, Phone } from "lucide-react";

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(256);

  const calculatePayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(Math.round(payment));
    }
  };

  return (
    <div className="py-16 bg-black flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Content */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Estimate your monthly payment
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            Estimate your monthly payment with our easy-to-use calculator. Get a
            clear idea of costs upfront, helping you plan your project with
            confidence and peace of mind.
          </p>

          <button className="group flex items-center gap-3 text-white hover:text-blue-400 transition-colors duration-300">
            <div className="w-12 h-12 rounded-full border-2 border-white group-hover:border-blue-400 flex items-center justify-center transition-colors duration-300">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-lg font-medium border-b border-white group-hover:border-blue-400 pb-1 transition-colors duration-300">
              Contact a Representative
            </span>
          </button>
        </div>

        {/* Right Side - Calculator Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Loan Payment Calculate
              </h2>
              <p className="text-gray-500 text-sm">
                Estimate your monthly payment with our easy-to-use calculator.
              </p>
            </div>

            {/* Loan Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                />
              </div>
            </div>

            {/* Interest Rate & Loan Term */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Intrest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    %
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Loan Term (Year)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">
                    Year
                  </span>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculatePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <Calculator className="w-5 h-5" />
              Calculate
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Your Estimated Payment
                  </h3>
                  <p className="text-gray-500 text-sm">
                    This is an estimate. Your actual payment may vary
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold text-blue-600">
                    ${monthlyPayment}
                  </span>
                  <span className="text-blue-600 font-semibold text-lg">
                    /mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
