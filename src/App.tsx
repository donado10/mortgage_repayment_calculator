import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calculator from "./Components/Calculator";
import Result from "./Components/Result";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <Calculator />
      <Result />
    </div>
  );
}

export default App;
