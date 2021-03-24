import { ENDPOINTS } from "../../common/endpoints";
import useSnackbar from "../../shared/hooks/useSnackbar";
import { ACTION } from "./reducer";
import uuid from "react-uuid";
import { loadState } from "../localStorage";

export const setProfileId = (profileId) => (dispatch) => {
  dispatch({
    type: ACTION.SET_PROFILE_ID,
    profileId: profileId,
  });
};

export const getProfileById = (profileId) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const { isOffline } = getState().profile;

  if (isOffline) {
    const storedData = loadState();
    dispatch({
      type: ACTION.GET_PROFILE_BY_PID,
      userProfile: storedData.profile.userProfile,
    });
  } else {
    console.log(profileId);
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
          console.log(resp.profile.id);
          dispatch(setProfileId(resp.profile.id));
        })
        .catch((err) => {
          console.log(err);
          console.log("userProfile is set to undefined!");
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
          console.log("Set userProfile to undefined!");
          dispatch({
            type: ACTION.GET_PROFILE_BY_PID,
            userProfile: undefined,
          });
        });
    }
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

export const getAllWorkExperiences = (profileId) => async (
  dispatch,
  getState
) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const { isOffline } = getState().profile;

  if (isOffline) {
    // const storedData = loadState();
    // console.log(storedData.profile.userProfile.workExperiences);
    // dispatch({
    //   type: ACTION.GET_ALL_WORK_EXPERIENCE_BY_PID,
    //   allWorkExperiences: storedData.profile.userProfile.workExperiences,
    // });
  } else {
    console.log(profileId);

    if (profileId === undefined) {
      // /workExperiences
      await fetch(`${ENDPOINTS.URL}/workExperiences`)
        .then((resp) => {
          if (resp.status >= 400) {
            console.log(resp);
          } else return resp.json();
        })
        .then((resp) => {
          console.log(resp);
          dispatch({
            type: ACTION.GET_ALL_WORK_EXPERIENCE_BY_PID,
            allWorkExperiences: resp.workExperiences,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: ACTION.GET_ALL_WORK_EXPERIENCE_BY_PID,
            allWorkExperiences: undefined,
          });
        });
    } else {
      // /:profileId/workExperience/all
      await fetch(`${ENDPOINTS.URL}/${profileId}/workExperience/all`)
        .then((resp) => {
          if (resp.status >= 400) {
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
    }
  }
  dispatch(setIsLoading(false));
};

export const editWorkExperienceById = (
  profileId,
  weId,
  workExperience
) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  const { isOffline } = getState().profile;
  if (isOffline) {
    const req = {
      endpoint: `${ENDPOINTS.URL}/${profileId}/workExperience/${weId}`,
      method: "PATCH",
      body: JSON.stringify(workExperience),
    };
    const oldProfile = loadState().profile.userProfile;
    const selectedWorkExperienceIndex = oldProfile.workExperiences.findIndex(
      (x) => x.weId === weId
    );
    console.log(selectedWorkExperienceIndex);
    console.log(oldProfile.workExperiences);
    let updateOfflineProfile = oldProfile;
    if (selectedWorkExperienceIndex !== -1) {
      const selectedWE =
        oldProfile.workExperiences[selectedWorkExperienceIndex];
      console.log("work experience id: " + selectedWorkExperienceIndex);
      oldProfile.workExperiences[selectedWorkExperienceIndex] = {
        companyLogo: workExperience.companyLogo
          ? workExperience.companyLogo
          : workExperience.companyLogo === null
          ? null
          : selectedWE.companyLogo,
        companyName: workExperience.companyName
          ? workExperience.companyName
          : selectedWE.companyName,
        endDate: workExperience.endDate
          ? workExperience.endDate
          : workExperience.endDate === undefined
          ? undefined
          : selectedWE.endDate,
        isCurrentJob: workExperience.isCurrentJob
          ? workExperience.isCurrentJob
          : selectedWE.isCurrentJob,
        jobDescription: workExperience.jobDescription
          ? workExperience.jobDescription
          : selectedWE.jobDescription,
        jobTitle: workExperience.jobTitle
          ? workExperience.jobTitle
          : selectedWE.jobTitle,
        startDate: workExperience.startDate
          ? workExperience.startDate
          : selectedWE.startDate,
        weId: selectedWE.weId,
      };
      updateOfflineProfile = oldProfile;
      console.log(oldProfile.workExperiences);
      //update userProfile, allWorkExperiences states
      dispatch({
        type: ACTION.GET_PROFILE_BY_PID,
        userProfile: updateOfflineProfile,
      });
      dispatch({
        type: ACTION.GET_ALL_WORK_EXPERIENCE_BY_PID,
        allWorkExperiences: updateOfflineProfile.workExperiences,
      });
    }

    dispatch(setOfflineQueue(req));
  } else {
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
        success("Successfully updated work experience!");
        dispatch(getAllWorkExperiences(profileId));
      })
      .catch((err) => console.log(err));
  }
  dispatch(setIsLoading(false));
};

export const editProfileById = (profileId, newProfile) => async (
  dispatch,
  getState
) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");
  const { isOffline } = getState().profile;

  if (isOffline) {
    const req = {
      endpoint: `${ENDPOINTS.URL}/${profileId}`,
      method: "PATCH",
      body: JSON.stringify(newProfile),
    };
    const oldProfile = loadState().profile.userProfile;
    const updateOfflineProfile = {
      ...oldProfile,
      ...(newProfile.age && { age: newProfile.age }),
      ...((newProfile.contactNumber || newProfile.contactNumber === null) && {
        contactNumber: newProfile.contactNumber
          ? newProfile.contactNumber
          : undefined,
      }),
      ...(newProfile.description && {
        description: newProfile.description,
      }),
      ...((newProfile.email || newProfile.email === null) && {
        email: newProfile.email ? newProfile.email : undefined,
      }),
      ...(newProfile.name && { name: newProfile.name }),
      ...((newProfile.profileImage || newProfile.profileImage === null) && {
        profileImage: newProfile.profileImage
          ? newProfile.profileImage
          : undefined,
      }),
    };
    dispatch({
      type: ACTION.GET_PROFILE_BY_PID,
      userProfile: updateOfflineProfile,
    });
    dispatch(setOfflineQueue(req));
  } else {
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
        success("Successfully updated profile!");
        dispatch(getProfileById(profileId));
      })
      .catch((err) => console.log(err));
  }
  dispatch(setIsLoading(false));
};

export const createProfile = (profile) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");
  const { isOffline } = getState().profile;

  if (isOffline) {
    const req = {
      endpoint: `${ENDPOINTS.URL}/create`,
      method: "POST",
      body: JSON.stringify(profile),
    };
    dispatch({
      type: ACTION.GET_PROFILE_BY_PID,
      userProfile: profile,
    });
    dispatch(setOfflineQueue(req));
  } else {
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
        success("Successfully created profile!");
        dispatch(getProfileById(resp.profile.id));
        dispatch(setProfileId(resp.profile.id));
      })
      .catch((err) => console.log(err));
  }
  dispatch(setIsLoading(false));
};

export const createWorkExperience = (profileId, workExperience) => async (
  dispatch,
  getState
) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  const newWorkExperience = {
    ...workExperience,
    weId: uuid(),
  };

  const { isOffline } = getState().profile;

  if (isOffline) {
    const req = {
      endpoint: `${ENDPOINTS.URL}/${profileId}/create`,
      method: "POST",
      body: JSON.stringify(newWorkExperience),
    };
    const oldProfile = loadState().profile.userProfile;
    const updatedWorkExperiences = oldProfile.workExperiences.concat(
      newWorkExperience
    );
    const updateOfflineProfile = {
      ...oldProfile,
      workExperiences: updatedWorkExperiences,
    };
    dispatch({
      type: ACTION.GET_PROFILE_BY_PID,
      userProfile: updateOfflineProfile,
    });
    dispatch({
      type: ACTION.GET_ALL_WORK_EXPERIENCE_BY_PID,
      allWorkExperiences: updatedWorkExperiences,
    });
    dispatch(setOfflineQueue(req));
  } else {
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
        success("Successfully created work experience!");
        dispatch(getProfileById(profileId));
      })
      .catch((err) => console.log(err));
  }
  dispatch(setIsLoading(false));
};

export const deleteWorkExperience = (profileId, weId) => async (
  dispatch,
  getState
) => {
  dispatch(setIsLoading(true));
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");
  const { isOffline } = getState().profile;

  if (isOffline) {
    const req = {
      endpoint: `${ENDPOINTS.URL}/${profileId}/workExperience/${weId}`,
      method: "DELETE",
      body: null,
    };
    const oldProfile = loadState().profile.userProfile;
    const updatedWorkExperiences = oldProfile.workExperiences.filter((we) => {
      return we.weId !== weId;
    });
    const updateOfflineProfile = {
      ...oldProfile,
      workExperiences: updatedWorkExperiences,
    };
    dispatch({
      type: ACTION.GET_PROFILE_BY_PID,
      userProfile: updateOfflineProfile,
    });
    dispatch({
      type: ACTION.GET_ALL_WORK_EXPERIENCE_BY_PID,
      allWorkExperiences: updatedWorkExperiences,
    });
    dispatch(setOfflineQueue(req));
  } else {
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
        success("Successfully deleted work experience!");
        dispatch(getAllWorkExperiences(profileId));
      })
      .catch((err) => console.log(err));
  }
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

export const setIsOffline = (isOffline) => (dispatch) => {
  dispatch({ type: ACTION.SET_IS_OFFLINE, isOffline: isOffline });
};

// request = {
// endpoint: string
// method: 'PATCH', 'POST', 'DELETE'
// body: {} || null
// }
export const setOfflineQueue = (request) => (dispatch, getState) => {
  const { offlineQueue } = getState().profile;

  const updatedQueue = offlineQueue.concat(request);
  dispatch({
    type: ACTION.SET_OFFLINE_QUEUE,
    offlineQueue: updatedQueue,
  });
};

export const sendRequests = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  const offlineQueue = loadState().profile.offlineQueue;
  let errors = 0;
  const [error] = useSnackbar("error");
  const [success] = useSnackbar("success");

  await offlineQueue?.forEach(async (req, index) => {
    try {
      if (req.method === "DELETE") {
        await fetch(req.endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            if (resp.status >= 400) return resp;
            else return;
          })
          .catch((err) => {
            console.log(err); //ignore error
            errors++;
          });
      } else if (req.method === "PATCH" || req.method === "POST") {
        await fetch(req.endpoint, {
          method: req.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: req.body,
        })
          .then((resp) => {
            if (resp.status >= 400) return resp;
            else return;
          })
          .catch((err) => {
            console.log(err); //ignore error
            errors++;
          });
      } else {
        console.log(req); //ignore request
        errors++;
        return;
      }
    } catch (err) {
      console.log(err); //ignore error
      errors++;
    }
    if (index === offlineQueue.length - 1) {
      console.log(index);
      console.log(offlineQueue.length);
      //update stores
      const storedData = loadState();
      dispatch(getProfileById(storedData.profile.profileId));
      dispatch(getAllWorkExperiences(storedData.profile.profileId));
      if (errors === 0) {
        success("Successfully updated all offline edits!");
      } else {
        error("Sorry, something offline edits were not updated.");
      }
      //clear offlineQueue
      dispatch(clearOfflineQueue());
      dispatch(setIsLoading(false));
    }
  });
};

export const clearOfflineQueue = () => (dispatch) => {
  dispatch({
    type: ACTION.SET_OFFLINE_QUEUE,
    offlineQueue: [],
  });
  const storedData = loadState();
  dispatch(getProfileById(storedData.profile.profileId));
  dispatch(getAllWorkExperiences(storedData.profile.profileId));
};
