import Link from "next/link";

/** Arrow used in `.theme-btn .arrow-all` (two copies slide past each other on hover). */
export const ArrowRight = () => (
  <svg width="16" height="19" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Diagonal arrow used in `.theme-btn.style2 .arrow-all-2`. */
export const ArrowUpRight = () => (
  <svg width="10" height="10" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10.0035 3.90804L1.41153 12.5L0 11.0885L8.59097 2.49651H1.01922V0.5H12V11.4808H10.0035V3.90804Z" />
  </svg>
);

type ThemeButtonProps = {
  href: string;
  label: string;
  className?: string;
  /** `arrow` = round arrow badge (default), `diagonal` = small arrow used in service cards. */
  variant?: "arrow" | "diagonal";
};

export function ThemeButton({ href, label, className = "", variant = "arrow" }: ThemeButtonProps) {
  return (
    <Link href={href} className={`theme-btn ${className}`.trim()}>
      <span className="link-effect">
        <span className="effect-1">{label}</span>
        <span className="effect-1" aria-hidden="true">{label}</span>
      </span>
      {variant === "arrow" ? (
        <span className="arrow-all">
          <i>
            <ArrowRight />
            <ArrowRight />
          </i>
        </span>
      ) : (
        <span className="arrow-all-2">
          <i>
            <ArrowUpRight />
            <ArrowUpRight />
          </i>
        </span>
      )}
    </Link>
  );
}
