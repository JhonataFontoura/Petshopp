import { IconCheck, IconX } from "./Icons";

export default function Toast({ message, type = "success" }) {
  if (!message) return null;

  return (
    <div
      className={`toast toast--${type} toast--visible`}
      role="alert"
      aria-live="polite"
    >
      {type === "success" ? <IconCheck size={18} /> : <IconX size={18} />}
      <span>{message}</span>
    </div>
  );
}
