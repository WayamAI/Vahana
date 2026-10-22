import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="px-6 pt-6 pb-4">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption text-tertiary">
        <Link
          href="/"
          aria-label="Dashboard"
          className="rounded-sm transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <AppIcon name="home" size="xs" aria-hidden />
        </Link>
        <AppIcon name="chevronRight" size="xs" aria-hidden />
        <span aria-current="page">{title}</span>
      </nav>
      <h1 className="mt-2 font-display text-display-page text-primary">{title}</h1>
      {subtitle && <p className="mt-1 text-body-sm text-tertiary">{subtitle}</p>}
    </header>
  );
}
