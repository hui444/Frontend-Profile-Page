import React from "react";

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
            <p className="WorkExperienceCard-flip-card__front-right__description">
              {props.description}
            </p>
          </div>
        </div>
        <div style={{ width: "25%", margin: "auto" }}>
          <Button
            block
            style={{ borderRadius: "5px", height: "1.7rem" }}
            size="small"
          >
            More Details
          </Button>
        </div>
      </div>
    </>
  );
};

export default WorkExperienceCard;
