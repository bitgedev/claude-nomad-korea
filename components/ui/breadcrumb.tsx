import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-[#6B6B6B]">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1">
          {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#6B6B6B]/50" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#1B9AAA] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#4A4A4A] dark:text-foreground font-medium">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
