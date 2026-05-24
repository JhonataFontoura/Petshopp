export default function EmptyState({ icon, title, text }) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state__icon" aria-hidden="true">
        {icon}
      </div>
      <p className="empty-state__title">{title}</p>
      {text && <p className="empty-state__text">{text}</p>}
    </div>
  );
}
