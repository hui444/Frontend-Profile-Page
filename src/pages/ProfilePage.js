import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { EditOutlined } from "@ant-design/icons";
import { Alert } from "antd";
// import CreateProfileCard from "../components/CreateProfileCard";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import { imageUri } from "../assets/fallBackPlaceholder";
import { getProfileById } from "../store/profile/action";
import { toDisplayDateFormat } from "../common/dateMethods";
import {
  UserOutlined,
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

import "./ProfilePage.css";
import "antd/dist/antd.css";
import WorkExperienceCard from "../components/WorkExperienceCard";

const ProfilePage = (props) => {
  const { userProfile, isLoading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const history = useHistory();

  const [isOffline, setIsOffline] = useState();

  useEffect(() => {
    dispatch(getProfileById());
    console.log("THIS RAN");
  }, [dispatch, userProfile]);

  console.log(userProfile);
  window.addEventListener("online", () => {
    setIsOffline(false);
  });

  window.addEventListener("offline", () => {
    setIsOffline(true);
  });

  const errors = () => {
    if (isOffline)
      return (
        <Alert
          message="You are offline! Please connect to the internet before editing!"
          banner
        />
      );
  };

  let personalInformationTitle;

  // if (!profile)
  //   return (
  //     <div style={{ display: "flex", flexDirection: "column" }}>
  //       {errors()}
  //       {profile === null && isLoading && <LoadingSpinner asOverlay />}
  //       {!isLoading && <CreateProfileCard />}
  //     </div>
  //   );
  // else {
  //   personalInformationTitle = [{ title: "Age", value: profile.age }];

  //   if (profile.email)
  //     personalInformationTitle.push({ title: "Email", value: profile.email });
  //   if (profile.contactNumber)
  //     personalInformationTitle.push({
  //       title: "Contact Number",
  //       value: profile.contactNumber,
  //     });
  // }

  return (
    <>
      {errors()}
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <div style={{ position: "relative" }}>
            <EditOutlined
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "clamp(18px, 2.5vw, 1.2rem)",
                zIndex: 5,
                color: "white",
              }}
            />
            <div className="profilePage-topContainer">
              <div className="profilePage-topContainer-inside">
                <span style={{ fontSize: "30px" }}>Hello! I am</span>
                <span style={{ fontSize: "60px" }}>{userProfile?.name}</span>
                {userProfile?.hasCurrentJob && (
                  <span style={{ fontSize: "30px" }}>
                    A {userProfile?.currentJob} at {userProfile?.currentCompany}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
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
            <div style={{ width: "90vw", margin: "auto" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    width: "30%",
                    padding: "10px",
                  }}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={userProfile?.profileImage ?? imageUri}
                    alt="Profile"
                  />
                </div>
                <div
                  style={{
                    width: "70%",
                    padding: "10px",
                  }}
                >
                  <UserOutlined /> Name: {userProfile?.name}
                  <br />
                  <IdcardOutlined /> Age: {userProfile?.age}
                  <br />
                  <PhoneOutlined /> Phone: {userProfile?.contactNumber}
                  <br />
                  <MailOutlined /> Email: {userProfile?.email}
                  <br />
                </div>
              </div>
              <div>{userProfile?.description}</div>
            </div>
            <div>
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
                  WORK EXPERIENCES
                </span>
              </h3>
              <div style={{ position: "relative" }}>
                <EditOutlined
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "10px",
                    fontSize: "clamp(18px, 2.5vw, 1.2rem)",
                    zIndex: 5,
                    color: "black",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
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
  // return (
  //   <>
  //     {errors()}
  //     <div className="ProfilePage-main-container">
  //       {isLoading && <LoadingSpinner asOverlay />}
  //       {props.children}
  //       <EditOutlined
  //         className="ProfilePage-edit-icon"
  //         onClick={() => {
  //           history.push(`/${profile.id}/edit/intro`);
  //         }}
  //       />
  //       <ProfileIntro
  //         profileImage={profile.profileImage}
  //         name={profile.name}
  //         information={personalInformationTitle}
  //       />
  //       <WorkExperienceSection profileId={profile.id} />
  //     </div>
  //   </>
  // );
};

export default ProfilePage;
