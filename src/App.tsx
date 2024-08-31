import { createContext, ReactNode, useContext, useState } from "react";
import "./App.css";
import Calculator from "./Components/Calculator";
import Result from "./Components/Result";

export interface IMortgage {
  mortgageAmount: number;
  mortgageTerm: number;
  interestRate: number;
  repaymentCheckbox?: boolean;
  interestCheckbox?: boolean;
}

interface IAppContext {
  mortgageData: IMortgage | null;
  addMortgageParams: (
    amount: number,
    term: number,
    interestRate: number,
    repaymentCheckbox?: boolean,
    interestCheckbox?: boolean,
  ) => void;
  updateMortgageParams: (
    amount?: number,
    term?: number,
    interestRate?: number,
  ) => void;

  resetMortgageParams: () => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appState, SetAppState] = useState<IMortgage | null>(null);

  const addMortgageParams = (
    amount: number,
    term: number,
    interestRate: number,
    repaymentCheckbox?: boolean,
    interestCheckbox?: boolean,
  ) => {
    console.log(repaymentCheckbox);
    console.log(interestCheckbox);

    SetAppState({
      mortgageAmount: amount,
      mortgageTerm: term,
      interestRate,
      repaymentCheckbox,
      interestCheckbox,
    });
  };

  const updateMortgageParams = (
    amount?: number,
    term?: number,
    interestRate?: number,
  ) => {
    if (amount) {
      SetAppState((prev) => {
        return { ...(prev as IMortgage), amount };
      });
      return;
    }
    if (term) {
      SetAppState((prev) => {
        return { ...(prev as IMortgage), term };
      });
      return;
    }
    if (interestRate) {
      SetAppState((prev) => {
        return { ...(prev as IMortgage), interestRate };
      });
      return;
    }
  };

  const resetMortgageParams = () => {
    SetAppState(null);
  };

  return (
    <AppContext.Provider
      value={{
        mortgageData: appState,
        addMortgageParams,
        updateMortgageParams,
        resetMortgageParams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function App() {
  return (
    <AppContextProvider>
      <div className="w-full sm:p-10 md:flex md:w-3/5 md:flex-row md:rounded-r-2xl md:bg-white md:p-0">
        <Calculator />
        <Result />
      </div>
    </AppContextProvider>
  );
}

export default App;
