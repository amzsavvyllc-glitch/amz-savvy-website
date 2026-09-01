"use client";

/**
 * FloatingActions — the WhatsApp button and the sticky mobile CTA bar.
 *
 * Split out of convert.tsx for the same reason as the Footer: every route
 * renders this, and it must not drag Calendly and the contact form along with
 * it. This is the only genuinely interactive part every page needs, and it is
 * deliberately small.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // One boolean that flips once per page. No layout reads, so this stays
    // cheap even on a phone — unlike the header's old progress handler.
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp FAB — lifted above the mobile CTA bar so they never overlap */}
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={cn(
          "fixed right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-105",
          "bottom-24 sm:bottom-6",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.37 9.37 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.42-9.4a9.34 9.34 0 0 1 6.65 2.76 9.32 9.32 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.41 9.4M20.5 3.49A11.77 11.77 0 0 0 12.04 0C5.5 0 .19 5.31.18 11.84c0 2.09.55 4.13 1.59 5.93L.08 24l6.37-1.67a11.83 11.83 0 0 0 5.59 1.42h.01c6.53 0 11.85-5.31 11.85-11.84 0-3.17-1.23-6.14-3.4-8.38" />
        </svg>
      </a>

      {/* Sticky mobile conversion bar */}
      <div
        className={cn(
          // Opaque, no backdrop-filter: this bar is sm:hidden, so the blur only
          // ever ran on phones — a full-width filtered surface recompositing
          // against every scroll frame, for an effect behind an opaque bar.
          "fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white p-3 transition-transform duration-300 sm:hidden",
          show ? "translate-y-0" : "translate-y-full",
        )}
      >
        <Link
          href="/#book"
          className="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-brand-500/25"
        >
          Get my free audit
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
