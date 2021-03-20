import { ENDPOINTS } from "../../common/endpoints";
import { ACTION } from "./reducer";

export const fetchProfile = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  await fetch(ENDPOINTS.URL)
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((resp) => {
      dispatch({
        type: ACTION.SET_PROFILE,
        profile: resp.profile,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setErrorMessage(
          err.message ||
            "Something went wrong in fetchProfile, please try again."
        )
      );
    });
  dispatch(setIsLoading(false));
};

export const setIsLoading = (desiredState) => (dispatch) => {
  dispatch({ type: ACTION.SET_IS_LOADING, isLoading: desiredState });
};

export const setErrorMessage = (errorMessage) => (dispatch) => {
  dispatch({ type: ACTION.SET_ERROR_MESSAGE, errorMessage: errorMessage });
};
