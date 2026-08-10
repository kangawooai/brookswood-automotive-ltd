'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SERVICES } from '@/lib/site'
import { getStoredTrackingParams } from '@/lib/tracking-params'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  postcode: z.string().min(4, 'Please enter your postcode'),
  service: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

function readCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : ''
}

export function ContactForm({
  defaultService,
  dark = false,
}: {
  defaultService?: string
  dark?: boolean
}) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService ?? '' },
  })

  async function onSubmit(values: FormValues) {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          ...getStoredTrackingParams(),
          fbp: readCookie('_fbp'),
          fbc: readCookie('_fbc'),
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      router.push('/thank-you')
    } catch {
      setError('Sorry, something went wrong. Please call us on 01329 640528.')
      setSubmitting(false)
    }
  }

  const labelClass = dark ? 'text-white' : 'text-foreground'
  const inputClass = dark
    ? 'bg-white/10 border-white/25 text-white placeholder:text-white/50 focus-visible:border-white'
    : ''

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className={labelClass}>
            Name
          </Label>
          <Input id="name" {...register('name')} className={inputClass} autoComplete="name" />
          {errors.name && <p className="text-xs text-primary">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className={labelClass}>
            Phone
          </Label>
          <Input id="phone" type="tel" {...register('phone')} className={inputClass} autoComplete="tel" />
          {errors.phone && <p className="text-xs text-primary">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className={labelClass}>
            Email
          </Label>
          <Input id="email" type="email" {...register('email')} className={inputClass} autoComplete="email" />
          {errors.email && <p className="text-xs text-primary">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="postcode" className={labelClass}>
            Postcode
          </Label>
          <Input id="postcode" {...register('postcode')} className={inputClass} autoComplete="postal-code" />
          {errors.postcode && <p className="text-xs text-primary">{errors.postcode.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="service" className={labelClass}>
          Service required
        </Label>
        <select
          id="service"
          {...register('service')}
          className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 ${inputClass}`}
        >
          <option value="">Select a service (optional)</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.nav} className="text-foreground">
              {s.nav}
            </option>
          ))}
          <option value="Other" className="text-foreground">
            Other / not sure
          </option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className={labelClass}>
          How can we help?
        </Label>
        <Textarea id="message" rows={4} {...register('message')} className={inputClass} />
      </div>

      {error && <p className="text-sm font-medium text-primary">{error}</p>}

      <Button type="submit" size="lg" className="w-full font-bold uppercase tracking-wide" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          'Request a Callback'
        )}
      </Button>

      <p className={`text-xs ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>
        By submitting this form you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  )
}
