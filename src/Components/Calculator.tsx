import React, { FormEvent, useEffect, useReducer, useRef } from "react";
import CalculatorIcon from "../assets/icon-calculator.svg";
import { useAppContext } from "../AppContext";
import {
  calculateInterestOnlyPayment,
  calculateMonthlyMortgage,
} from "../Utils/Functions";

import focusReducer, {
  EFocusReducer,
  EPayloadFocusReducer,
  IFocusStateReducer,
} from "./focusReducer";
import errorReducer, {
  EErrorReducer,
  EPayloadErrorReducer,
  IErrorStateReducer,
} from "./errorReducer";
import {
  InputCheckboxLabel,
  InputFormCheckboxLayout,
  InputFormLayout,
  InputFormPrefix,
  InputLabel,
} from "./CalculatorInputElement";

const ErrorAlert = () => {
  return (
    <span className="font-semibold text-red-custom">
      This field is required
    </span>
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
    interest_type: false,
    repayment_type: false,
  };

  const initialErrorReducerState: IErrorStateReducer = {
    amount: false,
    interest: false,
    term: false,
    type: false,
  };

  const [focusReducerState, dispatchFocusReducerState] = useReducer(
    focusReducer,
    initialFocusReducerState,
  );

  const [errorReducerState, dispatchErrorReducerState] = useReducer(
    errorReducer,
    initialErrorReducerState,
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
      dispatchFocusReducerState({
        type: EFocusReducer.REPAYMENT_TYPE,
        payload: EPayloadFocusReducer.REMOVE,
      });
      dispatchFocusReducerState({
        type: EFocusReducer.INTEREST_TYPE,
        payload: EPayloadFocusReducer.REMOVE,
      });

      dispatchErrorReducerState({
        type: EErrorReducer.AMOUNT,
        payload: EPayloadErrorReducer.REMOVE,
      });
      dispatchErrorReducerState({
        type: EErrorReducer.INTEREST,
        payload: EPayloadErrorReducer.REMOVE,
      });
      dispatchErrorReducerState({
        type: EErrorReducer.TERM,
        payload: EPayloadErrorReducer.REMOVE,
      });
      dispatchErrorReducerState({
        type: EErrorReducer.TYPE,
        payload: EPayloadErrorReducer.REMOVE,
      });
    }
  }, [mortgageCtx?.mortgageData]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    let errors = 0;

    const mortgageAmount = mortgageAmountRef.current?.value;
    const mortgageTerm = mortgageTermRef.current?.value;
    const interestRate = interestRateRef.current?.value;
    const repaymentCheckbox = repaymentCheckboxRef.current?.checked;
    const interestCheckbox = interestCheckboxRef.current?.checked;

    if (!mortgageAmount) {
      dispatchErrorReducerState({
        type: EErrorReducer.AMOUNT,
        payload: EPayloadErrorReducer.SET,
      });
      errors++;
    } else {
      dispatchErrorReducerState({
        type: EErrorReducer.AMOUNT,
        payload: EPayloadErrorReducer.REMOVE,
      });
    }
    if (!mortgageTerm) {
      dispatchErrorReducerState({
        type: EErrorReducer.TERM,
        payload: EPayloadErrorReducer.SET,
      });
      errors++;
    } else {
      dispatchErrorReducerState({
        type: EErrorReducer.TERM,
        payload: EPayloadErrorReducer.REMOVE,
      });
    }
    if (!interestRate) {
      dispatchErrorReducerState({
        type: EErrorReducer.INTEREST,
        payload: EPayloadErrorReducer.SET,
      });
      errors++;
    } else {
      dispatchErrorReducerState({
        type: EErrorReducer.INTEREST,
        payload: EPayloadErrorReducer.REMOVE,
      });
    }
    if (!interestCheckbox && !repaymentCheckbox) {
      dispatchErrorReducerState({
        type: EErrorReducer.TYPE,
        payload: EPayloadErrorReducer.SET,
      });
      errors++;
    } else {
      dispatchErrorReducerState({
        type: EErrorReducer.TYPE,
        payload: EPayloadErrorReducer.REMOVE,
      });
    }

    if (errors === 0) {
      mortgageCtx?.addMortgageParams(
        +mortgageAmount!,
        +mortgageTerm!,
        +interestRate!,
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
        <InputFormLayout
          isFocus={focusReducerState.amount}
          isError={errorReducerState.amount}
        >
          <InputFormPrefix
            content={"£"}
            isFocus={focusReducerState.amount}
            isError={errorReducerState.amount}
          />
          <input
            type="number"
            ref={mortgageAmountRef as React.LegacyRef<HTMLInputElement>}
            onChange={(e) => {
              const amount = +e.currentTarget.value;
              mortgageCtx?.updateMortgageParams({
                amount: amount,
              });
              if (amount > 0) {
                dispatchErrorReducerState({
                  type: EErrorReducer.AMOUNT,
                  payload: EPayloadErrorReducer.REMOVE,
                });
              }
            }}
            className={`flex-grow pl-2 font-semibold outline-none`}
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
        {errorReducerState.amount && <ErrorAlert />}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5 md:w-full md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-grow md:w-[45%] md:flex-grow-0">
          <InputLabel label="Mortgage Term" />
          <InputFormLayout
            isFocus={focusReducerState.term}
            isError={errorReducerState.term}
          >
            <input
              type="number"
              className="flex-grow p-1 pl-2 font-semibold outline-none md:w-[80%] md:flex-grow-0"
              ref={mortgageTermRef as React.LegacyRef<HTMLInputElement>}
              onChange={(e) => {
                const term = +e.currentTarget.value;
                mortgageCtx?.updateMortgageParams({
                  term: term,
                });

                if (term > 0) {
                  dispatchErrorReducerState({
                    type: EErrorReducer.TERM,
                    payload: EPayloadErrorReducer.REMOVE,
                  });
                }
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
              isError={errorReducerState.term}
            />
          </InputFormLayout>
          {errorReducerState.term && <ErrorAlert />}
        </div>
        <div className="flex flex-col gap-2 sm:flex-grow md:w-[45%] md:flex-grow-0">
          <InputLabel label="Interest Rate" />
          <InputFormLayout
            isFocus={focusReducerState.interest}
            isError={errorReducerState.interest}
          >
            <input
              type="number"
              className="flex-grow p-1 pl-2 font-semibold outline-none md:w-[80%] md:flex-grow-0"
              ref={interestRateRef as React.LegacyRef<HTMLInputElement>}
              step={0.01}
              onChange={(e) => {
                const interestRate = +e.currentTarget.value;
                mortgageCtx?.updateMortgageParams({
                  interestRate: interestRate,
                });

                if (interestRate > 0) {
                  dispatchErrorReducerState({
                    type: EErrorReducer.INTEREST,
                    payload: EPayloadErrorReducer.REMOVE,
                  });
                }
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
              isError={errorReducerState.interest}
            />
          </InputFormLayout>
          {errorReducerState.interest && <ErrorAlert />}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <InputLabel label="Mortgage Type" />
        <div className="flex flex-col gap-2">
          <InputFormCheckboxLayout isFocus={focusReducerState.repayment_type}>
            <div className="grid place-items-center">
              <input
                type="radio"
                className={`col-start-1 row-start-1 h-4 w-4 appearance-none rounded-full border-[1px] ${focusReducerState.repayment_type ? "border-lime-custom" : "border-slate-900"}`}
                ref={repaymentCheckboxRef as React.LegacyRef<HTMLInputElement>}
                onChange={(e) => {
                  if (interestCheckboxRef.current?.checked) {
                    interestCheckboxRef.current!.checked = false;
                  }
                  mortgageCtx?.updateMortgageParams({
                    repaymentCheckbox: e.currentTarget!.checked,
                    interestCheckbox: false,
                  });
                  dispatchFocusReducerState({
                    type: EFocusReducer.REPAYMENT_TYPE,
                    payload: EPayloadFocusReducer.SET,
                  });
                  dispatchFocusReducerState({
                    type: EFocusReducer.INTEREST_TYPE,
                    payload: EPayloadFocusReducer.REMOVE,
                  });
                  dispatchErrorReducerState({
                    type: EErrorReducer.TYPE,
                    payload: EPayloadErrorReducer.REMOVE,
                  });
                }}
              />
              {focusReducerState.repayment_type && (
                <div className="col-start-1 row-start-1 h-2 w-2 rounded-full bg-lime-custom" />
              )}
            </div>
            <InputCheckboxLabel label="Repayments" />
          </InputFormCheckboxLayout>
          <InputFormCheckboxLayout isFocus={focusReducerState.interest_type}>
            <div className="grid place-items-center">
              <input
                type="radio"
                className={`col-start-1 row-start-1 h-4 w-4 appearance-none rounded-full border-[1px] ${focusReducerState.interest_type ? "border-lime-custom" : "border-slate-900"}`}
                ref={interestCheckboxRef as React.LegacyRef<HTMLInputElement>}
                onChange={(e) => {
                  if (repaymentCheckboxRef.current?.checked) {
                    repaymentCheckboxRef.current!.checked = false;
                  }
                  mortgageCtx?.updateMortgageParams({
                    repaymentCheckbox: false,
                    interestCheckbox: e.currentTarget!.checked,
                  });
                  dispatchFocusReducerState({
                    type: EFocusReducer.INTEREST_TYPE,
                    payload: EPayloadFocusReducer.SET,
                  });
                  dispatchFocusReducerState({
                    type: EFocusReducer.REPAYMENT_TYPE,
                    payload: EPayloadFocusReducer.REMOVE,
                  });

                  dispatchErrorReducerState({
                    type: EErrorReducer.TYPE,
                    payload: EPayloadErrorReducer.REMOVE,
                  });
                }}
              />
              {focusReducerState.interest_type && (
                <div className="col-start-1 row-start-1 h-2 w-2 rounded-full bg-lime-custom" />
              )}
            </div>
            <InputCheckboxLabel label="Interest Only" />
          </InputFormCheckboxLayout>
        </div>
        {errorReducerState.type && <ErrorAlert />}
      </div>

      <button
        onSubmit={submitHandler}
        className="flex w-full items-center justify-center gap-4 rounded-l-full rounded-r-full bg-lime-custom p-3 font-semibold hover:cursor-pointer hover:bg-lime-custom/50 sm:w-[90%]"
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
