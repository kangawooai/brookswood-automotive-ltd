'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export type Faq = { q: string; a: string }

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={`item-${i}`} className="border-b border-border">
          <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:no-underline sm:text-lg">
            <span className="flex items-start gap-4">
              <span className="text-primary">{String(i + 1).padStart(2, '0')}</span>
              <span>{faq.q}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-5 pl-12 text-base text-muted-foreground">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
