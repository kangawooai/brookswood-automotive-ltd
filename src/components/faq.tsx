'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type Faq = { q: string; a: string }

// Adapted from shadcn-space PRO "faq-numbered": monospace numbered badges,
// single-item expand with smooth height transitions. Wired to the site's
// { q, a } FAQ shape; the heading/CTA around it are supplied by the page.
//
// The open/close height animation is done with a pure CSS grid-rows transition
// (0fr → 1fr) so no JavaScript animation library ships to the browser.
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {faqs.map((faq, index) => {
        const isOpen = expanded === index
        const number = (index + 1).toString().padStart(2, '0')
        const panelId = `faq-panel-${index}`
        const triggerId = `faq-trigger-${index}`
        return (
          <div key={faq.q} className="border-b border-border last:border-0">
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setExpanded(isOpen ? null : index)}
              className="flex w-full items-start gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/40 sm:gap-5 sm:px-8 sm:py-6"
            >
              <span
                aria-hidden="true"
                className={`flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors ${
                  isOpen
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted/40 text-muted-foreground'
                }`}
              >
                {number}
              </span>
              <span className="flex-1 text-base font-bold text-foreground sm:text-lg">{faq.q}</span>
              <ChevronDown
                aria-hidden="true"
                className={`mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 pl-[76px] text-base leading-relaxed text-muted-foreground sm:px-8 sm:pb-8 sm:pl-[88px]">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
