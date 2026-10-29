import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border border-border text-foreground hover:bg-surface",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-surface",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  disabled,
  onClick,
  children,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none";
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className ?? ""}`;
  const disabledClasses = disabled
    ? "pointer-events-none opacity-50 cursor-not-allowed"
    : "";

  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  if (href && disabled) {
    return (
      <span className={`${classes} ${disabledClasses}`}>{children}</span>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${classes} ${disabledClasses}`}
    >
      {children}
    </button>
  );
}
