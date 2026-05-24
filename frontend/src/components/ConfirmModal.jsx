import Button from "./Button";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  variant = "danger",
}) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay modal-overlay--visible"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onCancel}
    >
      <div className="modal modal--visible" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title" className="modal__title">
          {title}
        </h2>
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
