/**
 * Footer — deliberately NOT a client component.
 *
 * This used to live in convert.tsx alongside Booking (Calendly) and Contact
 * (FormSubmit). Because every route imports the footer, every route also
 * pulled that module — so answer and blog pages were shipping and hydrating
 * the Calendly loader and the contact form on pages that render neither.
 * Splitting it out is the whole point of this file; keep it that way.
 *
 * It has no hooks and no interactivity, so it renders to plain HTML.
 */

import Link from "next/link";
import { addressLine, site } from "@/lib/site-config";
import { Logo, PartnerBadge } from "./primitives";

/** 44px tap target on mobile; unchanged from `sm:` up. Ten stacked 20px-tall
 *  links were genuinely hard to hit on a phone. */
const footerLink =
  "py-3 transition-colors hover:text-brand-400 sm:py-0";

export function Footer() {
  return (
    <footer className="bg-navy-950 py-14 text-navy-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 sm:flex-row sm:items-start">
          <div>
            <div className="text-white">
              <Logo />
            </div>
            <p className="mt-3 max-w-xs text-sm">{site.tagline}</p>
            <div className="mt-5">
              <PartnerBadge />
            </div>
          </div>

          <div className="flex flex-col text-sm sm:gap-2">
            <Link href="/#services" className={footerLink}>Services</Link>
            <Link href="/#process" className={footerLink}>Process</Link>
            <Link href="/#calculator" className={footerLink}>Calculator</Link>
            <Link href="/answers/" className={footerLink}>Answers</Link>
            <Link href="/blog/" className={footerLink}>Blog</Link>
            <Link href="/#faq" className={footerLink}>FAQ</Link>
            <Link href="/#book" className={footerLink}>Book a call</Link>
          </div>

          <div className="flex flex-col text-sm sm:gap-2">
            <a href={`mailto:${site.email}`} className={footerLink}>
              {site.email}
            </a>
            <a href={`tel:${site.phone}`} className={footerLink}>
              Call {site.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLink}
            >
              WhatsApp {site.phoneDisplay}
            </a>
            <address className="max-w-56 not-italic leading-relaxed text-navy-400">
              {addressLine}
            </address>
          </div>
        </div>

        <p className="pt-6 text-xs text-navy-500">
          © {new Date().getFullYear()} {site.name}. Amazon and all related marks
          are trademarks of Amazon.com, Inc. or its affiliates.
        </p>
      </div>
    </footer>
  );
}
