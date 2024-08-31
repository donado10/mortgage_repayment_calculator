import React, { ReactElement, ReactNode } from "react";
import CalculatorIcon from "../assets/icon-calculator.svg";

const InputFormLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-10 w-full overflow-hidden rounded-l-lg rounded-r-lg border-[1px] border-slate-500">
      {children}
    </div>
  );
};

const InputFormCheckboxLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex h-10 w-full items-center gap-5 overflow-hidden rounded-l-lg rounded-r-lg border-[1px] border-slate-500 p-2">
      {children}
    </div>
  );
};

const InputFormPrefix: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="flex min-w-[5%] items-center justify-center bg-slate-100 py-1">
      <span className="px-4 font-semibold text-slate-700">{content}</span>
    </div>
  );
};

const InputLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <label className="font-medium text-slate-700" htmlFor={label}>
      {label}
    </label>
  );
};

const InputCheckboxLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <label className="font-semibold text-slate-900" htmlFor={label}>
      {label}
    </label>
  );
};

const Form = () => {
  return (
    <form className="flex flex-col justify-center gap-4" action="submit">
      <div className="flex flex-col gap-2">
        <InputLabel label="Mortgage Amount" />
        <InputFormLayout>
          <InputFormPrefix content={"£"} />
          <input type="number" className="flex-grow outline-none" />
        </InputFormLayout>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5 md:w-full md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-grow md:w-[45%] md:flex-grow-0">
          <InputLabel label="Mortgage Term" />
          <InputFormLayout>
            <input
              type="number"
              className="flex-grow p-1 outline-none md:w-[80%] md:flex-grow-0"
            />
            <InputFormPrefix content={"years"} />
          </InputFormLayout>
        </div>
        <div className="flex flex-col gap-2 sm:flex-grow md:w-[45%] md:flex-grow-0">
          <InputLabel label="Interest Rate" />
          <InputFormLayout>
            <input
              type="number"
              className="flex-grow p-1 outline-none md:w-[80%] md:flex-grow-0"
            />
            <InputFormPrefix content={"%"} />
          </InputFormLayout>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <InputLabel label="Mortgage Type" />
        <div className="flex flex-col gap-2">
          <InputFormCheckboxLayout>
            <input type="checkbox" />
            <InputCheckboxLabel label="Repayments" />
          </InputFormCheckboxLayout>
          <InputFormCheckboxLayout>
            <input type="checkbox" />
            <InputCheckboxLabel label="Interest Only" />
          </InputFormCheckboxLayout>
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-4 rounded-l-full rounded-r-full bg-lime-custom p-3 font-semibold sm:w-[90%]">
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
    <div className="h-fit w-full bg-white p-8 sm:rounded-t-2xl md:w-1/2 md:rounded-l-2xl md:rounded-t-none">
      <div className="flex flex-col justify-center gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">
            Mortgage Calculator
          </h1>
          <button className="my-2 self-start text-slate-700 underline">
            <span>Clear all</span>
          </button>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default Calculator;
