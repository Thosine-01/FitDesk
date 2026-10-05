/** 11px uppercase label. Colour follows the surface (`.on-dark` → accent-bright). */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
