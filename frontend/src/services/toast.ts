import { toast, type ToastOptions } from 'react-toastify';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiXCircle, 
  FiInfo,
  FiLoader
} from 'react-icons/fi';

// Default toast configuration
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Toast service with consistent styling and icons
export const toastService = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      ...defaultOptions,
      icon: FiCheckCircle,
      className: "text-green-500",
      ...options,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      ...defaultOptions,
      icon: FiXCircle,
      className : "text-red-500",
      autoClose: 7000, // Keep error messages longer
      ...options,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      ...defaultOptions,
      className: "text-yellow-500",
      icon: FiAlertCircle,
      ...options,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      ...defaultOptions,
      icon: FiInfo,
      className: "text-blue-500",
      ...options,
    });
  },

  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      ...defaultOptions,      
      className: "text-gray-500 animate spin",
      icon: FiLoader,
      autoClose: false,
      ...options,
    });
  },

  // Update an existing toast (useful for loading states)
  update: (toastId: string | number, options: ToastOptions & { render: string }) => {
    return toast.update(toastId, options);
  },

  // Dismiss a specific toast
  dismiss: (toastId?: string | number) => {
    return toast.dismiss(toastId);
  },

  // Dismiss all toasts
  dismissAll: () => {
    return toast.dismiss();
  },

  // Promise-based toast for async operations
  promise: <T>(
    promise: Promise<T>,
    {
      pending,
      success,
      error,
    }: {
      pending: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: ToastOptions
  ) => {
    return toast.promise(
      promise,
      {
        pending: {
          render: pending,
          icon: FiLoader,
          className :"text-gray-500 animate-spin"
        },
        success: {
          render: typeof success === 'function' ? ({ data } : {data : any}) => success(data) : success,
          icon: FiCheckCircle,
          className: "text-green-500",
        },
        error: {
          render: typeof error === 'function' ? ({ data }) => error(data) : error,
          icon: FiXCircle,
          className : "text-red-500"
        },
      },
      {
        ...defaultOptions,
        ...options,
      }
    );
  },
};

// Convenience methods for common use cases
export const showSuccess = toastService.success;
export const showError = toastService.error;
export const showWarning = toastService.warning;
export const showInfo = toastService.info;
export const showLoading = toastService.loading;

export default toastService;