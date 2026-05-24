const defaultProps = {
  size: 20,
  strokeWidth: 2,
  className: "",
};

function Icon({ children, size, strokeWidth, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconPaw(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </Icon>
  );
}

export function IconPackage(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="m3.27 6.96 8.73 5.05 8.73-5.05M12 22.08V12" />
    </Icon>
  );
}

export function IconShoppingBag(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </Icon>
  );
}

export function IconDollar(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </Icon>
  );
}

export function IconPlus(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M5 12h14M12 5v14" />
    </Icon>
  );
}

export function IconReceipt(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </Icon>
  );
}

export function IconCart(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </Icon>
  );
}

export function IconTrash(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </Icon>
  );
}

export function IconSun(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Icon>
  );
}

export function IconMoon(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
  );
}

export function IconDog(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M11.25 16.25h1.5L12 17z" />
      <path d="M16 14v.5" />
      <path d="M8 14v.5" />
      <path d="M12 13V7" />
      <path d="M14 5.5c1 1 2.5 1 3.5 0" />
      <path d="M6.5 5.5c-1 1-2.5 1-3.5 0" />
      <path d="M6.5 9.5a4.5 4.5 0 0 0 11 0" />
    </Icon>
  );
}

export function IconCheck(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function IconX(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Icon>
  );
}

export function IconInbox(props) {
  const p = { ...defaultProps, ...props };
  return (
    <Icon {...p}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </Icon>
  );
}
