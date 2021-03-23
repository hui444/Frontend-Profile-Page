import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import {
  EditOutlined,
  UserOutlined,
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import WorkExperienceCard from "../components/WorkExperienceCard";
import CreateProfileCard from "../components/CreateProfileCard";
import { imageUri } from "../assets/fallBackPlaceholder";

import { toDisplayDateFormat } from "../common/dateMethods";
import { getAllWorkExperiences, getProfileById } from "../store/profile/action";

import "./ProfilePage.css";
import "antd/dist/antd.css";

const ProfilePage = (props) => {
  const { userProfile, isLoading, profileId } = useSelector(
    (state) => state.profile
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProfileById(profileId));
    dispatch(getAllWorkExperiences(profileId));
  }, [dispatch]);

  if (_.isEmpty(userProfile) || userProfile === undefined) {
    return (
      <>
        {userProfile === null && isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && <CreateProfileCard />}
      </>
    );
  } else {
    const currentJob = userProfile?.workExperiences.filter((we) => {
      return we.isCurrentJob === true;
    });

    return (
      <>
        {isLoading && <LoadingSpinner asOverlay />}
        {props.children}
        {!isLoading && (
          <>
            <div className="ProfilePage-top__main-container">
              <EditOutlined
                className="ProfilePage-top__edit-icon"
                onClick={() => history.push(`/${profileId}/edit/intro`)}
              />
              <div className="ProfilePage-topContainer">
                <div className="ProfilePage-topContainer-inside">
                  <span className="ProfilePage-span__small-text">
                    Hello! I am
                  </span>
                  <span className="ProfilePage-span__name-text">
                    {userProfile?.name}
                  </span>
                  {currentJob.length === 1 && (
                    <span className="ProfilePage-span__small-text">
                      {currentJob[0].jobTitle} at {currentJob[0].companyName}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="ProfilePage-aboutMe__text-container">
                <h3>
                  <span>ABOUT ME</span>
                </h3>
              </div>
              <div className="ProfilePage-aboutMe__container">
                <div className="ProfilePage-userInformation__container">
                  <div className="ProfilePage-userInformation__left-container">
                    <img
                      src={userProfile?.profileImage ?? imageUri}
                      alt="Profile"
                    />
                  </div>
                  <div className="ProfilePage-userInformation__right-container">
                    <div>
                      <UserOutlined /> Name: {userProfile?.name}
                    </div>
                    <div>
                      <IdcardOutlined /> Age: {userProfile?.age}
                    </div>
                    <div>
                      <PhoneOutlined /> Phone:{" "}
                      {userProfile?.contactNumber ?? "-"}
                    </div>
                    <div>
                      <MailOutlined /> Email: {userProfile?.email ?? "-"}
                    </div>
                  </div>
                </div>
                <div className="ProfilePage-description__container">
                  {userProfile?.description}
                </div>
              </div>
              <>
                <div className="ProfilePage-workExperiences__text-container">
                  <h3>
                    <span>WORK EXPERIENCES</span>
                  </h3>
                  <EditOutlined
                    className="ProfilePage-workExperiences__edit-icon"
                    onClick={() =>
                      history.push(`/${profileId}/edit/workExperiences`)
                    }
                  />
                </div>
                <div className="ProfilePage-workExperiences__cards-container">
                  <div className="ProfilePage-workExperiences__cards-subcontainer">
                    {userProfile?.workExperiences.map(
                      (workExperience, index) => {
                        return (
                          <WorkExperienceCard
                            key={index}
                            companyImage={workExperience.companyLogo}
                            position={workExperience.jobTitle}
                            company={workExperience.companyName}
                            date={
                              toDisplayDateFormat(workExperience.startDate) +
                              " - " +
                              (toDisplayDateFormat(workExperience.endDate) ??
                                "Current")
                            }
                            description={workExperience.jobDescription}
                          />
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            </div>
          </>
        )}
      </>
    );
  }
};

export default ProfilePage;
