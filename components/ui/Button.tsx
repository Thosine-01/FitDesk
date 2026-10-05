import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant =
  | "primary" // --accent fill, white text — light surfaces
  | "bright" // --accent-bright fill, near-black text — dark surfaces only
  | "outline" // light surfaces
  | "outline-dark"; // dark surfaces

type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-card hover:bg-accent-hover",
  bright: "bg-accent-bright text-primary",
  outline:
    "border border-border-default text-primary hover:border-accent hover:text-accent",
  "outline-dark":
    "border border-border-on-dark text-on-dark hover:border-on-dark-sec",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  extra = "",
) {
  return `lift-btn inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/** Link styled as a button. External (http) links open in a new tab. */
export function Button({
  variant,
  size,
  className,
  href = "#",
  children,
  ...rest
}: ButtonLinkProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
