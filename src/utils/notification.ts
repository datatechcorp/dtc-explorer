import { toast } from 'react-toastify';

let lastErrorMessage;
let lastErrorTime;
export const notification = {
  success: (message: string, description?: string, time?: number): void => {
    toast.success(message, {
      autoClose: time,
    });
  },
  error: (message: string, description?: string): void => {
    //don't show too much messages that have the same content
    console.log(description);
    if (message === lastErrorMessage && lastErrorTime > Date.now() - 1000) {
      return;
    }
    lastErrorTime = Date.now();
    lastErrorMessage = message;
    toast.error(message);
  },
};
