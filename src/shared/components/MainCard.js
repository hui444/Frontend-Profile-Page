import React from "react";

import "./MainCard.css";

const MainCard = (props) => {
  return <div className="MainCard-container">{props.children}</div>;
};

export default MainCard;
