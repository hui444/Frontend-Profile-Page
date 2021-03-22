import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "antd";
import { setIsOffline } from "../store/profile/action";

export const OfflineStatus = () => {
  const dispatch = useDispatch();
  const { isOffline } = useSelector((state) => state.profile);

  window.addEventListener("online", () => {
    dispatch(setIsOffline(false));
    console.log("im online!");
  });

  window.addEventListener("offline", () => {
    dispatch(setIsOffline(true));
  });

  console.log(isOffline);
  if (isOffline)
    return (
      <Alert
        closable
        message="You are offline! Please connect to the internet before editing!"
        banner
      />
    );
  else return <></>;
};
