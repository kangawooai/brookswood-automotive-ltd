import { PageHero } from '@/components/blocks'

/** Shared shell for legal / policy pages: compact hero + readable prose column. */
export function LegalPage({
  title,
  intro,
  lastUpdated,
  children,
}: {
  title: string
  intro: string
  lastUpdated: string
  children: React.ReactNode
}) {
  return (
    <>
      <PageHero
        image="/images/generated/workshop-tools.webp"
        eyebrow="Legal"
        title={title}
        subtitle={intro}
        compact
      />
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          <div className="legal-prose mt-8 space-y-6">{children}</div>
        </div>
      </section>
    </>
  )
}

/** A titled section within a legal page. */
export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold uppercase tracking-tight text-foreground">{heading}</h2>
      <div className="space-y-3 text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a:hover]:underline [&_li]:ml-1">
        {children}
      </div>
    </div>
  )
}
