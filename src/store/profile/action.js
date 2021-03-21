import { ENDPOINTS } from "../../common/endpoints";
import useSnackbar from "../../shared/hooks/useSnackbar";
import { dummyProfile } from "../Stubs";
import { ACTION } from "./reducer";

export const getProfileById = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  // const [error] = useSnackbar("error");
  await dispatch({
    type: ACTION.GET_PROFILE_BY_PID,
    userProfile: dummyProfile,
  });
  //uncomment when linked
  // await fetch(`${ENDPOINTS.URL}/${profileId}`)
  //   .then((resp) => {
  //     if (resp.status >= 400) {
  //       console.log(resp);
  //       error("Failed to fetch profile, please try again later.");
  //     } else {
  //       return resp.json();
  //     }
  //   })
  //   .then((resp) => {
  //     dispatch({
  //       type: ACTION.GET_PROFILE_BY_PID,
  //       profile: resp.profle,
  //     });
  //   })
  //   .catch((err) => console.log(err));
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
        allWorkExperiences: resp.allWorkExperiences,
      });
    })
    .catch((err) => console.log(err));
  dispatch(setIsLoading(false));
};

export const editWorkExperienceById = (
  profileId,
  weId,
  newWorkExperience
) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  ///:profileId/workExperience/:workExperienceId
  await fetch(`${profileId}/workExperience/${weId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWorkExperience),
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
      success("Successfully created profile!");
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

export const setIsLoading = (desiredState) => (dispatch) => {
  dispatch({ type: ACTION.SET_IS_LOADING, isLoading: desiredState });
};
