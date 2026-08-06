'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SERVICES } from '@/lib/site'
import { getStoredTrackingParams } from '@/lib/tracking-params'
import { Loader2, Check, ArrowLeft, ArrowRight } from 'lucide-react'

// Multi-step "Book Now" form used on the service pages. Progress is auto-saved
// to sessionStorage after every step, and a partial lead is fired automatically
// if the visitor completes step 1 and then leaves before submitting.

type BookingData = {
  name: string
  phone: string
  reg: string
  service: string
  date: string
  timePreference: string
  message: string
  email: string
  postcode: string
}

const EMPTY: BookingData = {
  name: '',
  phone: '',
  reg: '',
  service: '',
  date: '',
  timePreference: '',
  message: '',
  email: '',
  postcode: '',
}

const STORAGE_KEY = 'booking_form_v1'

const STEPS = [
  { title: 'Your Details', hint: "Let's start with how to reach you." },
  { title: 'Your Vehicle', hint: 'Tell us about your car and what it needs.' },
  { title: 'More Info', hint: 'When suits you best?' },
  { title: 'Almost done!', hint: 'Just a couple more details to confirm.' },
]

function readCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : ''
}

function pushDataLayer(event: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(event)
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<BookingData>({ ...EMPTY, service: defaultService ?? '' })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Refs used by the "leave the page" partial-submit handler so it always sees
  // the latest values without re-binding the listener on every keystroke.
  const dataRef = useRef(data)
  const partialSentRef = useRef(false)
  const fullSentRef = useRef(false)
  dataRef.current = data

  // Restore any saved progress on mount.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as { data?: Partial<BookingData>; step?: number }
        if (saved.data) {
          setData((d) => ({ ...d, ...saved.data, service: saved.data?.service || d.service }))
        }
        if (typeof saved.step === 'number') {
          setStep(Math.min(Math.max(saved.step, 0), STEPS.length - 1))
        }
      }
    } catch {
      // sessionStorage unavailable — start fresh.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const save = useCallback((nextData: BookingData, nextStep: number) => {
    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: nextData, step: nextStep }),
      )
    } catch {
      // Ignore persistence failures (private mode).
    }
  }, [])

  const set = (field: keyof BookingData, value: string) => {
    setData((d) => ({ ...d, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  // Has the visitor given us enough to count as a lead? (step 1 complete)
  const hasStepOne = (d: BookingData) => d.name.trim().length >= 2 && d.phone.trim().length >= 7

  const buildPayload = (d: BookingData, submissionType: 'partial' | 'full') => ({
    name: d.name,
    email: d.email,
    phone: d.phone,
    postcode: d.postcode,
    service: d.service,
    reg: d.reg,
    preferredDate: d.date,
    timePreference: d.timePreference,
    message: d.message,
    submissionType,
    ...getStoredTrackingParams(),
    fbp: readCookie('_fbp'),
    fbc: readCookie('_fbc'),
  })

  // Fire the partial lead once, when the visitor leaves mid-form.
  const sendPartial = useCallback(() => {
    if (partialSentRef.current || fullSentRef.current) return
    const d = dataRef.current
    if (!hasStepOne(d)) return
    partialSentRef.current = true

    const payload = JSON.stringify(buildPayload(d, 'partial'))
    try {
      const blob = new Blob([payload], { type: 'application/json' })
      if (!(navigator.sendBeacon && navigator.sendBeacon('/api/submit-form', blob))) {
        fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // Best-effort only — never block the visitor leaving.
    }

    pushDataLayer({
      event: 'generate_lead',
      lead_type: 'partial',
      value: 0.5,
      currency: 'GBP',
      service: d.service || 'Not specified',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onHide = () => sendPartial()
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') sendPartial()
    }
    window.addEventListener('pagehide', onHide)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('pagehide', onHide)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [sendPartial])

  function validateStep(current: number): boolean {
    const e: Partial<Record<keyof BookingData, string>> = {}
    if (current === 0) {
      if (data.name.trim().length < 2) e.name = 'Please enter your name'
      if (data.phone.trim().length < 7) e.phone = 'Please enter a valid phone number'
    } else if (current === 1) {
      if (data.reg.trim().length < 2) e.reg = 'Please enter your registration'
      if (!data.service.trim()) e.service = 'Please choose a service'
    } else if (current === 3) {
      if (!isEmail(data.email.trim())) e.email = 'Please enter a valid email'
      if (data.postcode.trim().length < 4) e.postcode = 'Please enter your postcode'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (!validateStep(step)) return
    const nextStep = Math.min(step + 1, STEPS.length - 1)
    setStep(nextStep)
    save(data, nextStep)
  }

  function back() {
    const prev = Math.max(step - 1, 0)
    setStep(prev)
    save(data, prev)
  }

  async function submit() {
    if (!validateStep(3)) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(data, 'full')),
      })
      if (!res.ok) throw new Error('Submission failed')
      fullSentRef.current = true
      pushDataLayer({
        event: 'generate_lead',
        lead_type: 'full',
        value: 1.0,
        currency: 'GBP',
        service: data.service || 'Not specified',
      })
      try {
        window.sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        // Ignore.
      }
      router.push('/thank-you')
    } catch {
      setSubmitError('Sorry, something went wrong. Please call us on 01329 756796.')
      setSubmitting(false)
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex flex-1 items-center">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  i < step
                    ? 'bg-primary text-primary-foreground'
                    : i === step
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {i < step ? <Check className="size-4" strokeWidth={3} /> : i + 1}
              </span>
              {i < STEPS.length - 1 && (
                <span
                  className={`mx-2 h-0.5 flex-1 ${i < step ? 'bg-primary' : 'bg-border'}`}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            Step {step + 1} of {STEPS.length}
          </p>
          <h3 className="mt-1 text-xl font-black uppercase tracking-tight text-foreground">
            {STEPS[step].title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{STEPS[step].hint}</p>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (step < STEPS.length - 1) next()
          else submit()
        }}
        className="space-y-4"
        noValidate
      >
        {step === 0 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="bf-name">Name</Label>
              <Input
                id="bf-name"
                value={data.name}
                onChange={(e) => set('name', e.target.value)}
                autoComplete="name"
              />
              {errors.name && <p className="text-xs text-primary">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bf-phone">Phone</Label>
              <Input
                id="bf-phone"
                type="tel"
                value={data.phone}
                onChange={(e) => set('phone', e.target.value)}
                autoComplete="tel"
              />
              {errors.phone && <p className="text-xs text-primary">{errors.phone}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="bf-reg">Registration plate</Label>
              <Input
                id="bf-reg"
                value={data.reg}
                onChange={(e) => set('reg', e.target.value.toUpperCase())}
                placeholder="e.g. AB12 CDE"
                className="uppercase"
              />
              {errors.reg && <p className="text-xs text-primary">{errors.reg}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bf-service">Service required</Label>
              <select
                id="bf-service"
                value={data.service}
                onChange={(e) => set('service', e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="">Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.nav}>
                    {s.nav}
                  </option>
                ))}
                <option value="Other">Other / not sure</option>
              </select>
              {errors.service && <p className="text-xs text-primary">{errors.service}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="bf-date">Preferred date</Label>
              <Input
                id="bf-date"
                type="date"
                value={data.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Preferred time</Label>
              <div className="grid grid-cols-2 gap-3">
                {['Morning', 'Afternoon'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set('timePreference', t)}
                    className={`flex h-10 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                      data.timePreference === t
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-input bg-transparent text-foreground hover:border-primary'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bf-message">Anything else? (optional)</Label>
              <Textarea
                id="bf-message"
                rows={3}
                value={data.message}
                onChange={(e) => set('message', e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="bf-email">Email</Label>
              <Input
                id="bf-email"
                type="email"
                value={data.email}
                onChange={(e) => set('email', e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-primary">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bf-postcode">Postcode</Label>
              <Input
                id="bf-postcode"
                value={data.postcode}
                onChange={(e) => set('postcode', e.target.value)}
                autoComplete="postal-code"
              />
              {errors.postcode && <p className="text-xs text-primary">{errors.postcode}</p>}
            </div>
          </div>
        )}

        {submitError && <p className="text-sm font-medium text-primary">{submitError}</p>}

        <div className="flex items-center gap-3 pt-2">
          {step > 0 && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={back}
              className="font-bold uppercase tracking-wide"
              disabled={submitting}
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
          )}
          <Button
            type="submit"
            size="lg"
            className="flex-1 font-bold uppercase tracking-wide"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" /> Sending…
              </>
            ) : step < STEPS.length - 1 ? (
              <>
                Continue <ArrowRight className="size-4" />
              </>
            ) : (
              'Book Now'
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          By submitting this form you agree to be contacted about your booking. We never share your
          details.
        </p>
      </form>
    </div>
  )
}
