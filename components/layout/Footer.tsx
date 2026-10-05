import Link from "next/link";
import { footer, nav, site } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="on-dark bg-dark px-5 pt-16 pb-10 text-on-dark-muted sm:px-8"
    >
      <div className="mx-auto max-w-page">
        <div className="flex flex-col gap-10 border-b border-border-on-dark pb-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label={nav.homeLabel}
              className="rounded-sm text-on-dark"
            >
              <Logo onDark />
            </Link>
            <p className="mt-4 text-[15px]">{footer.tagline}</p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-12 gap-y-6 text-[15px]"
          >
            <ul className="flex flex-col gap-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-sm transition-colors hover:text-on-dark"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {footer.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="rounded-sm transition-colors hover:text-on-dark"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-sm transition-colors hover:text-on-dark"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="num mt-8 text-sm">{footer.copyright}</p>
      </div>
    </footer>
  );
}
