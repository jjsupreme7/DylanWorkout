"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

const SECTIONS = ["home", "programs", "features", "coach", "results", "pricing"];

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-center space-y-4">
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`rounded-full transition-all duration-300 ${
              activeSection === section
                ? "w-4 h-4 bg-brand shadow-lg shadow-brand/30"
                : "w-3 h-3 bg-text-muted hover:bg-brand/50"
            }`}
            aria-label={`Scroll to ${section} section`}
          />
        ))}
        <div className="mt-2 text-brand">
          <Shield className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
