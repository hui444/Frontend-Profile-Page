import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import Modal from "../shared/components/Modal";
import ImageUpload from "../shared/components/ImageUpload";
import { Button } from "antd";
import { RED_ASTERISK } from "../common/constants";

import { dummyProfileId } from "../store/Stubs";
import { editProfileById } from "../store/profile/action";

import "./EditProfileCard.css";
import "antd/dist/antd.css";

const EditProfileCard = () => {
  const { handleSubmit, register, errors } = useForm();
  const { userProfile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState();
  const [imageIsValid, setImageIsValid] = useState();

  const profileId = dummyProfileId;
  const onSubmit = (values) => {
    const finalImage = image ? image : userProfile?.profileImage;
    if (!errors.length && !(image && !imageIsValid)) {
      const updatedProfile = {
        ...(values.name !== userProfile?.name && { name: values.name }),
        ...(Number(values.age) !== userProfile?.age && { age: values.age }),
        ...(values.email !== userProfile?.email && { email: values.email }),
        ...(Number(values.contactNumber) !== userProfile?.contactNumber && {
          contactNumber: values.contactNumber,
        }),
        ...(values.description !== userProfile?.description && {
          description: values.description,
        }),
        ...(finalImage !== userProfile?.profileImage && {
          profileImage: finalImage,
        }),
      };

      console.log(updatedProfile);
      if (!_.isEmpty(updatedProfile))
        dispatch(editProfileById(profileId, updatedProfile));
      history.push("/");
    }
  };

  return (
    <Modal>
      <form className="EditProfileModal-form">
        <div className="EditProfileModal-form-header-container">
          <h1>Edit profile</h1>
        </div>
        <div className="EditProfileModal-form-section">
          <h4>Name{RED_ASTERISK}</h4>
          <input
            type="text"
            placeholder={userProfile?.name ? `${userProfile?.name}` : "Name"}
            name="name"
            ref={register({
              required: true,
              validate: (input) => input.trim().length !== 0,
            })}
            style={{
              borderColor: errors.name && "red",
              background: errors.name && "#ffd1d1",
            }}
            defaultValue={userProfile?.name && `${userProfile?.name}`}
          />
          {(errors.name || errors.name?.type === "validate") && (
            <p>Name Required!</p>
          )}
        </div>

        <div className="EditProfileModal-form-section">
          <h4>Age{RED_ASTERISK}</h4>
          <input
            type="number"
            placeholder={userProfile?.age ? `${userProfile?.age}` : "Age"}
            name="age"
            ref={register({ required: "Age Required!", min: 0 })}
            style={{
              borderColor: errors.age && "red",
              background: errors.age && "#ffd1d1",
            }}
            defaultValue={userProfile?.age && `${userProfile?.age}`}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div>

        <div className="EditProfileModal-form-section">
          <h4>Email</h4>
          <input
            type="email"
            placeholder={userProfile?.email ? `${userProfile?.email}` : "Email"}
            name="email"
            ref={register({ pattern: /^\S+@\S+$/i })}
            style={{
              borderColor: errors.email && "red",
              background: errors.email && "#ffd1d1",
            }}
            defaultValue={userProfile?.email && `${userProfile?.email}`}
          />
          {errors.email && <p>Invalid Email!</p>}
        </div>

        <div className="EditProfileModal-form-section">
          <h4>Contact Number</h4>
          <input
            type="number"
            placeholder={
              userProfile?.contactNumber
                ? `${userProfile?.contactNumber}`
                : "Contact Number"
            }
            name="contactNumber"
            ref={register({ min: 0 })}
            style={{
              borderColor: errors.contactNumber && "red",
              background: errors.contactNumber && "#ffd1d1",
            }}
            defaultValue={
              userProfile?.contactNumber && `${userProfile?.contactNumber}`
            }
          />
          {errors.contactNumber && <p>Invalid Contact Number!</p>}
        </div>

        <div className="EditProfileModal-form-section">
          <h4>Short Description{RED_ASTERISK}</h4>
          <textarea
            placeholder={"Short description about yourself.."}
            name="description"
            ref={register({
              required: true,
              validate: (input) => input.trim().length !== 0,
            })}
            style={{
              borderColor: errors.description && "red",
              background: errors.description && "#ffd1d1",
            }}
            defaultValue={
              userProfile?.description && `${userProfile?.description}`
            }
          />
          {(errors.description || errors.description?.type === "validate") && (
            <p>Description Required!</p>
          )}
        </div>

        <div className="EditProfileModal-form-section">
          <h4>Profile Photo</h4>
          <ImageUpload
            id={"image"}
            center
            onInput={setImage}
            defaultValue={userProfile?.profileImage}
            isValid={setImageIsValid}
          />
        </div>
        <div className="EditProfileModal-button-container">
          <Button type="cancel" onClick={() => history.push("/")}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileCard;
