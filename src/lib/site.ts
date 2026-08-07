import {
  Wrench,
  Disc3,
  CircleDot,
  Waves,
  Cog,
  ScanLine,
  CircleGauge,
  Snowflake,
  type LucideIcon,
} from 'lucide-react'
import { MotIcon } from '@/components/icons/mot-icon'
import { PHOTOS } from './photos'

export const SITE = {
  name: 'Brookswood Automotive LTD',
  tradingName: 'Fareham MOT Centre',
  shortName: 'Brookswood Automotive',
  domain: 'brookswoodautomotive.co.uk',
  url: 'https://brookswoodautomotive.co.uk',
  phoneDisplay: '01329 756796',
  phoneHref: '+441329756796',
  email: 'info@brookswoodautomotive.co.uk',
  contactName: 'Thomas Cullen',
  address: {
    line1: '4-6 Hackett Way',
    city: 'Fareham',
    county: 'Hampshire',
    postcode: 'PO14 1AJ',
    country: 'United Kingdom',
    full: '4-6 Hackett Way, Fareham, Hampshire PO14 1AJ',
  },
  companyReg: '14569886',
  rating: { value: '5.0', count: 71 },
  yearsExperience: '20+',
  hours: [
    { day: 'Monday', open: '08:30', close: '17:30' },
    { day: 'Tuesday', open: '08:30', close: '17:30' },
    { day: 'Wednesday', open: '08:30', close: '17:30' },
    { day: 'Thursday', open: '08:30', close: '17:30' },
    { day: 'Friday', open: '08:30', close: '17:30' },
    { day: 'Saturday', open: '09:00', close: '13:00' },
    { day: 'Sunday', open: null, close: null },
  ],
  // Schema.org opening hours specification
  hoursSpec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:30' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],
  geo: { lat: 50.8429, lng: -1.2036 },
} as const

export type Service = {
  slug: string
  title: string
  nav: string
  short: string
  metaTitle: string
  metaDescription: string
  image: string
  icon: LucideIcon
  intro: string
  included: string[]
  process: { step: string; detail: string }[]
  keywords: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'mot-testing',
    title: 'MOT Testing in Fareham',
    nav: 'MOT Testing',
    short: 'Class 4 MOT tests carried out by DVSA-approved testers, with free retests.',
    metaTitle: 'MOT Testing Fareham | Class 4 MOT Centre',
    metaDescription:
      'Book your MOT in Fareham at Brookswood Automotive. DVSA-approved testers, honest advice and free retests. Call 01329 756796.',
    image: PHOTOS.fordOnLift,
    icon: MotIcon,
    intro:
      'As a fully equipped Fareham MOT centre, we carry out Class 4 MOT tests to the latest DVSA standards. Our approved testers check every legal safety and emissions requirement, explain any advisories in plain English, and never carry out work you have not authorised.',
    included: [
      'DVSA-approved Class 4 MOT testing',
      'Brakes, steering and suspension inspection',
      'Lights, tyres and visibility checks',
      'Emissions and exhaust assessment',
      'Clear pass/fail explanation with advisories',
      'Free retest on qualifying repairs',
    ],
    process: [
      { step: 'Book your slot', detail: 'Reserve a convenient MOT time online or over the phone.' },
      { step: 'Full inspection', detail: 'Our approved tester works through the DVSA checklist thoroughly.' },
      { step: 'Honest results', detail: 'We explain the outcome and only recommend genuinely needed work.' },
      { step: 'Back on the road', detail: 'Pass and you are done; any repairs are quoted up front first.' },
    ],
    keywords: ['MOT testing Fareham', 'MOT test centre Fareham', 'MOT garage Fareham', 'cheap MOT Fareham'],
  },
  {
    slug: 'car-servicing',
    title: 'Car Servicing in Fareham',
    nav: 'Car Servicing',
    short: 'Interim and full servicing that keeps your car reliable and protects its warranty.',
    metaTitle: 'Car Servicing Fareham | Interim & Full Service',
    metaDescription:
      'Car servicing in Fareham from Brookswood Automotive. Interim and full services using quality parts, with transparent pricing. Call 01329 756796.',
    image: PHOTOS.bmwService,
    icon: Wrench,
    intro:
      'Regular servicing keeps your car safe, efficient and reliable while protecting its resale value. We carry out interim and full services using quality parts and manufacturer-grade oils, and every service is logged so your history stays intact.',
    included: [
      'Engine oil and filter replacement',
      'Fluid level top-ups and checks',
      'Brake, tyre and suspension inspection',
      'Battery and charging system test',
      'Multi-point safety check',
      'Digital service record stamped',
    ],
    process: [
      { step: 'Choose your service', detail: 'We help you pick interim or full based on mileage and use.' },
      { step: 'Thorough inspection', detail: 'Our technicians work through a detailed multi-point checklist.' },
      { step: 'Transparent quote', detail: 'Any extra work is explained and priced before we proceed.' },
      { step: 'Ready to collect', detail: 'Your service is stamped and your car handed back running its best.' },
    ],
    keywords: ['car servicing Fareham', 'car service near me Fareham', 'full service Fareham'],
  },
  {
    slug: 'brakes',
    title: 'Brake Repairs in Fareham',
    nav: 'Brakes',
    short: 'Brake pads, discs and fluid checks to keep your stopping power dependable.',
    metaTitle: 'Brake Repairs Fareham | Pads, Discs & Fluid',
    metaDescription:
      'Brake repairs and replacements in Fareham. Pads, discs, callipers and brake fluid changes by trusted technicians. Call 01329 756796.',
    image: '/images/generated/brakes.webp',
    icon: Disc3,
    intro:
      'Your brakes are the single most important safety system on your car. We inspect, repair and replace brake pads, discs, callipers and fluid, and will always show you what needs doing and why before any work begins.',
    included: [
      'Brake pad and disc replacement',
      'Calliper inspection and repair',
      'Brake fluid testing and changes',
      'Handbrake adjustment',
      'Brake warning light diagnostics',
      'Free brake safety check',
    ],
    process: [
      { step: 'Free brake check', detail: 'We measure pad and disc wear and test for any warning signs.' },
      { step: 'Clear diagnosis', detail: 'You see exactly what is worn and what needs replacing.' },
      { step: 'Quality parts fitted', detail: 'We fit reliable components and torque everything to spec.' },
      { step: 'Road tested', detail: 'We test the brakes before returning your car to you.' },
    ],
    keywords: ['brake repair Fareham', 'brakes Fareham'],
  },
  {
    slug: 'suspension-steering',
    title: 'Suspension & Steering in Fareham',
    nav: 'Suspension & Steering',
    short: 'Shocks, springs and steering repairs for a smooth, controlled ride.',
    metaTitle: 'Suspension & Steering Repairs Fareham',
    metaDescription:
      'Suspension and steering repairs in Fareham. Shock absorbers, springs, bushes and steering components fixed by expert technicians. Call 01329 756796.',
    image: '/images/generated/suspension.webp',
    icon: Waves,
    intro:
      'Worn suspension and steering components affect comfort, handling and safety. We diagnose knocks, drifts and uneven tyre wear, then repair shock absorbers, springs, bushes and steering parts to restore a smooth, controlled ride.',
    included: [
      'Shock absorber and strut replacement',
      'Coil spring inspection and repair',
      'Suspension bush and arm replacement',
      'Steering rack and track rod checks',
      'Knock and vibration diagnosis',
      'Ride quality road test',
    ],
    process: [
      { step: 'Symptom check', detail: 'We listen to how the car behaves and inspect the components.' },
      { step: 'Pinpoint the fault', detail: 'We identify the exact worn part causing the problem.' },
      { step: 'Precision repair', detail: 'Replacement parts are fitted and torqued correctly.' },
      { step: 'Confirm the fix', detail: 'A road test confirms the ride and steering feel right.' },
    ],
    keywords: ['suspension service Fareham', 'steering repair Fareham'],
  },
  {
    slug: 'exhausts',
    title: 'Exhaust Repairs in Fareham',
    nav: 'Exhausts',
    short: 'Exhaust repairs and replacements including catalytic converters and DPFs.',
    metaTitle: 'Exhaust Repairs Fareham | Replacements & DPF',
    metaDescription:
      'Exhaust repairs and replacements in Fareham. Silencers, catalytic converters and DPF issues resolved. Call 01329 756796.',
    image: '/images/generated/exhausts.webp',
    icon: CircleDot,
    intro:
      'A healthy exhaust keeps your car quiet, efficient and within emissions limits. We repair and replace silencers, pipes, catalytic converters and diagnose diesel particulate filter faults to keep your car running cleanly.',
    included: [
      'Full and part exhaust replacement',
      'Silencer and back box repairs',
      'Catalytic converter checks',
      'DPF fault diagnosis',
      'Emissions testing',
      'Blowing and rattle repairs',
    ],
    process: [
      { step: 'Inspect the system', detail: 'We check the exhaust end to end for leaks and corrosion.' },
      { step: 'Identify the issue', detail: 'We locate blows, blockages or failing components.' },
      { step: 'Repair or replace', detail: 'We fit the right parts to restore quiet, clean running.' },
      { step: 'Emissions verified', detail: 'We confirm the system runs within limits before handover.' },
    ],
    keywords: ['exhaust repair Fareham', 'body repairs Fareham'],
  },
  {
    slug: 'clutches',
    title: 'Clutch Replacement in Fareham',
    nav: 'Clutches',
    short: 'Clutch diagnosis and replacement to fix slipping and heavy pedals.',
    metaTitle: 'Clutch Replacement Fareham | Repairs & Fitting',
    metaDescription:
      'Clutch replacement and repairs in Fareham. Fix slipping clutches, heavy pedals and biting-point issues. Call 01329 756796.',
    image: '/images/generated/clutches.webp',
    icon: Cog,
    intro:
      'A slipping clutch or high biting point only gets worse and more expensive if ignored. We diagnose clutch faults accurately and carry out reliable clutch replacements using quality kits, getting your gear changes smooth again.',
    included: [
      'Clutch wear diagnosis',
      'Full clutch kit replacement',
      'Release bearing and slave cylinder checks',
      'Dual-mass flywheel inspection',
      'Gear selection assessment',
      'Post-fit road test',
    ],
    process: [
      { step: 'Diagnose the clutch', detail: 'We confirm whether slipping or drag is the cause.' },
      { step: 'Honest quote', detail: 'We price the full job clearly with no surprises.' },
      { step: 'Quality replacement', detail: 'We fit a reliable clutch kit and related components.' },
      { step: 'Smooth again', detail: 'We road test to confirm clean, smooth gear changes.' },
    ],
    keywords: ['clutch replacement Fareham'],
  },
  {
    slug: 'diagnostics',
    title: 'Car Diagnostics in Fareham',
    nav: 'Diagnostics',
    short: 'Electronic diagnostics to read fault codes and find the real problem.',
    metaTitle: 'Car Diagnostics Fareham | Fault Code Reading',
    metaDescription:
      'Car diagnostics in Fareham. We read fault codes and pinpoint warning-light causes with modern equipment. Call 01329 756796.',
    image: '/images/generated/diagnostics.webp',
    icon: ScanLine,
    intro:
      'A warning light does not have to mean a big bill. Our diagnostic equipment reads the fault codes stored by your car, and our technicians interpret them properly to find the true cause rather than replacing parts on guesswork.',
    included: [
      'Full electronic fault-code scan',
      'Engine management light diagnosis',
      'ABS and airbag warning checks',
      'Sensor and wiring investigation',
      'Live data analysis',
      'Clear written findings',
    ],
    process: [
      { step: 'Plug in and scan', detail: 'We read every stored code across your car systems.' },
      { step: 'Interpret the data', detail: 'We analyse codes and live data to find the real fault.' },
      { step: 'Explain the cause', detail: 'You get a clear explanation and a repair plan.' },
      { step: 'Fix with confidence', detail: 'We resolve the issue and clear the fault correctly.' },
    ],
    keywords: ['car diagnostics Fareham'],
  },
  {
    slug: 'air-conditioning-regas',
    title: 'Air-Conditioning Regas in Fareham',
    nav: 'Air-Con Regas',
    short: 'Air-conditioning regas and repairs to get cold, fresh air flowing again.',
    metaTitle: 'Air-Conditioning Regas Fareham | Car Air-Con Service',
    metaDescription:
      'Car air-conditioning regas and repairs in Fareham. Restore cold air, fix leaks and refresh your system with Brookswood Automotive. Call 01329 756796.',
    image: '/images/generated/air-con.webp',
    icon: Snowflake,
    intro:
      'Over time your car’s air-conditioning loses refrigerant and cools less effectively. We recharge and service air-con systems, check for leaks and refresh the system so you get cold, clean air again — keeping you comfortable in summer and helping demist your windscreen in winter.',
    included: [
      'Full air-con regas and recharge',
      'System leak detection',
      'Compressor and condenser checks',
      'Anti-bacterial system cleanse',
      'Pressure and performance test',
      'Advice on ongoing air-con care',
    ],
    process: [
      { step: 'Performance check', detail: 'We test how well your air-con is cooling and pressurising.' },
      { step: 'Find any faults', detail: 'We check for leaks and worn components before recharging.' },
      { step: 'Regas and cleanse', detail: 'We recharge the system and cleanse it of bacteria and odours.' },
      { step: 'Cold air restored', detail: 'A final test confirms your air-con is blowing cold again.' },
    ],
    keywords: ['air conditioning regas Fareham', 'car air con Fareham', 'air con recharge Fareham'],
  },
  {
    slug: 'tyres',
    title: 'Tyres & Tyre Fitting in Fareham',
    nav: 'Tyres',
    short: 'Quality tyres supplied and fitted, plus puncture repairs and pressure checks.',
    metaTitle: 'Tyres Fareham | Supply, Fitting & Repairs',
    metaDescription:
      'Tyres in Fareham supplied and fitted. Quality budget to premium brands, puncture repairs and free tread checks. Call 01329 756796.',
    image: '/images/generated/tyres.webp',
    icon: CircleGauge,
    intro:
      'From budget to premium brands, we supply and fit tyres to suit your car and your budget. We also carry out safe puncture repairs where possible and offer free tread and pressure checks to keep you legal and safe.',
    included: [
      'New tyre supply and fitting',
      'Budget, mid-range and premium brands',
      'Puncture repairs where safe',
      'Wheel balancing',
      'Free tread depth checks',
      'Valve replacement',
    ],
    process: [
      { step: 'Free tyre check', detail: 'We assess tread depth, pressure and overall condition.' },
      { step: 'Choose your tyres', detail: 'We recommend options across budget and premium ranges.' },
      { step: 'Fitted and balanced', detail: 'Tyres are fitted and balanced with modern equipment.' },
      { step: 'Safe to drive', detail: 'We confirm pressures and torque before you leave.' },
    ],
    keywords: ['car tyres Fareham', 'tyre fitting Fareham', 'tyre repair Fareham', 'cheap tyres Fareham'],
  },
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Our Services', href: '/our-services' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/contact' },
]
