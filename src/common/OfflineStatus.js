import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Button, notification } from "antd";
import {
  clearOfflineQueue,
  sendRequests,
  setIsLoading,
  setIsOffline,
} from "../store/profile/action";
import { useHistory } from "react-router";

export const OfflineStatus = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOffline, offlineQueue } = useSelector((state) => state.profile);

  window.addEventListener("online", () => {
    dispatch(setIsOffline(false));
  });

  window.addEventListener("offline", () => {
    dispatch(setIsOffline(true));
  });

  const updateNotification = () => {
    const close = () => {
      dispatch(clearOfflineQueue());
    };

    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          notification.close(key);
          dispatch(setIsLoading(true));
          dispatch(sendRequests());
          history.push("/");
        }}
      >
        Save
      </Button>
    );

    return notification.open({
      message: "Do you want to save your offline changes?",
      btn,
      key,
      onClose: close,
      duration: null,
    });
  };

  useEffect(() => {
    if (!isOffline && offlineQueue?.length) {
      updateNotification();
    }
  }, [isOffline]);

  if (isOffline)
    return (
      <Alert
        closable
        message="You are offline! Changes made will be updated when you are back online."
        banner
        style={{ zIndex: 100, position: "sticky", top: 0, left: 0 }}
      />
    );
  else return <></>;
};
