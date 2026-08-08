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
  /** White BMW i8 sports car outside a brick building. */
  bmwI8: `${BASE}/gmb-5.jpg`,
  /** Grey BMW with the bonnet open on a lift during servicing. */
  bmwService: `${BASE}/gmb-6.jpg`,
  /** Lineup of premium white luxury cars outside a stately building. */
  luxuryLineup: `${BASE}/gmb-7.jpg`,
  /** Modern customer waiting area and reception desk. */
  reception: `${BASE}/gmb-8.png`,
  /** White Volkswagen van inside the workshop next to a vehicle lift. */
  vwVan: `${BASE}/gmb-9.jpg`,
  /** Blue BMW in a workshop bay with its headlights illuminated. */
  bmwBay: `${BASE}/gmb-10.jpg`,
  /** Customer-uploaded finished workshop interior — used for the Home hero background. */
  heroWorkshop: '/images/hero-workshop.webp',
  /** Customer-uploaded blue Lotus Emira parked outside the Brookswood Automotive garage. */
  lotusEmira: '/images/lotus-emira-garage.webp',
  /** Customer-uploaded team photo — two Brookswood Automotive team members seated in the reception area. */
  team: '/images/team-jay-thom.webp',
} as const

export const PHOTO_ALT = {
  exterior:
    'Exterior of the Brookswood Automotive garage in Fareham, with signage, customer entrance and parking',
  workshop: 'Clean, modern workshop interior at Brookswood Automotive with red hydraulic vehicle lifts',
  fordOnLift: 'Blue Ford raised on a hydraulic lift for servicing in the Brookswood Automotive workshop',
  lotus: 'White Lotus sports car cared for by Brookswood Automotive, parked outside a classical stone building',
  bmwI8: 'White BMW i8 sports car serviced by Brookswood Automotive, parked outside a brick building',
  bmwService: 'Grey BMW with its bonnet open on a lift during servicing at Brookswood Automotive',
  luxuryLineup: 'A lineup of premium white luxury cars looked after by Brookswood Automotive',
  reception: 'Modern customer waiting area and reception desk inside the Brookswood Automotive garage',
  vwVan: 'White Volkswagen van parked inside the Brookswood Automotive workshop beside a vehicle lift',
  bmwBay: 'Blue BMW in a Brookswood Automotive workshop bay with its headlights illuminated',
  heroWorkshop: 'The Brookswood Automotive workshop interior in Fareham, with vehicle lift bays and tool storage',
  lotusEmira: 'A blue Lotus Emira parked outside the Brookswood Automotive garage in Fareham',
  team: 'Two Brookswood Automotive team members seated in the reception area of the garage in Fareham',
} as const
