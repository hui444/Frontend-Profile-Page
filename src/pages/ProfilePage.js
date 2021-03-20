import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { EditOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import CreateProfileCard from "../components/CreateProfileCard";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import ProfileIntro from "./profilePageSections/ProfileIntro";
import WorkExperienceSection from "./profilePageSections/WorkExperienceSection";

import { fetchProfile } from "../store/profile/action";

import "./ProfilePage.css";
import "antd/dist/antd.css";

const ProfilePage = (props) => {
  const { profile, isLoading, errorMessage } = useSelector(
    (state) => state.profile
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [isOffline, setIsOffline] = useState();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  window.addEventListener("online", () => {
    setIsOffline(false);
  });

  window.addEventListener("offline", () => {
    setIsOffline(true);
  });

  const errors = () => {
    return (
      <>
        {isOffline && (
          <Alert
            message="You are offline! Please connect to the internet before editing!"
            banner
          />
        )}
        {((!isOffline && errorMessage) ||
          (isOffline &&
            errorMessage !== "Failed to fetch" &&
            errorMessage)) && (
          <Alert
            style={{ zIndex: 600, height: "fit-content" }}
            message="Oh no! something went wrong.."
            description={errorMessage}
            type="error"
            closable
          />
        )}
      </>
    );
  };

  let personalInformationTitle;

  if (!profile)
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {errors()}
        {profile === null && isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && <CreateProfileCard />}
      </div>
    );
  else {
    personalInformationTitle = [{ title: "Age", value: profile.age }];

    if (profile.email)
      personalInformationTitle.push({ title: "Email", value: profile.email });
    if (profile.contactNumber)
      personalInformationTitle.push({
        title: "Contact Number",
        value: profile.contactNumber,
      });
  }

  return (
    <>
      {errors()}
      <div className="ProfilePage-main-container">
        {isLoading && <LoadingSpinner asOverlay />}
        {props.children}
        <EditOutlined
          className="ProfilePage-edit-icon"
          onClick={() => {
            history.push(`/${profile.id}/edit/intro`);
          }}
        />
        <ProfileIntro
          profileImage={profile.profileImage}
          name={profile.name}
          information={personalInformationTitle}
        />
        <WorkExperienceSection profileId={profile.id} />
      </div>
    </>
  );
};

export default ProfilePage;
