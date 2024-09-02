import React, {
  FormEvent,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import CalculatorIcon from "../assets/icon-calculator.svg";
import { useAppContext } from "../App";
import {
  calculateInterestOnlyPayment,
  calculateMonthlyMortgage,
} from "../Utils/Functions";

import focusReducer, {
  EFocusReducer,
  EPayloadFocusReducer,
  IFocusStateReducer,
} from "./Reducer";

const InputFormLayout: React.FC<{ children: ReactNode; isFocus?: boolean }> = ({
  children,
  isFocus,
}) => {
  return (
    <div
      className={`flex h-10 w-full overflow-hidden rounded-l-lg rounded-r-lg border-[1px] ${isFocus ? "border-lime-custom" : "border-slate-500"}`}
    >
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

const InputFormPrefix: React.FC<{ content: string; isFocus?: boolean }> = ({
  content,
  isFocus,
}) => {
  return (
    <div
      className={`flex min-w-[5%] items-center justify-center ${isFocus ? "bg-lime-custom" : "bg-slate-100"} py-1`}
    >
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
  const mortgageAmountRef = useRef<HTMLInputElement>();
  const mortgageTermRef = useRef<HTMLInputElement>();
  const interestRateRef = useRef<HTMLInputElement>();
  const repaymentCheckboxRef = useRef<HTMLInputElement>();
  const interestCheckboxRef = useRef<HTMLInputElement>();
  const mortgageCtx = useAppContext();

  const initialFocusReducerState: IFocusStateReducer = {
    amount: false,
    interest: false,
    term: false,
    type: false,
  };

  const [focusReducerState, dispatchFocusReducerState] = useReducer(
    focusReducer,
    initialFocusReducerState,
  );

  const focusHandler = (cb: () => void) => {
    cb();
    return "bg-lime-custom";
  };
  const blurHandler = (cb: () => void) => {
    cb();
  };

  useEffect(() => {
    if (!mortgageCtx?.mortgageData) {
      mortgageAmountRef.current!.value = "";
      mortgageTermRef.current!.value = "";
      interestRateRef.current!.value = "";
      repaymentCheckboxRef.current!.checked = false;
      interestCheckboxRef.current!.checked = false;
    }
  }, [mortgageCtx?.mortgageData]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const mortgageAmount = mortgageAmountRef.current?.value;
    const mortgageTerm = mortgageTermRef.current?.value;
    const interestRate = interestRateRef.current?.value;
    const repaymentCheckbox = repaymentCheckboxRef.current?.checked;
    const interestCheckbox = interestCheckboxRef.current?.checked;

    if (
      mortgageAmount &&
      mortgageTerm &&
      interestRate &&
      (repaymentCheckbox || interestCheckbox)
    ) {
      mortgageCtx?.addMortgageParams(
        +mortgageAmount,
        +mortgageTerm,
        +interestRate,
        repaymentCheckbox,
        interestCheckbox,
      );

      if (repaymentCheckbox) {
        const monthlyValue = calculateMonthlyMortgage(
          +mortgageAmount!,
          +interestRate!,
          +mortgageTerm!,
        );
        mortgageCtx?.updateMortgageParams({ mortgageResult: monthlyValue });
        return;
      }
      if (interestCheckbox) {
        const interestOnlyValue = calculateInterestOnlyPayment(
          +mortgageAmount!,
          +interestRate!,
        );
        mortgageCtx?.updateMortgageParams({
          mortgageResult: interestOnlyValue,
        });
        return;
      }
    }
  };

  return (
    <form
      className="flex flex-col justify-center gap-4"
      action="submit"
      onSubmit={submitHandler}
    >
      <div className="flex flex-col gap-2">
        <InputLabel label="Mortgage Amount" />
        <InputFormLayout isFocus={focusReducerState.amount}>
          <InputFormPrefix content={"£"} isFocus={focusReducerState.amount} />

          <input
            type="number"
            ref={mortgageAmountRef as React.LegacyRef<HTMLInputElement>}
            onChange={(e) => {
              mortgageCtx?.updateMortgageParams({
                amount: +e.currentTarget.value,
              });
            }}
            className={`flex-grow outline-none`}
            onFocus={() => {
              focusHandler(
                dispatchFocusReducerState.bind(null, {
                  type: EFocusReducer.AMOUNT,
                  payload: EPayloadFocusReducer.SET,
                }),
              );
            }}
            onBlur={() => {
              blurHandler(
                dispatchFocusReducerState.bind(null, {
                  type: EFocusReducer.AMOUNT,
                  payload: EPayloadFocusReducer.REMOVE,
                }),
              );
            }}
          />
        </InputFormLayout>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5 md:w-full md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-grow md:w-[45%] md:flex-grow-0">
          <InputLabel label="Mortgage Term" />
          <InputFormLayout isFocus={focusReducerState.term}>
            <input
              type="number"
              className="flex-grow p-1 outline-none md:w-[80%] md:flex-grow-0"
              ref={mortgageTermRef as React.LegacyRef<HTMLInputElement>}
              onChange={(e) => {
                mortgageCtx?.updateMortgageParams({
                  term: +e.currentTarget.value,
                });
              }}
              onFocus={() => {
                focusHandler(
                  dispatchFocusReducerState.bind(null, {
                    type: EFocusReducer.TERM,
                    payload: EPayloadFocusReducer.SET,
                  }),
                );
              }}
              onBlur={() => {
                blurHandler(
                  dispatchFocusReducerState.bind(null, {
                    type: EFocusReducer.TERM,
                    payload: EPayloadFocusReducer.REMOVE,
                  }),
                );
              }}
            />

            <InputFormPrefix
              content={"years"}
              isFocus={focusReducerState.term}
            />
          </InputFormLayout>
        </div>
        <div className="flex flex-col gap-2 sm:flex-grow md:w-[45%] md:flex-grow-0">
          <InputLabel label="Interest Rate" />
          <InputFormLayout isFocus={focusReducerState.interest}>
            <input
              type="number"
              className="flex-grow p-1 outline-none md:w-[80%] md:flex-grow-0"
              ref={interestRateRef as React.LegacyRef<HTMLInputElement>}
              step={0.01}
              onChange={(e) => {
                mortgageCtx?.updateMortgageParams({
                  interestRate: +e.currentTarget.value,
                });
              }}
              onFocus={() => {
                focusHandler(
                  dispatchFocusReducerState.bind(null, {
                    type: EFocusReducer.INTEREST,
                    payload: EPayloadFocusReducer.SET,
                  }),
                );
              }}
              onBlur={() => {
                blurHandler(
                  dispatchFocusReducerState.bind(null, {
                    type: EFocusReducer.INTEREST,
                    payload: EPayloadFocusReducer.REMOVE,
                  }),
                );
              }}
            />
            <InputFormPrefix
              content={"%"}
              isFocus={focusReducerState.interest}
            />
          </InputFormLayout>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <InputLabel label="Mortgage Type" />
        <div className="flex flex-col gap-2">
          <InputFormCheckboxLayout>
            <input
              type="radio"
              ref={repaymentCheckboxRef as React.LegacyRef<HTMLInputElement>}
              onChange={(e) => {
                if (interestCheckboxRef.current?.checked) {
                  interestCheckboxRef.current!.checked = false;
                }
                mortgageCtx?.updateMortgageParams({
                  repaymentCheckbox: e.currentTarget!.checked,
                  interestCheckbox: false,
                });
              }}
            />
            <InputCheckboxLabel label="Repayments" />
          </InputFormCheckboxLayout>
          <InputFormCheckboxLayout>
            <input
              type="radio"
              ref={interestCheckboxRef as React.LegacyRef<HTMLInputElement>}
              onChange={(e) => {
                if (repaymentCheckboxRef.current?.checked) {
                  repaymentCheckboxRef.current!.checked = false;
                }
                mortgageCtx?.updateMortgageParams({
                  repaymentCheckbox: false,
                  interestCheckbox: e.currentTarget!.checked,
                });
              }}
            />
            <InputCheckboxLabel label="Interest Only" />
          </InputFormCheckboxLayout>
        </div>
      </div>

      <button
        onSubmit={submitHandler}
        className="flex w-full items-center justify-center gap-4 rounded-l-full rounded-r-full bg-lime-custom p-3 font-semibold sm:w-[90%]"
      >
        <span>
          <img src={CalculatorIcon} alt="" />
        </span>
        <span>Calculate Repayments</span>
      </button>
    </form>
  );
};

const Calculator = () => {
  const mortgageCtx = useAppContext();

  return (
    <div className="h-fit w-full bg-white p-8 sm:rounded-t-2xl md:w-1/2 md:rounded-l-2xl md:rounded-t-none">
      <div className="flex flex-col justify-center gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">
            Mortgage Calculator
          </h1>
          <button
            className="my-2 self-start text-slate-700 underline"
            onClick={() => {
              mortgageCtx?.resetMortgageParams();
            }}
          >
            <span>Clear all</span>
          </button>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default Calculator;
