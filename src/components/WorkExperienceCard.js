import React, { useState } from "react";
import ClampLines from "react-clamp-lines";

import { Button } from "antd";
import { imageUri } from "../assets/fallBackPlaceholder";

import "./WorkExperienceCard.css";
import "antd/dist/antd.css";

const WorkExperienceCard = (props) => {
  return (
    <>
      <div className="WorkExperienceCard-flip-card__main-container">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="WorkExperienceCard-flip-card__front-left">
            <img src={props.companyImage ?? imageUri} alt="company" />
          </div>
          <div className="WorkExperienceCard-flip-card__front-right">
            <b>{props.position}</b>
            <text>{props.company}</text>
            <text>{props.date}</text>
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
