import React from "react";
import ClampLines from "react-clamp-lines";

import { imageUri } from "../assets/fallBackPlaceholder";

import "./WorkExperienceCard.css";
import "antd/dist/antd.css";

const WorkExperienceCard = (props) => {
  return (
    <>
      <div className="WorkExperienceCard__main-container">
        <div className="WorkExperienceCard__main-subcontainer">
          <div className="WorkExperienceCard__left-container">
            <img src={props.companyImage ?? imageUri} alt="company" />
          </div>
          <div className="WorkExperienceCard__right-container">
            <b>{props.position}</b>
            <em>{props.company}</em>
            <em>{props.date}</em>
            <ClampLines
              text={props.description}
              id="custom"
              lines={4}
              ellipsis="..."
              moreText="Show more"
              lessText="Show less"
              className="custom-class"
              innerElement="p"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkExperienceCard;
