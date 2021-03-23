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
    console.log(userProfile);
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {userProfile === null && isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && <CreateProfileCard />}
      </div>
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
            <div style={{ position: "relative" }}>
              <EditOutlined
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  fontSize: "clamp(18px, 2.5vw, 1.5rem)",
                  zIndex: 5,
                  color: "white",
                  margin: "clamp(10px, 2vw, 20px)",
                }}
                onClick={() => history.push(`/${profileId}/edit/intro`)}
              />
              <div className="profilePage-topContainer">
                <div className="profilePage-topContainer-inside">
                  <span style={{ fontSize: "30px" }}>Hello! I am</span>
                  <span style={{ fontSize: "60px" }}>{userProfile?.name}</span>
                  {currentJob.length === 1 && (
                    <span style={{ fontSize: "30px" }}>
                      {currentJob[0].jobTitle} at {currentJob[0].companyName}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div style={{ margin: "0 7vw" }}>
                <h3
                  style={{
                    width: "100%",
                    textAlign: "center",
                    borderBottom: "1px solid #000",
                    lineHeight: "0.1em",
                    margin: "20px 0 30px",
                  }}
                >
                  <span style={{ padding: "0 10px", background: "#fff" }}>
                    ABOUT ME
                  </span>
                </h3>
              </div>
              <div style={{ width: "86vw", margin: "auto" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      padding: "10px",
                      maxWidth: "12.5rem",
                    }}
                  >
                    <img
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        display: "block",
                      }}
                      src={userProfile?.profileImage ?? imageUri}
                      alt="Profile"
                    />
                  </div>
                  <div
                    style={{
                      width: "70%",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
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
                <div style={{ textAlign: "justify", whiteSpace: "pre-line" }}>
                  {userProfile?.description}
                </div>
              </div>
              <div>
                <div
                  style={{
                    margin: "0 0 0 5vw",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    width: "95vw",
                  }}
                >
                  <h3
                    style={{
                      width: "90vw",
                      textAlign: "center",
                      borderBottom: "1px solid #000",
                      lineHeight: "0.1em",
                      margin: "20px 0",
                    }}
                  >
                    <span style={{ padding: "0 10px", background: "#fff" }}>
                      WORK EXPERIENCES
                    </span>
                  </h3>
                  <EditOutlined
                    style={{
                      fontSize: "clamp(18px, 2.5vw, 1.5rem)",
                      color: "black",
                      margin: "10px",
                    }}
                    onClick={() =>
                      history.push(`/${profileId}/edit/workExperiences`)
                    }
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: "2rem",
                    }}
                  >
                    {userProfile?.workExperiences.map((workExperience) => {
                      return (
                        <WorkExperienceCard
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
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};

export default ProfilePage;
