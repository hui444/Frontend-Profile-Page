import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";

import { Button, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import Modal from "../shared/components/Modal";
import ImageUpload from "../shared/components/ImageUpload";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import { RED_ASTERISK } from "../common/constants";

import {
  editWorkExperienceById,
  getWorkExperienceById,
  resetSelectedWorkExperience,
} from "../store/profile/action";

import "./EditWorkExperienceCard.css";
import "antd/dist/antd.css";

const EditWorkExperienceCard = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const { selectedWorkExperience, isLoading } = useSelector(
    (state) => state.profile
  );
  const [isCurrentJob, setIsCurrentJob] = useState(
    selectedWorkExperience?.isCurrentJob ?? true
  );
  const [image, setImage] = useState();
  const [imageIsValid, setImageIsValid] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const profileId = useParams().profileId;
  const workExperienceId = useParams().workExperienceId;

  useEffect(() => {
    dispatch(getWorkExperienceById(profileId, workExperienceId));
  }, [dispatch, profileId, workExperienceId]);

  const onSave = (values) => {
    if (!errors.length && imageIsValid) {
      const updatedWorkExperience = {
        ...(values.companyName !== selectedWorkExperience.companyName && {
          companyName: values.companyName,
        }),
        ...(values.jobTitle !== selectedWorkExperience.jobTitle && {
          jobTitle: values.jobTitle,
        }),
        ...(values.jobDescription !== selectedWorkExperience.jobDescription && {
          jobDescription: values.jobDescription,
        }),
        ...(values.startDate !== selectedWorkExperience.startDate && {
          startDate: values.startDate,
        }),
        ...(values.endDate &&
          values.endDate !== selectedWorkExperience.endDate && {
            endDate: values.endDate,
          }),
        ...(isCurrentJob !== selectedWorkExperience.isCurrentJob && {
          isCurrentJob: isCurrentJob,
        }),
        ...(image !== selectedWorkExperience.companyLogo && {
          companyLogo: image,
        }),
      };
      if (!_.isEmpty(updatedWorkExperience)) {
        dispatch(
          editWorkExperienceById(
            profileId,
            selectedWorkExperience.weId,
            updatedWorkExperience
          )
        );
      }
      history.push(`/${profileId}/edit/workExperiences`);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <Modal>
          <form className="EditIndivWorkExperienceModal-form">
            <div className="EditIndivWorkExperienceModal-form-header-container">
              <h1>Edit Work Experience</h1>
            </div>
            <div className="EditIndivWorkExperienceModal-form-topContainer">
              <div className="EditIndivWorkExperienceModal-form-section">
                <h4>Company Name{RED_ASTERISK}</h4>
                <input
                  type="text"
                  placeholder={"Company"}
                  name="companyName"
                  ref={register({ required: "COMPANY NAME REQUIRED!" })}
                  style={{
                    borderColor: errors.companyName && "red",
                    background: errors.companyName && "#ffd1d1",
                  }}
                  defaultValue={
                    selectedWorkExperience.companyName &&
                    `${selectedWorkExperience.companyName}`
                  }
                />
                {errors.companyName && <p>{errors.companyName.message}</p>}
              </div>
              <div className="EditIndivWorkExperienceModal-form-section">
                <h4>Job Title{RED_ASTERISK}</h4>
                <input
                  type="text"
                  placeholder={"Job Title"}
                  name="jobTitle"
                  ref={register({ required: "JOB TITLE REQUIRED!" })}
                  style={{
                    borderColor: errors.jobTitle && "red",
                    background: errors.jobTitle && "#ffd1d1",
                  }}
                  defaultValue={
                    selectedWorkExperience.jobTitle &&
                    `${selectedWorkExperience.jobTitle}`
                  }
                />
                {errors.jobTitle && <p>{errors.jobTitle.message}</p>}
              </div>
              <div className="EditIndivWorkExperienceModal-form-section">
                <h4>Job Description{RED_ASTERISK}</h4>
                <textarea
                  placeholder={"Job Description"}
                  name="jobDescription"
                  ref={register({ required: "JOB DESCRIPTION REQUIRED!" })}
                  style={{
                    borderColor: errors.jobDescription && "red",
                    background: errors.jobDescription && "#ffd1d1",
                  }}
                  defaultValue={
                    selectedWorkExperience.jobDescription &&
                    `${selectedWorkExperience.jobDescription}`
                  }
                />
                {errors.jobDescription && (
                  <p>{errors.jobDescription.message}</p>
                )}
              </div>

              <div className="EditIndivWorkExperienceModal-dates-container">
                <h4>Employment Period{RED_ASTERISK}</h4>
                <div className="EditIndivWorkExperienceModal-dates-container-inputs">
                  <input
                    type="month"
                    placeholder="Start Date"
                    name="startDate"
                    ref={register({ required: true })}
                    style={{
                      borderColor: errors.startDate && "red",
                      background: errors.startDate && "#ffd1d1",
                    }}
                    defaultValue={
                      selectedWorkExperience.startDate &&
                      `${selectedWorkExperience.startDate}`
                    }
                  />

                  {!isCurrentJob && (
                    <>
                      <text style={{ color: "black" }}> - </text>
                      <input
                        type="month"
                        placeholder="End Date"
                        name="endDate"
                        ref={register({
                          required: true,
                          validate: (input) => input >= watch("startDate"),
                        })}
                        style={{
                          borderColor: errors.endDate && "red",
                          background: errors.endDate && "#ffd1d1",
                        }}
                        defaultValue={
                          selectedWorkExperience.endDate &&
                          `${selectedWorkExperience.endDate}`
                        }
                      />
                    </>
                  )}
                </div>
                {errors.endDate?.type === "validate" && (
                  <p>END DATE CANNOT BE BEFORE START DATE!</p>
                )}
              </div>

              <div className="EditIndivWorkExperienceModal-currentJob-container">
                <text>I'm still working here!</text>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={isCurrentJob}
                  onClick={() => {
                    setIsCurrentJob(!isCurrentJob);
                  }}
                />
              </div>
              <div className="EditIndivWorkExperienceModal-form-section">
                <h4>Company Logo</h4>
                <ImageUpload
                  id={"image"}
                  center
                  onInput={setImage}
                  isValid={setImageIsValid}
                  defaultValue={selectedWorkExperience.companyLogo}
                />
              </div>
            </div>

            <div className="EditIndivWorkExperienceModal-button-container">
              <Button
                type="cancel"
                onClick={() => {
                  dispatch(resetSelectedWorkExperience());
                  return history.push(`/${profileId}/edit/workExperiences`);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={handleSubmit(onSave)}>
                Save
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditWorkExperienceCard;
