import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [visible, setVisible] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const isHome = pathname === "/";
    if (!isHome) {
      setVisible(true);
      return;
    }
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("aura-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-surface/40 text-foreground transition-all duration-500 hover:bg-surface ${visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
