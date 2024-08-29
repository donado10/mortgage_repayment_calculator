import CalculatorIcon from "../assets/icon-calculator.svg";

const Form = () => {
  return (
    <form className="flex flex-col justify-center gap-4" action="submit">
      <div className="flex flex-col gap-2">
        <label htmlFor="Mortgage Amount" className="font-medium text-slate-700">
          Mortgage Amount
        </label>
        <div className="flex h-10 w-full overflow-hidden rounded-l-lg rounded-r-lg border-[1px] border-slate-500">
          <div className="flex min-w-[5%] items-center justify-center bg-slate-100 py-1">
            {" "}
            <span className="px-4 font-semibold text-slate-700">£</span>
          </div>
          <input type="number" className="flex-grow outline-none" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="Mortgage Term" className="font-medium text-slate-700">
          Mortgage Term
        </label>
        <div className="flex h-10 w-full overflow-hidden rounded-l-lg rounded-r-lg border-[1px] border-slate-500">
          <input type="number" className="flex-grow outline-none" />
          <div className="flex min-w-[5%] items-center justify-center bg-slate-100 py-1">
            {" "}
            <span className="px-4 font-semibold text-slate-700">years</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="Interest Rate" className="font-medium text-slate-700">
          Interest Rate
        </label>
        <div className="flex h-10 w-full overflow-hidden rounded-l-lg rounded-r-lg border-[1px] border-slate-500">
          <input type="number" className="flex-grow outline-none" />
          <div className="flex min-w-[5%] items-center justify-center bg-slate-100 py-1">
            {" "}
            <span className="px-4 font-bold text-slate-700">%</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="Mortgage Type" className="font-medium text-slate-700">
          Mortgage Type
        </label>
        <div className="flex flex-col gap-2">
          <div className="flex h-10 w-full items-center gap-4 overflow-hidden rounded-l-lg rounded-r-lg border-[1px] border-slate-500 p-2">
            <input type="checkbox" />
            <label
              htmlFor="Repayments"
              className="font-semibold text-slate-900"
            >
              Repayments
            </label>
          </div>
          <div className="flex h-10 w-full gap-4 overflow-hidden rounded-l-lg rounded-r-lg border-[1px] border-slate-500 p-2">
            <input type="checkbox" />
            <label
              htmlFor="Interest Only"
              className="font-semibold text-slate-900"
            >
              Interest Only
            </label>
          </div>
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-4 rounded-l-full rounded-r-full bg-lime-custom p-3 font-semibold">
        <span>
          <img src={CalculatorIcon} alt="" />
        </span>
        <span>Calculate Repayments</span>
      </button>
    </form>
  );
};

const Calculator = () => {
  return (
    <div className="h-fit w-full bg-white p-8">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-slate-900">
          Mortgage Calculator
        </h1>
        <button className="my-2 self-start text-slate-700 underline">
          <span>Clear all</span>
        </button>
        <Form />
      </div>
    </div>
  );
};

export default Calculator;
