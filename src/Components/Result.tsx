import React from "react";
import Illustation from "../assets/illustration-empty.svg";
import { useAppContext } from "../AppContext";

const BeforeCalcul = () => {
  return (
    <>
      <div>
        <img src={Illustation} alt="" />
      </div>
      <h1 className="text-2xl font-bold">Results shown here</h1>
      <p className="text-center">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </>
  );
};

const AfterCalcul: React.FC<{
  value: number;
}> = ({ value }) => {
  const mortgageCtx = useAppContext();
  const { mortgageTerm: years } = { ...mortgageCtx?.mortgageData };
  const totalTerm = value * (years! * 12);

  return (
    <>
      <h1 className="self-start text-2xl font-bold">Your results</h1>
      <p className="text-start text-base text-slate-300">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </p>
      <div className="flex w-full flex-grow flex-col justify-center rounded-xl border-t-4 border-t-lime-custom bg-black/25 pl-2 pr-2">
        <div className="flex flex-col justify-center gap-1 border-b-[1px] border-b-slate-500 p-2">
          <span className="text-base text-slate-300">
            Your monthly repayments
          </span>
          <h1 className="text-4xl font-bold text-lime-custom">
            £{value.toFixed(2)}
          </h1>
        </div>
        <div className="flex flex-col justify-center gap-1 p-2">
          <span className="text-base text-slate-300">
            Total you'll repay over the terms
          </span>
          <h2 className="text-xl font-bold text-white">
            £{totalTerm.toFixed(2)}
          </h2>
        </div>
      </div>
    </>
  );
};

const Result = () => {
  const mortgageCtx = useAppContext();
  const { mortgageResult } = {
    ...mortgageCtx?.mortgageData,
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-slate-900 p-12 text-white sm:rounded-b-2xl md:w-1/2 md:rounded-b-none md:rounded-r-2xl md:rounded-bl-[100px]">
      {!mortgageResult && <BeforeCalcul />}
      {mortgageResult && <AfterCalcul value={mortgageResult} />}
    </div>
  );
};

export default Result;
