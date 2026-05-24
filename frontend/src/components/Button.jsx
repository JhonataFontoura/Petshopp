const variants = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
  ghost: "btn--ghost",
};

export default function Button({
  children,
  variant = "primary",
  size,
  full,
  icon,
  className = "",
  ...props
}) {
  const classes = [
    "btn",
    variants[variant],
    size === "sm" && "btn--sm",
    full && "btn--full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} {...props}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}
