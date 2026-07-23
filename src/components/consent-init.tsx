import Script from 'next/script'

// Runs before GTM/GA. Sets Consent Mode v2 defaults to denied, then applies any
// previously stored consent choice from the `cookie_consent` cookie.
export function ConsentInit() {
  return (
    <Script id="consent-init" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = window.gtag || gtag;
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500
        });
        try {
          var m = document.cookie.match(/(?:^|; )cookie_consent=([^;]+)/);
          if (m) {
            var c = JSON.parse(decodeURIComponent(m[1]));
            gtag('consent', 'update', {
              ad_storage: c.advertising ? 'granted' : 'denied',
              ad_user_data: c.advertising ? 'granted' : 'denied',
              ad_personalization: c.personalisation ? 'granted' : 'denied',
              analytics_storage: c.analytics ? 'granted' : 'denied'
            });
          }
        } catch (e) {}
      `}
    </Script>
  )
}
