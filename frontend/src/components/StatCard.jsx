import { FadeIn } from "./FadeIn";

export default function StatCard({ label, value, icon, variant = "primary", delay = 0 }) {
  return (
    <FadeIn delay={delay}>
      <article className={`stat-card`}>
        <div className={`stat-card__icon stat-card__icon--${variant}`} aria-hidden="true">
          {icon}
        </div>
        <div className="stat-card__content">
          <p className="stat-card__label">{label}</p>
          <p className="stat-card__value">{value}</p>
        </div>
      </article>
    </FadeIn>
  );
}
