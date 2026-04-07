import Link from "next/link";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";

type PageShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
};

export function PageShell({
  title,
  subtitle,
  children,
  breadcrumbs,
  backHref,
  backLabel,
  actions,
}: PageShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#f8f4ed] pb-16">
      <div className="hero-pattern pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <div className="mb-4">
              <Breadcrumb items={breadcrumbs} />
            </div>
          ) : null}
          {backHref && backLabel ? (
            <div className="mb-5">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition hover:text-orange-700"
              >
                ← {backLabel}
              </Link>
            </div>
          ) : null}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              {title}
            </h1>
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700 sm:text-base">
            {subtitle}
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
