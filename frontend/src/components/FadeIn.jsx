export function FadeIn({ children, className = "", delay = 0, as: Tag = "div" }) {
  return (
    <Tag
      className={`fade-in-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function FadeInStagger({ children, className = "" }) {
  return <div className={`fade-in-stagger ${className}`}>{children}</div>;
}
