import React from "react";
import ToastIcon from "../../assets/toast-icon.svg"; // toast notification icon

const Notifications = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      <img src={ToastIcon} alt="Notification" style={{ marginRight: 10 }} />
      <span>{message}</span>
    </div>
  );
};

export default Notifications;
