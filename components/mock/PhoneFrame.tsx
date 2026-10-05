/** Minimal phone bezel for the mobile mocks. */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto w-full max-w-[300px] rounded-[38px] bg-dark p-2.5 shadow-mock select-none ${className}`}
    >
      <div className="relative overflow-hidden rounded-[30px] bg-card">
        <span className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-dark" />
        {children}
      </div>
    </div>
  );
}
