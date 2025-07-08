import { toast } from "react-toastify";

export default function handleCopy(text) {
  if (!text) {
    return;
  }
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
