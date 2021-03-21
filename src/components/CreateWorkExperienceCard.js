import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { Button, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import Modal from "../shared/components/Modal";
import ImageUpload from "../shared/components/ImageUpload";

import "./CreateWorkExperienceCard.css";
import "antd/dist/antd.css";
import { RED_ASTERISK } from "../common/constants";
import { createWorkExperience } from "../store/profile/action";

const CreateWorkExperienceCard = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const [isCurrentJob, setIsCurrentJob] = useState(true);
  const [image, setImage] = useState();
  const [imageIsValid, setImageIsValid] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const profileId = useParams().profileId;

  const onSubmit = (values) => {
    const newWorkExperience = {
      companyName: values.companyName,
      jobTitle: values.jobTitle,
      jobDescription: values.jobDescription,
      startDate: values.startDate,
      ...(values.endDate && { endDate: values.endDate }),
      isCurrentJob: isCurrentJob,
      ...(image && { companyLogo: image }),
    };
    if (!errors.length && !(image && !imageIsValid)) {
      dispatch(createWorkExperience(profileId, newWorkExperience));
      history.push("/");
    }
  };

  return (
    <Modal>
      <form className="CreateWorkExperience-form">
        <div className="CreateWorkExperience-form-header-container">
          <h1>Add Work Experience</h1>
        </div>
        <div className="CreateWorkExperience-form-topContainer">
          <div className="CreateWorkExperience-form-section">
            <h4>Company Name{RED_ASTERISK}</h4>
            <input
              type="text"
              placeholder={"Company"}
              name="companyName"
              ref={register({
                required: true,
                validate: (input) => input.trim().length !== 0,
              })}
              style={{
                borderColor: errors.companyName && "red",
                background: errors.companyName && "#ffd1d1",
              }}
            />
            {(errors.companyName ||
              errors.companyName?.type === "validate") && (
              <p style={{ margin: "0" }}>Company Name Required!</p>
            )}
          </div>

          <div className="CreateWorkExperience-form-section">
            <h4>Job Title{RED_ASTERISK}</h4>
            <input
              type="text"
              placeholder={"Job Title"}
              name="jobTitle"
              ref={register({
                required: true,
                validate: (input) => input.trim().length !== 0,
              })}
              style={{
                borderColor: errors.jobTitle && "red",
                background: errors.jobTitle && "#ffd1d1",
              }}
            />
            {(errors.jobTitle || errors.jobTitle?.type === "validate") && (
              <p style={{ margin: "0" }}>Job Title Required!</p>
            )}
          </div>

          <div className="CreateWorkExperience-form-section">
            <h4>Job Description{RED_ASTERISK}</h4>
            <textarea
              placeholder={"Job Description"}
              name="jobDescription"
              ref={register({
                required: true,
                validate: (input) => input.trim().length !== 0,
              })}
              style={{
                borderColor: errors.jobDescription && "red",
                background: errors.jobDescription && "#ffd1d1",
              }}
            />
            {(errors.jobDescription ||
              errors.jobDescription?.type === "validation") && (
              <p style={{ margin: "0" }}>Job Description Required!</p>
            )}
          </div>

          <div className="CreateWorkExperience-dates-container">
            <h4>Employment Period{RED_ASTERISK}</h4>
            <div className="CreateWorkExperience-dates-container-inputs">
              <input
                type="month"
                placeholder="Start Date"
                name="startDate"
                ref={register({ required: true })}
                style={{
                  borderColor: errors.startDate && "red",
                  background: errors.startDate && "#ffd1d1",
                }}
              />

              {!isCurrentJob && (
                <>
                  <text> - </text>
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
                  />
                </>
              )}
            </div>
            {errors.endDate?.type === "validate" && (
              <p>End date cannot be before start date!</p>
            )}
          </div>

          <div className="CreateWorkExperience-currentJob-container">
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
          <div className="CreateWorkExperience-form-section">
            <h4>Company Logo</h4>
            <ImageUpload
              id={"image"}
              center
              onInput={setImage}
              isValid={setImageIsValid}
            />
          </div>
        </div>

        <div className="CreateWorkExperience-button-container">
          <Button
            type="cancel"
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWorkExperienceCard;
