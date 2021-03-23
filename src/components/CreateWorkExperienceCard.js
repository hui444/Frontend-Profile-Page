import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { Button, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import Card from "../shared/components/Card";
import ImageUpload from "../shared/components/ImageUpload";

import { RED_ASTERISK } from "../common/constants";
import { createWorkExperience } from "../store/profile/action";

import "./CreateWorkExperienceCard.css";
import "antd/dist/antd.css";

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
    <Card title="Add Work Experience">
      <div className="CreateWorkExperienceCard-form-topContainer">
        <div className="CreateWorkExperienceCard-form-section">
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
          {(errors.companyName || errors.companyName?.type === "validate") && (
            <p>Company Name Required!</p>
          )}
        </div>

        <div className="CreateWorkExperienceCard-form-section">
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
            <p>Job Title Required!</p>
          )}
        </div>

        <div className="CreateWorkExperienceCard-form-section">
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
            <p>Job Description Required!</p>
          )}
        </div>

        <div className="CreateWorkExperienceCard-dates-container">
          <h4>Employment Period{RED_ASTERISK}</h4>
          <div className="CreateWorkExperienceCard-dates-container-inputs">
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
                <em> - </em>
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

        <div className="CreateWorkExperienceCard-currentJob-container">
          <em>I'm still working here!</em>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={isCurrentJob}
            onClick={() => {
              setIsCurrentJob(!isCurrentJob);
            }}
          />
        </div>
        <div className="CreateWorkExperienceCard-form-section">
          <h4>Company Logo</h4>
          <ImageUpload
            id={"image"}
            center
            onInput={setImage}
            isValid={setImageIsValid}
          />
        </div>
      </div>

      <div className="CreateWorkExperienceCard-button-container">
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
    </Card>
  );
};

export default CreateWorkExperienceCard;
