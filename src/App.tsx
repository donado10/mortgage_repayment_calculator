import "./App.css";
import { AppContextProvider } from "./AppContext";
import Calculator from "./Components/Calculator";
import Result from "./Components/Result";

function App() {
  return (
    <div className="w-full overflow-hidden sm:p-10 md:flex md:w-3/5 md:flex-row md:rounded-l-2xl md:rounded-r-2xl md:bg-white md:p-0">
      <AppContextProvider>
        <Calculator />
        <Result />
      </AppContextProvider>
    </div>
  );
}

export default App;
