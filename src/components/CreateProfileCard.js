import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import Modal from "../shared/components/Modal";
import { Button } from "antd";
import ImageUpload from "../shared/components/ImageUpload";

// import { createProfile } from "../store/profile/action";

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
      //   dispatch(
      //     createProfile(
      //       values.name,
      //       values.age,
      //       values.email,
      //       values.contactNumber,
      //       image
      //     )
      //   );
      history.push("/");
    }
  };

  return (
    <Modal opaqueBackground position="inherit">
      <form className="CreateProfileCard-form">
        <div className="CreateProfileCard-form-header-container">
          <h1>Create a profile!</h1>
        </div>
        <div className="CreateProfileCard-form-section">
          <h4>
            Name<em>*</em>
          </h4>
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
          <h4>
            Age<em>*</em>
          </h4>
          <input
            type="number"
            placeholder="Age"
            name="age"
            ref={register({
              required: "AGE REQUIRED!",
              min: { value: 0, message: "INVALID AGE!" },
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
          {errors.email && <p>INVALID EMAIL!</p>}
        </div>

        <div className="CreateProfileCard-form-section">
          <h4>Contact Number</h4>
          <input
            type="number"
            placeholder="Contact Number"
            name="contactNumber"
            ref={register({ min: 0 })}
            style={{
              borderColor: errors.contactNumber && "red",
              background: errors.contactNumber && "#ffd1d1",
            }}
          />
          {errors.contactNumber && <p>INVALID CONTACT NUMBER!</p>}
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
      </form>
    </Modal>
  );
};

export default CreateProfileCard;
