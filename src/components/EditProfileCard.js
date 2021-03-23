import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import { Button } from "antd";
import Card from "../shared/components/Card";
import ImageUpload from "../shared/components/ImageUpload";

import { RED_ASTERISK } from "../common/constants";
import { editProfileById } from "../store/profile/action";

import "./EditProfileCard.css";
import "antd/dist/antd.css";

const EditProfileCard = () => {
  const { handleSubmit, register, errors } = useForm();
  const { userProfile, profileId } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState();
  const [imageIsValid, setImageIsValid] = useState();

  const onSubmit = (values) => {
    console.log(errors);
    if (!errors.length && !(image && !imageIsValid)) {
      if (values.email === "" && userProfile?.email !== undefined) {
        values.email = null;
      } else if (values.email === "" && userProfile?.email === undefined) {
        values.email = undefined;
      }
      if (
        values.contactNumber === "" &&
        userProfile?.contactNumber !== undefined
      ) {
        values.contactNumber = null;
      } else if (
        values.contactNumber === "" &&
        userProfile?.contactNumber === undefined
      ) {
        values.contactNumber = undefined;
      }

      const updatedProfile = {
        ...(values.name !== userProfile?.name && { name: values.name }),
        ...(values.age !== userProfile?.age && {
          age: values.age,
        }),
        ...(values.email !== userProfile?.email && {
          email: values.email,
        }),
        ...(values.contactNumber !== userProfile?.contactNumber && {
          contactNumber: values.contactNumber,
        }),
        ...(values.description !== userProfile?.description && {
          description: values.description,
        }),
        ...(image !== userProfile?.profileImage && {
          profileImage: image,
        }),
      };

      if (!_.isEmpty(updatedProfile))
        dispatch(editProfileById(profileId, updatedProfile));
      history.push("/");
    }
  };

  return (
    <Card title="Edit profile">
      <div className="EditProfileCard-form-section">
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

      <div className="EditProfileCard-form-section">
        <h4>Age{RED_ASTERISK}</h4>
        <input
          type="number"
          placeholder={userProfile?.age ? `${userProfile?.age}` : "Age"}
          name="age"
          ref={register({ required: true, min: 0 })}
          style={{
            borderColor: errors.age && "red",
            background: errors.age && "#ffd1d1",
          }}
          defaultValue={userProfile?.age && `${userProfile?.age}`}
        />
        {errors.age && <p>Age Required!</p>}
      </div>

      <div className="EditProfileCard-form-section">
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

      <div className="EditProfileCard-form-section">
        <h4>Contact Number</h4>
        <input
          type="number"
          placeholder={
            userProfile?.contactNumber
              ? `${userProfile?.contactNumber}`
              : "Contact Number"
          }
          name="contactNumber"
          ref={register({
            min: 0,
            validate: (input) => input.trim().length !== 0,
          })}
          style={{
            borderColor: errors.contactNumber && "red",
            background: errors.contactNumber && "#ffd1d1",
          }}
          defaultValue={
            userProfile?.contactNumber && `${userProfile?.contactNumber}`
          }
        />
        {(errors.contactNumber ||
          errors.contactNumber?.type === "validate") && (
          <p>Invalid Contact Number!</p>
        )}
      </div>

      <div className="EditProfileCard-form-section">
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

      <div className="EditProfileCard-form-section">
        <h4>Profile Photo</h4>
        <ImageUpload
          id={"image"}
          center
          onInput={setImage}
          defaultValue={userProfile?.profileImage}
          isValid={setImageIsValid}
        />
      </div>
      <div className="EditProfileCard-button-container">
        <Button type="cancel" onClick={() => history.push("/")}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default EditProfileCard;
