import Script from 'next/script'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K93M7G6F'
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
// Google Ads account (e.g. "AW-1013904242"). When set, loads gtag so the forms can fire
// per-form Google Ads conversions via `fireAdsConversion` (see src/lib/ads-conversions.ts).
// Dormant until set — leave unset while the GTM container still fires the Ads conversion tag.
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

export function Tracking() {
  if (!GTM_ID && !GA_ID && !ADS_ID) return null

  return (
    <>
      {GTM_ID && (
        <>
          {/* Load GTM only once the page is idle so it doesn't compete with the
              first render, consent defaults are already set by ConsentInit. */}
          <Script id="gtm" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
      {GA_ID && !GTM_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {ADS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
            strategy="lazyOnload"
          />
          <Script id="google-ads" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ADS_ID}');`}
          </Script>
        </>
      )}
    </>
  )
}
