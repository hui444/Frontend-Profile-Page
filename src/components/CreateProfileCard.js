import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import { Button } from "antd";
import Card from "../shared/components/Card";
import ImageUpload from "../shared/components/ImageUpload";

import { RED_ASTERISK } from "../common/constants";
import { createProfile } from "../store/profile/action";

import "./CreateProfileCard.css";
import "antd/dist/antd.css";

const CreateProfileCard = () => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState();
  const [imageIsValid, setImageIsValid] = useState();

  const onSubmit = (values) => {
    if (!errors.length && !(image && !imageIsValid)) {
      const profile = {
        name: values.name,
        age: values.age,
        description: values.description,
        ...(values.contactNumber && { contactNumber: values.contactNumber }),
        ...(values.email && { email: values.email }),
        ...(image && { profileImage: image }),
      };
      dispatch(createProfile(profile));
      history.push("/");
    }
  };

  return (
    <Card title="Create a profile!">
      <div className="CreateProfileCard-form-section">
        <h4>Name{RED_ASTERISK}</h4>
        <input
          type="text"
          placeholder="Name"
          name="name"
          ref={register({
            required: true,
            validate: (input) => input.trim().length !== 0,
          })}
          style={{
            borderColor: errors.name && "red",
            background: errors.name && "#ffd1d1",
          }}
        />
        {(errors.name || errors.name?.type === "validate") && (
          <p>Name Required!</p>
        )}
      </div>

      <div className="CreateProfileCard-form-section">
        <h4>Age{RED_ASTERISK}</h4>
        <input
          type="number"
          placeholder="Age"
          name="age"
          ref={register({
            required: "Age Required!",
            min: { value: 0, message: "Invalid Age!" },
          })}
          style={{
            borderColor: errors.age && "red",
            background: errors.age && "#ffd1d1",
          }}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div className="CreateProfileCard-form-section">
        <h4>Email</h4>
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={register({ pattern: /^\S+@\S+$/i })}
          style={{
            borderColor: errors.email && "red",
            background: errors.email && "#ffd1d1",
          }}
        />
        {errors.email && <p>Invalid Email!</p>}
      </div>

      <div className="CreateProfileCard-form-section">
        <h4>Contact Number</h4>
        <input
          type="number"
          placeholder="Contact Number"
          name="contactNumber"
          ref={register({
            min: 0,
            validate: (input) => input.trim().length !== 0,
          })}
          style={{
            borderColor: errors.contactNumber && "red",
            background: errors.contactNumber && "#ffd1d1",
          }}
        />
        {(errors.contactNumber ||
          errors.contactNumber?.type === "validate") && (
          <p>Invalid Contact Number!</p>
        )}
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
        />
        {(errors.description || errors.description?.type === "validate") && (
          <p>Description Required!</p>
        )}
      </div>

      <div className="CreateProfileCard-form-section">
        <h4>Profile Photo</h4>
        <ImageUpload
          id={"image"}
          center
          onInput={setImage}
          isValid={setImageIsValid}
        />
      </div>
      <div className="CreateProfileCard-button-container">
        <Button type="primary" onClick={handleSubmit(onSubmit)}>
          Create
        </Button>
      </div>
    </Card>
  );
};

export default CreateProfileCard;
