export enum EErrorReducer {
  AMOUNT,
  TERM,
  INTEREST,
  TYPE,
}

export enum EPayloadErrorReducer {
  SET,
  REMOVE,
}

export interface IErrorStateReducer {
  amount: boolean;
  term: boolean;
  interest: boolean;
  type: boolean;
}

export interface IActionReducer {
  type: EErrorReducer;
  payload: EPayloadErrorReducer;
}

const errorReducer = (state: IErrorStateReducer, action: IActionReducer) => {
  switch (action.type) {
    case EErrorReducer.AMOUNT:
      return {
        ...state,
        amount: (state.amount =
          action.payload === EPayloadErrorReducer.SET ? true : false),
      };
    case EErrorReducer.TERM:
      return {
        ...state,
        term: (state.term =
          action.payload === EPayloadErrorReducer.SET ? true : false),
      };
    case EErrorReducer.INTEREST:
      return {
        ...state,
        interest: (state.interest =
          action.payload === EPayloadErrorReducer.SET ? true : false),
      };
    case EErrorReducer.TYPE:
      return {
        ...state,
        type: (state.type =
          action.payload === EPayloadErrorReducer.SET ? true : false),
      };

    default:
      return state;
  }
};

export default errorReducer;
