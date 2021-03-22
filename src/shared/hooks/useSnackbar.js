import { message } from "antd";

import "antd/dist/antd.css";

const useSnackbar = (type) => {
  const success = (content) => {
    message.success(content);
  };

  const warning = (content) => {
    message.warning(content);
  };

  const error = (content) => {
    message.error(content);
  };

  if (type === "success") {
    return [success];
  } else if (type === "warning") {
    return [warning];
  } else {
    return [error];
  }
};

export default useSnackbar;
