const initialState = {
  isLoading: false,
  isOffline: false,
  offlineQueue: [],
  userProfile: undefined,
  workExperience: undefined,
  allWorkExperiences: undefined,
  selectedWorkExperience: undefined,
  profileId: undefined,
};

export const ACTION = {
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_IS_OFFLINE: "SET_IS_OFFLINE",
  SET_OFFLINE_QUEUE: "SET_OFFLINE_QUEUE",
  GET_PROFILE_BY_PID: "GET_PROFILE_BY_PID",
  GET_WORK_EXPERIENCE_BY_WEID: "GET_WORK_EXPERIENCE_BY_WEID",
  GET_ALL_WORK_EXPERIENCE_BY_PID: "GET_ALL_WORK_EXPERIENCE_BY_PID",
  SET_SELECTED_WORK_EXPERIENCE: "SET_SELECTED_WORK_EXPERIENCE",
  SET_PROFILE_ID: "SET_PROFILE_ID",
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case ACTION.SET_IS_OFFLINE: {
      return {
        ...state,
        isOffline: action.isOffline,
      };
    }
    case ACTION.SET_OFFLINE_QUEUE: {
      return {
        ...state,
        offlineQueue: action.offlineQueue,
      };
    }
    case ACTION.GET_PROFILE_BY_PID: {
      return {
        ...state,
        userProfile: action.userProfile,
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
    case ACTION.SET_SELECTED_WORK_EXPERIENCE: {
      return {
        ...state,
        selectedWorkExperience: action.selectedWorkExperience,
      };
    }
    case ACTION.SET_PROFILE_ID: {
      return {
        ...state,
        profileId: action.profileId,
      };
    }
    default:
      return state;
  }
};
