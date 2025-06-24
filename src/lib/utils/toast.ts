import { toast, ToastOptions, TypeOptions } from "react-toastify";

/**
 * Show a toast notification.
 * @param msg - The message to display
 * @param type - The type of toast: 'success' | 'error' | 'info' | 'warning'
 * @param options - Additional ToastOptions (optional)
 */
export function showToaster(
  msg: string,
  type: TypeOptions = "info",
  options: ToastOptions = {}
) {
  toast(msg, {
    type,
    position: "top-center",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...options,
  });
}
