import { useState } from "react";
import "./App.css";
import Calculator from "./Components/Calculator";
import Result from "./Components/Result";

function App() {
  const [repaymentResult, setRepaymentResult] = useState<number | null>(null);

  return (
    <div className="w-full sm:p-10 md:flex md:w-3/5 md:flex-row md:rounded-r-2xl md:bg-white md:p-0">
      <Calculator setRepayment={setRepaymentResult} />
      <Result value={repaymentResult} />
    </div>
  );
}

export default App;
