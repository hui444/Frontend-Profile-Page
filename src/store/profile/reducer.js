const initialState = {
  isLoading: false,
  errorMessage: undefined,
  profile: undefined,
  workExperience: undefined,
  allWorkExperiences: undefined,
};

export const ACTION = {
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
  GET_PROFILE_BY_PID: "GET_PROFILE_BY_PID",
  GET_WORK_EXPERIENCE_BY_WEID: "GET_WORK_EXPERIENCE_BY_WEID",
  GET_ALL_WORK_EXPERIENCE_BY_PID: "GET_ALL_WORK_EXPERIENCE_BY_PID",
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
    case ACTION.GET_PROFILE_BY_PID: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case ACTION.GET_WORK_EXPERIENCE_BY_WEID: {
      return {
        ...state,
        workExperience: action.workExperience,
      };
    }
    case ACTION.GET_ALL_WORK_EXPERIENCE_BY_PID: {
      return {
        ...state,
        allWorkExperiences: action.allWorkExperiences,
      };
    }
    default:
      return state;
  }
};
