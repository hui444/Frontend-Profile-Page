import { ENDPOINTS } from "../../common/endpoints";
import useSnackbar from "../../shared/hooks/useSnackbar";
import { ACTION } from "./reducer";
import uuid from "react-uuid";

const setProfileId = (profileId) => (dispatch) => {
  dispatch({
    type: ACTION.SET_PROFILE_ID,
    profileId: profileId,
  });
};

export const getProfileById = (profileId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  // const [error] = useSnackbar("error");
  if (profileId === undefined) {
    await fetch(ENDPOINTS.URL)
      .then((resp) => {
        if (resp.status >= 400) {
          console.log(resp);
        } else return resp.json();
      })
      .then((resp) => {
        dispatch({
          type: ACTION.GET_PROFILE_BY_PID,
          userProfile: resp.profile,
        });
        dispatch(setProfileId(resp.profile.id));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ACTION.GET_PROFILE_BY_PID,
          userProfile: undefined,
        });
      });
  } else {
    await fetch(`${ENDPOINTS.URL}/${profileId}`)
      .then((resp) => {
        if (resp.status >= 400) {
          console.log(resp);
          // error("No profiles found, create one!");
        } else {
          return resp.json();
        }
      })
      .then((resp) => {
        console.log(resp);
        dispatch({
          type: ACTION.GET_PROFILE_BY_PID,
          userProfile: resp.profile,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ACTION.GET_PROFILE_BY_PID,
          userProfile: undefined,
        });
      });
  }
  dispatch(setIsLoading(false));
};

export const getWorkExperienceById = (profileId, weId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");

  await fetch(`${ENDPOINTS.URL}/${profileId}/workExperience/${weId}`)
    .then((resp) => {
      if (resp.status >= 400) {
        console.log(resp);
        throw error("Failed to fetch work experience, please try again later.");
      } else {
        return resp.json();
      }
    })
    .then((resp) => {
      dispatch({
        type: ACTION.GET_WORK_EXPERIENCE_BY_WEID,
        workExperience: resp.workExperience,
      });
    })
    .catch((err) => console.log(err));
  dispatch(setIsLoading(false));
};

export const getAllWorkExperiences = (profileId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");

  // /:profileId/workExperience/all
  await fetch(`${ENDPOINTS.URL}/${profileId}/workExperience/all`)
    .then((resp) => {
      if (resp.status >= 400) {
        console.log(resp);
        throw error(
          "Failed to get your work experiences, please try again later."
        );
      } else {
        return resp.json();
      }
    })
    .then((resp) => {
      dispatch({
        type: ACTION.GET_ALL_WORK_EXPERIENCE_BY_PID,
        allWorkExperiences: resp.workExperiences,
      });
    })
    .catch((err) => console.log(err));
  dispatch(setIsLoading(false));
};

export const editWorkExperienceById = (
  profileId,
  weId,
  workExperience
) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  console.log(`${profileId}/workExperience/${weId}`);
  console.log(workExperience);
  ///:profileId/workExperience/:workExperienceId
  await fetch(`${ENDPOINTS.URL}/${profileId}/workExperience/${weId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workExperience),
  })
    .then((resp) => {
      if (resp.status >= 400) {
        console.log(resp);
        throw error("Failed to update work experience, please try again.");
      } else {
        return resp.json();
      }
    })
    .then((resp) => {
      console.log(resp);
      success("Successfully updated work experience!");
      dispatch(getAllWorkExperiences(profileId));
    })
    .catch((err) => console.log(err));
  dispatch(setIsLoading(false));
};

export const editProfileById = (profileId, newProfile) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  ///:profileId
  await fetch(`${ENDPOINTS.URL}/${profileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProfile),
  })
    .then((resp) => {
      if (resp.status >= 400) {
        throw error("Failed to update profile, please try again.");
      } else {
        return resp.json();
      }
    })
    .then((resp) => {
      console.log(resp);
      success("Successfully updated profile!");
      dispatch(getProfileById(profileId));
    })
    .catch((err) => console.log(err));
  dispatch(setIsLoading(false));
};

export const createProfile = (profile) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  ///create
  await fetch(`${ENDPOINTS.URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  })
    .then((resp) => {
      if (resp.status >= 400) {
        console.log(resp);
        throw error("Failed to create profile, please try again.");
      } else {
        return resp.json();
      }
    })
    .then((resp) => {
      console.log(resp);
      console.log(resp.profile);
      success("Successfully created profile!");
      dispatch(getProfileById(resp.profile.id));
      dispatch(setProfileId(resp.profile.id));
    })
    .catch((err) => console.log(err));
  dispatch(setIsLoading(false));
};

export const createWorkExperience = (profileId, workExperience) => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  const newWorkExperience = {
    ...workExperience,
    weId: uuid(),
  };

  ///:profileId/create
  await fetch(`${ENDPOINTS.URL}/${profileId}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWorkExperience),
  })
    .then((resp) => {
      if (resp.status >= 400) {
        console.log(resp);
        throw error("Failed to create work experience, please try again.");
      } else {
        return resp.json();
      }
    })
    .then((resp) => {
      console.log(resp);
      success("Successfully created work experience!");
      dispatch(getProfileById(profileId));
    })
    .catch((err) => console.log(err));
  dispatch(setIsLoading(false));
};
export const deleteWorkExperience = (profileId, weId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  ///:profileId/workExperience/:workExperienceId
  await fetch(`${ENDPOINTS.URL}/${profileId}/workExperience/${weId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (resp.status >= 400) {
        console.log(resp);
        throw error("Failed to delete work experience, please try again.");
      } else {
        return resp.json();
      }
    })
    .then((resp) => {
      console.log(resp);
      success("Successfully deleted work experience!");
      dispatch(getAllWorkExperiences(profileId));
    })
    .catch((err) => console.log(err));
  dispatch(setIsLoading(false));
};

export const setSelectedWorkExperience = (selectedWorkExperience) => (
  dispatch
) => {
  dispatch({
    type: ACTION.SET_SELECTED_WORK_EXPERIENCE,
    selectedWorkExperience: selectedWorkExperience,
  });
};

export const resetSelectedWorkExperience = () => (dispatch) => {
  dispatch(setSelectedWorkExperience(undefined));
};

export const setIsLoading = (desiredState) => (dispatch) => {
  dispatch({ type: ACTION.SET_IS_LOADING, isLoading: desiredState });
};
