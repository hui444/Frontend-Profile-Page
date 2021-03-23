import React from "react";

import "./Modal.css";

const Modal = (props) => {
  return (
    <div
      className="Modal-main-container"
      style={{
        backgroundColor: props.opaqueBackground ? "grey" : "",
        position: props.position ? `${props.position}` : "fixed",
      }}
    >
      <div className="Modal-subContainer">
        <div className="Modal-modal-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
