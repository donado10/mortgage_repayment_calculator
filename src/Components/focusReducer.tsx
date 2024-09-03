export enum EFocusReducer {
  AMOUNT,
  TERM,
  INTEREST,
  REPAYMENT_TYPE,
  INTEREST_TYPE,
}

export enum EPayloadFocusReducer {
  SET,
  REMOVE,
}

export interface IFocusStateReducer {
  amount: boolean;
  term: boolean;
  interest: boolean;
  repayment_type: boolean;
  interest_type: boolean;
}

export interface IActionReducer {
  type: EFocusReducer;
  payload: EPayloadFocusReducer;
}

const focusReducer = (state: IFocusStateReducer, action: IActionReducer) => {
  switch (action.type) {
    case EFocusReducer.AMOUNT:
      return {
        ...state,
        amount: (state.amount =
          action.payload === EPayloadFocusReducer.SET ? true : false),
      };
    case EFocusReducer.TERM:
      return {
        ...state,
        term: (state.term =
          action.payload === EPayloadFocusReducer.SET ? true : false),
      };
    case EFocusReducer.INTEREST:
      return {
        ...state,
        interest: (state.interest =
          action.payload === EPayloadFocusReducer.SET ? true : false),
      };
    case EFocusReducer.REPAYMENT_TYPE:
      return {
        ...state,
        repayment_type: (state.repayment_type =
          action.payload === EPayloadFocusReducer.SET ? true : false),
      };
    case EFocusReducer.INTEREST_TYPE:
      return {
        ...state,
        interest_type: (state.interest_type =
          action.payload === EPayloadFocusReducer.SET ? true : false),
      };

    default:
      return state;
  }
};

export default focusReducer;
