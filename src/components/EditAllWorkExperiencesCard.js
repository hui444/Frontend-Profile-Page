import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { List, Avatar, Skeleton, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import Card from "../shared/components/Card";

import { toDisplayDateFormat } from "../common/dateMethods";
import {
  deleteWorkExperience,
  getAllWorkExperiences,
  getProfileById,
  resetSelectedWorkExperience,
  setSelectedWorkExperience,
} from "../store/profile/action";

import "./EditAllWorkExperiencesCard.css";
import "antd/dist/antd.css";

const EditAllWorkExperiencesCard = () => {
  const { allWorkExperiences, selectedWorkExperience } = useSelector(
    (state) => state.profile
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const profileId = useParams().profileId;
  const list = allWorkExperiences;

  const onSave = () => {
    dispatch(getProfileById(profileId));
    dispatch(getAllWorkExperiences(profileId));
    history.push("/");
  };

  const confirmDelete = () => {
    dispatch(deleteWorkExperience(profileId, selectedWorkExperience.weId));
  };

  useEffect(() => {
    dispatch(getAllWorkExperiences(profileId));
  }, [dispatch]);

  return (
    <Card title="Edit Work Experiences">
      {list?.length !== 0 && (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <div className="EditAllWorkExperiencesCard-indivWE-card-container">
              <List.Item
                actions={[
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a
                    key="list-loadmore-edit"
                    onClick={() => {
                      dispatch(setSelectedWorkExperience(item));
                      history.push(
                        `/${profileId}/edit/workExperience/${item.workExperienceId}`
                      );
                    }}
                  >
                    <EditOutlined />
                  </a>,
                  <Popconfirm
                    title="Are you sure to delete this? You cannot undo this action."
                    onConfirm={confirmDelete}
                    onCancel={() => dispatch(resetSelectedWorkExperience())}
                    okText="Delete"
                    cancelText="Cancel"
                  >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a key="list-loadmore-more">
                      <DeleteFilled
                        onClick={() =>
                          dispatch(setSelectedWorkExperience(item))
                        }
                      />
                    </a>
                  </Popconfirm>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.companyLogo} />}
                    title={
                      <>
                        <b>{item.jobTitle}</b>
                        {`, ${item.companyName}`}
                      </>
                    }
                    description={`${toDisplayDateFormat(item.startDate)} - ${
                      toDisplayDateFormat(item.endDate) ?? "Current"
                    }`}
                  />
                </Skeleton>
              </List.Item>
            </div>
          )}
        />
      )}
      <Button
        type="dashed"
        onClick={() => history.push(`/${profileId}/create`)}
        block
        icon={<PlusOutlined />}
      >
        Add Work Experience
      </Button>
      <div className="EditAllWorkExperiencesCard-button-container">
        <Button onClick={onSave}>Save</Button>
      </div>
    </Card>
  );
};

export default EditAllWorkExperiencesCard;
