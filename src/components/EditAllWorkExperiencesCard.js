import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { toDisplayDateFormat } from "../common/dateMethods";
import { EditOutlined, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { List, Avatar, Skeleton, Button, Popconfirm } from "antd";
import Modal from "../shared/components/Modal";

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
    console.log(selectedWorkExperience);
    dispatch(deleteWorkExperience(profileId, selectedWorkExperience.weId));
  };

  useEffect(() => {
    dispatch(getAllWorkExperiences(profileId));
  }, [dispatch]);

  return (
    <Modal>
      <div className="EditExperienceModal-form-header-container">
        <h1>Edit Work Experiences</h1>
      </div>
      {list?.length !== 0 && (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fcfcfc",
                borderRadius: "5px",
                filter: "drop-shadow(1px 2.5px 3px rgb(189, 189, 189))",
              }}
            >
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
                      // TODO: replace with workExperience page link
                      <a href="https://ant.design">
                        <b>{item.jobTitle}</b>
                        {`, ${item.companyName}`}
                      </a>
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
      <div className="EditExperienceModal-button-container">
        <Button onClick={onSave}>Save</Button>
      </div>
    </Modal>
  );
};

export default EditAllWorkExperiencesCard;
