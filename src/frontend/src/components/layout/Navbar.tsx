import { useTheme } from "@/hooks/useTheme";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Community", href: "#community" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Join Us", href: "#join" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(href: string) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      data-ocid="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? theme === "dark"
            ? "rgba(12, 18, 42, 0.85)"
            : "rgba(255, 255, 255, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          data-ocid="navbar.logo_link"
          onClick={() => scrollToSection("#hero")}
          className="flex items-center gap-2 group bg-transparent border-0 p-0 cursor-pointer"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shadow-glow-gold transition-smooth group-hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.7 0.21 86), oklch(0.6 0.18 70))",
            }}
          >
            <span
              className="text-xs font-display font-bold"
              style={{ color: "oklch(0.12 0.01 264)" }}
            >
              U25
            </span>
          </div>
          <div className="leading-tight text-left">
            <span className="block font-display font-bold text-sm text-foreground">
              Under 25
            </span>
            <span className="block text-[10px] font-body tracking-widest uppercase text-accent">
              ADYPU
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                data-ocid={`navbar.${link.label.toLowerCase().replace(" ", "_")}_link`}
                onClick={() => scrollToSection(link.href)}
                className="px-3 py-1.5 text-sm font-body text-foreground/80 hover:text-accent transition-colors duration-200 rounded-md hover:bg-accent/10 cursor-pointer bg-transparent border-0"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="navbar.theme_toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-smooth cursor-pointer bg-transparent border-0"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            data-ocid="navbar.join_button"
            onClick={() => scrollToSection("#join")}
            className="hidden md:inline-flex button-gold text-xs px-4 py-2 border-0"
          >
            Join Now
          </button>
          <button
            type="button"
            data-ocid="navbar.menu_toggle"
            className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-accent transition-smooth cursor-pointer bg-transparent border-0"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          data-ocid="navbar.mobile_menu"
          className="md:hidden border-t border-border/30"
          style={{
            backdropFilter: "blur(16px)",
            background:
              theme === "dark"
                ? "rgba(12, 18, 42, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
          }}
        >
          <ul className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(" ", "_")}_link`}
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToSection(link.href);
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-body text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth cursor-pointer bg-transparent border-0"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                data-ocid="navbar.mobile_join_button"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection("#join");
                }}
                className="button-gold w-full text-sm border-0"
              >
                Join Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
