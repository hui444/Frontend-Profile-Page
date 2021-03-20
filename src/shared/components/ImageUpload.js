import React, { useRef, useState, useEffect } from "react";

import { Button } from "antd";

import "./ImageUpload.css";
import "antd/dist/antd.css";
import { CloseCircleFilled } from "@ant-design/icons";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.defaultValue);
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      const x = /(jpe?g|png)/i;
      const inputValidity = x.test(event.target.files[0].type);
      setIsValid(inputValidity);
      props.isValid(inputValidity);
    }
    props.onInput(pickedFile);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div
        className={`image-upload ${props.center && "center"}`}
        style={{ background: file && !isValid ? "#ffd1d1" : "" }}
      >
        <div
          className="image-upload__preview"
          style={{ border: previewUrl ? "" : "1px dashed #ccc" }}
        >
          {!previewUrl && <p>Image Preview</p>}
          {previewUrl && (
            <div style={{ position: "relative" }}>
              <img src={previewUrl} alt="Preview" />
              <CloseCircleFilled
                className="image-upload__preview-CloseCircleFilled"
                onClick={() => {
                  setPreviewUrl(undefined);
                  setFile(undefined);
                }}
              />
            </div>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          {previewUrl ? "UPDATE IMAGE" : "SELECT IMAGE"}
        </Button>
      </div>

      {file && !isValid && <p>INVALID IMAGE!</p>}
    </div>
  );
};

export default ImageUpload;
