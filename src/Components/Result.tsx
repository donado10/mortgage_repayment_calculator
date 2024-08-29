import React from "react";
import Illustation from "../assets/illustration-empty.svg";

const Result = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-slate-900 p-12 text-white">
      <div>
        <img src={Illustation} alt="" />
      </div>
      <h1 className="text-2xl font-bold">Results shown here</h1>
      <p className="text-center">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </div>
  );
};

export default Result;
