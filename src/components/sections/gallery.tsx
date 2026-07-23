'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Camera } from 'lucide-react'

import { PHOTOS, PHOTO_ALT } from '@/lib/photos'
import { cn } from '@/lib/utils'

type GalleryImage = {
  src: string
  alt: string
  /** Short human label shown on hover. */
  title: string
  /** Grid emphasis for a bento-style masonry layout. */
  span: 'wide' | 'tall' | 'default'
}

const IMAGES: GalleryImage[] = [
  { src: PHOTOS.workshop, alt: PHOTO_ALT.workshop, title: 'The workshop', span: 'wide' },
  { src: PHOTOS.fordOnLift, alt: PHOTO_ALT.fordOnLift, title: 'On the ramp', span: 'default' },
  { src: PHOTOS.bmwService, alt: PHOTO_ALT.bmwService, title: 'BMW service', span: 'tall' },
  { src: PHOTOS.vwVan, alt: PHOTO_ALT.vwVan, title: 'Van servicing', span: 'default' },
  { src: PHOTOS.bmwBay, alt: PHOTO_ALT.bmwBay, title: 'Diagnostics bay', span: 'default' },
  { src: PHOTOS.luxuryLineup, alt: PHOTO_ALT.luxuryLineup, title: 'Prestige lineup', span: 'wide' },
  { src: PHOTOS.lotus, alt: PHOTO_ALT.lotus, title: 'Lotus in for care', span: 'default' },
  { src: PHOTOS.bmwI8, alt: PHOTO_ALT.bmwI8, title: 'BMW i8', span: 'tall' },
  { src: PHOTOS.exterior, alt: PHOTO_ALT.exterior, title: 'Find us in Fareham', span: 'default' },
  { src: PHOTOS.reception, alt: PHOTO_ALT.reception, title: 'Reception', span: 'default' },
]

const spanClasses: Record<GalleryImage['span'], string> = {
  wide: 'sm:col-span-2 sm:row-span-1 aspect-[16/10] sm:aspect-auto',
  tall: 'sm:row-span-2 aspect-[4/5] sm:aspect-auto',
  default: 'aspect-square',
}

export function GallerySection() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Camera className="size-3.5 text-primary" />
            Our Work
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Inside the Fareham Workshop
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            From routine MOTs to prestige servicing, take a look around our fully
            equipped garage and the cars our team looks after every day.
          </p>
        </motion.div>

        <div className="mt-12 grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 sm:[grid-auto-rows:220px]">
          {IMAGES.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: (index % 4) * 0.06 }}
              className={cn(
                'group relative overflow-hidden rounded-xl border border-border bg-secondary',
                spanClasses[image.span],
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-sm font-medium text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {image.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
