import React from "react";

import Modal from "./Modal";

import "./Card.css";
import "antd/dist/antd.css";

const Card = (props) => {
  return (
    <Modal>
      <form className="Card-form">
        <div className="Card-form-header-container">
          <h1>{props.title}</h1>
        </div>
        <>{props.children}</>
      </form>
    </Modal>
  );
};

export default Card;
