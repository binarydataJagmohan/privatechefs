import { toast as ReactToastify, Id, ToastContent, ToastOptions } from "react-toastify";

const toastTypes = {
  success: ReactToastify.success,
  info: ReactToastify.info,
  error: ReactToastify.error,
} as { [key: string]: (content: ToastContent, options?: ToastOptions) => Id };

export const showToast = (type: string, message: string) => {
  let iconColor = ''; // Initialize as an empty string

  switch (type) {
    case 'success':
      iconColor = '#07BC0C';
      break;
    case 'info':
      iconColor = '#ff4e00d1';
      break;
    case 'error':
      iconColor = '#e74c3c';
      break;
    default:
      break;
  }

  let toastConfig: any = {
    position: ReactToastify.POSITION.TOP_RIGHT,
    closeButton: true,
    hideProgressBar: false,
    style: {
      background: '#ffff',
      color: '#454545',
      borderLeft: `5px solid ${iconColor}`, 
      '--toastify-icon-color': iconColor, 
    },
    progressStyle: {
      background: '#ffff',
    },
    className: `custom-toast-${type}`,
  };

  if (toastTypes[type]) {
    toastTypes[type](message, toastConfig);
  }
};
