'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type Consent = {
  analytics: boolean
  advertising: boolean
  personalisation: boolean
}

const COOKIE_NAME = 'cookie_consent'

function setConsentCookie(consent: Consent) {
  const value = encodeURIComponent(JSON.stringify(consent))
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`
}

function applyConsent(consent: Consent) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      ad_storage: consent.advertising ? 'granted' : 'denied',
      ad_user_data: consent.advertising ? 'granted' : 'denied',
      ad_personalization: consent.personalisation ? 'granted' : 'denied',
      analytics_storage: consent.analytics ? 'granted' : 'denied',
    })
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState<Consent>({
    analytics: true,
    advertising: true,
    personalisation: true,
  })

  useEffect(() => {
    const hasChoice = document.cookie.includes(`${COOKIE_NAME}=`)
    if (!hasChoice) setVisible(true)
  }, [])

  function acceptAll() {
    const all: Consent = { analytics: true, advertising: true, personalisation: true }
    setConsentCookie(all)
    applyConsent(all)
    setVisible(false)
  }

  function savePrefs() {
    setConsentCookie(prefs)
    applyConsent(prefs)
    setVisible(false)
    setShowPrefs(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t-4 border-primary bg-secondary p-4 text-secondary-foreground shadow-2xl sm:p-6">
      <div className="mx-auto max-w-7xl">
        {!showPrefs ? (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wide text-white">We value your privacy</p>
              <p className="mt-1 text-sm text-white/70">
                We use cookies to improve your experience, analyse traffic and support our marketing. You can
                accept all or manage your preferences.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setShowPrefs(true)}
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Manage Preferences
              </Button>
              <Button onClick={acceptAll} className="font-bold uppercase tracking-wide">
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-wide text-white">Cookie Preferences</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {(
                [
                  { key: 'analytics', label: 'Analytics', desc: 'Helps us understand how the site is used.' },
                  { key: 'advertising', label: 'Advertising', desc: 'Measures our marketing performance.' },
                  {
                    key: 'personalisation',
                    label: 'Personalisation',
                    desc: 'Tailors content to your interests.',
                  },
                ] as const
              ).map((item) => (
                <label
                  key={item.key}
                  className="flex cursor-pointer items-start gap-3 border border-white/15 p-3"
                >
                  <input
                    type="checkbox"
                    checked={prefs[item.key]}
                    onChange={(e) => setPrefs((p) => ({ ...p, [item.key]: e.target.checked }))}
                    className="mt-1 size-4 accent-primary"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-white">{item.label}</span>
                    <span className="block text-xs text-white/60">{item.desc}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowPrefs(false)}
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Back
              </Button>
              <Button onClick={savePrefs} className="font-bold uppercase tracking-wide">
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
