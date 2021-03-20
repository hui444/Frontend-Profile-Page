import React from "react";

import { Button } from "antd";
import { imageUri } from "../assets/fallBackPlaceholder";

import "./WorkExperienceCard.css";
import "antd/dist/antd.css";

const WorkExperienceCard = (props) => {
  return (
    <div className="WorkExperienceCard-flip-card">
      <div className="WorkExperienceCard-flip-card__inner">
        <div className="WorkExperienceCard-flip-card__front">
          <div className="WorkExperienceCard-flip-card__front-left">
            <img src={props.companyImage ?? imageUri} alt="company" />
          </div>
          <div className="WorkExperienceCard-flip-card__front-right">
            <b>{props.position}</b>
            <text>{props.company}</text>
            <text>{props.date}</text>
          </div>
        </div>

        <div className="WorkExperienceCard-flip-card__back">
          <div className="WorkExperienceCard-flip-card__back-content">
            <div className="WorkExperienceCard-flip-card__back-description">
              {props.description}
            </div>
            <div className="WorkExperienceCard-SeeMore-button-container">
              <div className="WorkExperienceCard-SeeMore-button">
                <Button block size="small">
                  More Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceCard;
