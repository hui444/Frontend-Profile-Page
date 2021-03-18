import { ACTION } from "./reducer";

export const setIsLoading = (desiredState) => (dispatch) => {
  dispatch({ type: ACTION.SET_IS_LOADING, isLoading: desiredState });
};

export const setErrorMessage = (errorMessage) => (dispatch) => {
  dispatch({ type: ACTION.SET_ERROR_MESSAGE, errorMessage: errorMessage });
};
