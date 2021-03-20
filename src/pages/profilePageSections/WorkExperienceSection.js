import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { toDisplayDateFormat } from "../../common/dateMethods";
import { EditOutlined } from "@ant-design/icons";
import WorkExperienceCard from "../../components/WorkExperienceCard";
import MainCard from "../../shared/components/MainCard";

import "./WorkExperienceSection.css";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllWorkExperiences } from "../../store/profile/action";

const WorkExperienceSection = (props) => {
  const { workExperiences } = useSelector((state) => state.profile);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchAllWorkExperiences());
  }, [dispatch]);

  return (
    <MainCard>
      <div className="WorkExperienceSection-main-container">
        <div className="WorkExperienceSection-TopContainer">
          <text className="WorkExperienceSection-topText">Experiences</text>
          <EditOutlined
            className="WorkExperienceSection-edit-icon"
            onClick={() => {
              history.push(`${props.profileId}/edit/workExperiences`);
            }}
          />
        </div>
        {workExperiences.length !== 0 &&
          workExperiences.map((experience) => {
            return (
              <WorkExperienceCard
                workExperienceId={experience.workExperienceId}
                companyImage={experience.companyLogo}
                position={experience.jobTitle}
                company={experience.companyName}
                date={
                  toDisplayDateFormat(experience.startDate) +
                  " - " +
                  (toDisplayDateFormat(experience.endDate) ?? "Current")
                }
                description={experience.jobDescription}
              />
            );
          })}
      </div>
    </MainCard>
  );
};

export default WorkExperienceSection;
