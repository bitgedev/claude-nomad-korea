import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { label: "도시랭킹", href: "#" },
  { label: "밋업", href: "#" },
  { label: "코워킹", href: "#" },
  { label: "커뮤니티", href: "#" },
  { label: "평가하기", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#F5EFE6] border-t border-[#1B9AAA]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span>🌿</span>
            <span className="bg-gradient-to-r from-[#1B9AAA] to-[#2D6A4F] bg-clip-text text-transparent">
              NOMAD KOREA
            </span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#6B6B6B] hover:text-[#1B9AAA] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <Separator className="my-6 bg-[#1B9AAA]/15" />

        <p className="text-sm text-[#6B6B6B] text-center">
          © 2026 Nomad Korea · Made with ♥ by nomads, for nomads
        </p>
      </div>
    </footer>
  );
}
