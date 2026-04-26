import type { ReactNode } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer
          data-ocid="footer"
          className="border-t border-border/30 py-8"
          style={{
            background:
              "linear-gradient(180deg, oklch(var(--card)) 0%, oklch(var(--background)) 100%)",
          }}
        >
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
            <p className="font-body">
              © {new Date().getFullYear()} Under 25 ADYPU. All rights reserved.
            </p>
            <p className="font-body">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
