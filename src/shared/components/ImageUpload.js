import React, { useRef, useState, useEffect } from "react";

import useSnackbar from "../hooks/useSnackbar";

import { Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

import { ImageToUri } from "../../common/imageToUri";

import "./ImageUpload.css";
import "antd/dist/antd.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.defaultValue);
  const [isValid, setIsValid] = useState(false);
  const [error] = useSnackbar("error");

  const filePickerRef = useRef();
  useEffect(() => {
    if (!file) {
      props.onInput(props.defaultValue);
      props.isValid(true);
      setIsValid(true);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = async (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      const x = /(jpe?g|png)/i;
      const inputValidity = x.test(event.target.files[0].type);
      setIsValid(inputValidity);
      if (pickedFile.size > 50000) {
        setIsValid(false);
        props.isValid(false);
        error("Selected image is too large!");
      } else {
        props.isValid(inputValidity);
      }
    }
    const imageUri = await ImageToUri(pickedFile);
    props.onInput(imageUri);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div
          className="image-upload__preview"
          style={{
            border:
              (previewUrl && !isValid) || !previewUrl ? "1px dashed #ccc" : "",
            background: file && !isValid ? "#ffd1d1" : "",
          }}
        >
          {!previewUrl && <em>Image Preview</em>}
          {previewUrl && (
            <div className="image-upload__preview-container">
              <img src={previewUrl} alt="Preview" />
              <CloseCircleFilled
                className="image-upload__preview-CloseCircleFilled"
                onClick={() => {
                  setPreviewUrl(undefined);
                  setFile(undefined);
                  props.onInput(null);
                }}
              />
            </div>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          {previewUrl ? "UPDATE IMAGE" : "SELECT IMAGE"}
        </Button>
      </div>

      {file && !isValid && <p>Invalid Image!</p>}
    </div>
  );
};

export default ImageUpload;
