/**
 * Real Google Business Profile photos for Brookswood Automotive, hosted on
 * Supabase. Each key maps to a descriptive photo so pages can reference the
 * most fitting real image per spot.
 */
const BASE =
  'https://hppgzamzudygkyyzkgdd.supabase.co/storage/v1/object/public/website-media/media/22617ebd-320a-4223-b2d6-31e50cf72b66'

export const PHOTOS = {
  /** Exterior of the garage building with signage, entrance and parking. */
  exterior: `${BASE}/gmb-1.png`,
  /** Clean, modern workshop interior with red hydraulic vehicle lifts. */
  workshop: `${BASE}/gmb-2.jpg`,
  /** Blue Ford raised on a hydraulic lift being serviced. */
  fordOnLift: `${BASE}/gmb-3.jpg`,
  /** White Lotus sports car in front of a classical stone building. */
  lotus: `${BASE}/gmb-4.jpg`,
  /** Customer-uploaded sunny-day lineup: Ford Puma, Mini, Mercedes Vito and Volvo XC60. */
  lineupSunny1: '/images/gallery-lineup-1.webp',
  /** Grey BMW with the bonnet open on a lift during servicing. */
  bmwService: `${BASE}/gmb-6.jpg`,
  /** Customer-uploaded overcast-day pair of Jaguars looked after by Brookswood Automotive. */
  jaguarPair: '/images/gallery-jaguars.webp',
  /** Modern customer waiting area and reception desk. */
  reception: `${BASE}/gmb-8.png`,
  /** Customer-uploaded sunny-day lineup: Ford Puma, Mini, blue Mercedes GLE and silver Vauxhall. */
  lineupSunny2: '/images/gallery-lineup-2.webp',
  /** Blue BMW in a workshop bay with its headlights illuminated. */
  bmwBay: `${BASE}/gmb-10.jpg`,
  /** Customer-uploaded finished workshop interior — used for the Home hero background. */
  heroWorkshop: '/images/hero-workshop.webp',
  /** Customer-uploaded blue Lotus Emira parked outside the Brookswood Automotive garage. */
  lotusEmira: '/images/lotus-emira-garage.webp',
} as const

export const PHOTO_ALT = {
  exterior:
    'Exterior of the Brookswood Automotive garage in Fareham, with signage, customer entrance and parking',
  workshop: 'Clean, modern workshop interior at Brookswood Automotive with red hydraulic vehicle lifts',
  fordOnLift: 'Blue Ford raised on a hydraulic lift for servicing in the Brookswood Automotive workshop',
  lotus: 'White Lotus sports car cared for by Brookswood Automotive, parked outside a classical stone building',
  lineupSunny1:
    'A sunny-day lineup of cars looked after by Brookswood Automotive, including a Ford Puma, Mini, Mercedes Vito and Volvo XC60',
  bmwService: 'Grey BMW with its bonnet open on a lift during servicing at Brookswood Automotive',
  jaguarPair: 'Two Jaguars looked after by Brookswood Automotive, parked outside on an overcast day',
  reception: 'Modern customer waiting area and reception desk inside the Brookswood Automotive garage',
  lineupSunny2:
    'A sunny-day lineup of cars looked after by Brookswood Automotive, including a Ford Puma, Mini, blue Mercedes GLE and silver Vauxhall',
  bmwBay: 'Blue BMW in a Brookswood Automotive workshop bay with its headlights illuminated',
  heroWorkshop: 'The Brookswood Automotive workshop interior in Fareham, with vehicle lift bays and tool storage',
  lotusEmira: 'A blue Lotus Emira parked outside the Brookswood Automotive garage in Fareham',
} as const
