import React from "react";

import { imageUri } from "../../assets/fallBackPlaceholder";
import MainCard from "../../shared/components/MainCard";

import "./ProfileIntro.css";

const ProfileIntro = (props) => {
  return (
    <>
      <div className="ProfileIntro-main-container">
        <div className="ProfileIntro-image-container">
          <img src={props.profileImage ?? imageUri} alt="profile" />
        </div>

        <h1 className="ProfileIntro-text-name">{props.name}</h1>
      </div>
      <MainCard>
        <div className="ProfileIntro-personalInformation-container">
          {props.information.map((information) => {
            return (
              <ul>
                <h1>{information.title}:</h1>
                <h2>{information.value}</h2>
              </ul>
            );
          })}
        </div>
      </MainCard>
    </>
  );
};

export default ProfileIntro;
