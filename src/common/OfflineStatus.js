import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Button, notification } from "antd";
import { sendRequests, setIsOffline } from "../store/profile/action";
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
      console.log("Notification was closed!");
    };

    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          notification.close(key);
          dispatch(sendRequests());
          history.push("/");
        }}
      >
        Confirm
      </Button>
    );

    return notification.open({
      message: "Notification Title",
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
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
        message="You are offline! Please connect to the internet before editing!"
        banner
      />
    );
  else return <></>;
};
