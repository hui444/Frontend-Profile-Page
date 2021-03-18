import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div
      style={{ zIndex: "500" }}
      className={`${
        (props.asOverlay && "loading-spinner__overlay") ||
        (props.loading && "loading-spinner__blue-background")
      }`}
    >
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
