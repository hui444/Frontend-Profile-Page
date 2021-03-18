const initialState = {
  isLoading: true,
  errorMessage: undefined,
};

export const ACTION = {
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case ACTION.SET_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    }
    default:
      return state;
  }
};
