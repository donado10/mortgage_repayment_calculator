import { createContext, ReactNode, useContext, useState } from "react";

export interface IMortgage {
  mortgageAmount: number;
  mortgageTerm: number;
  interestRate: number;
  repaymentCheckbox?: boolean;
  interestCheckbox?: boolean;
  mortgageResult?: number;
}

export interface IAppContext {
  mortgageData: IMortgage | null;
  addMortgageParams: (
    amount: number,
    term: number,
    interestRate: number,
    repaymentCheckbox?: boolean,
    interestCheckbox?: boolean,
  ) => void;
  updateMortgageParams: (mortgage?: {
    amount?: number;
    term?: number;
    interestRate?: number;
    repaymentCheckbox?: boolean;
    interestCheckbox?: boolean;
    mortgageResult?: number;
  }) => void;

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
    SetAppState({
      mortgageAmount: amount,
      mortgageTerm: term,
      interestRate,
      repaymentCheckbox,
      interestCheckbox,
    });
  };

  const updateMortgageParams = (mortgage?: {
    amount?: number;
    term?: number;
    interestRate?: number;
    repaymentCheckbox?: boolean;
    interestCheckbox?: boolean;
    mortgageResult?: number;
  }) => {
    if (mortgage?.amount) {
      SetAppState((prev) => {
        return { ...(prev as IMortgage), mortgageAmount: mortgage?.amount! };
      });
      return;
    }
    if (mortgage?.term) {
      SetAppState((prev) => {
        return { ...(prev as IMortgage), mortgageTerm: mortgage?.term! };
      });
      return;
    }
    if (mortgage?.interestRate) {
      SetAppState((prev) => {
        return {
          ...(prev as IMortgage),
          interestRate: mortgage?.interestRate!,
        };
      });
      return;
    }
    if (mortgage?.repaymentCheckbox || !mortgage?.repaymentCheckbox) {
      SetAppState((prev) => {
        return {
          ...(prev as IMortgage),
          repaymentCheckbox: mortgage?.repaymentCheckbox!,
        };
      });
    }
    if (mortgage?.interestCheckbox || !mortgage?.interestCheckbox) {
      SetAppState((prev) => {
        return {
          ...(prev as IMortgage),
          interestCheckbox: mortgage?.interestCheckbox!,
        };
      });
    }

    if (mortgage?.mortgageResult) {
      SetAppState((prev) => {
        return {
          ...(prev as IMortgage),
          mortgageResult: mortgage?.mortgageResult!,
        };
      });
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
