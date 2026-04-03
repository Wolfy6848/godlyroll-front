import { toast } from "react-hot-toast";

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "bottom-left",
    duration: 4500,
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: "bottom-left",
    duration: 4500,
  });
};

export const notifyInfo = (message) => {
  toast(message, {
    position: "bottom-left",
    duration: 4500,
  });
};
