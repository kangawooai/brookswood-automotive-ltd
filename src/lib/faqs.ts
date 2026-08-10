import type { Faq } from '@/components/faq'

export const HOME_FAQS: Faq[] = [
  {
    q: 'What is checked during an MOT test?',
    a: 'An MOT checks the parts of your car that affect safety and emissions. That includes brakes, steering and suspension, lights, tyres, the exhaust and emissions, seatbelts, wipers, the windscreen and the horn. It is a condition check on the day, not a service, so it does not cover engine, clutch or gearbox wear.',
  },
  {
    q: 'Do you pay for MOT before or after?',
    a: 'You normally pay for the MOT after the test is completed, when you collect the car. If your car fails and needs repairs, we always explain what is required and give you a clear quote first — you only pay for repair work you have approved, and qualifying retests with us are free.',
  },
  {
    q: 'How can I prepare my car for an MOT?',
    a: 'A few quick checks help avoid easy failures. Make sure all lights work, top up screen wash, check tyre tread and pressures, and clear the windscreen and number plates. Test the horn, wipers and seatbelts, and sort any warning lights on the dashboard beforehand. If in doubt, book a pre-MOT check with us.',
  },
  {
    q: 'What is included in an MOT and service?',
    a: 'The MOT is a legal safety and emissions check with a pass or fail result. A service is preventative maintenance — typically an oil and filter change, fluid top-ups and a multi-point inspection of brakes, tyres and suspension. Booked together, they give you both a road-legal certificate and a car that runs reliably.',
  },
  {
    q: 'Is it worth getting a service with MOT?',
    a: 'Yes. An MOT only confirms your car meets minimum legal standards on the day, whereas a service keeps it running smoothly and catches wear early. Booking both together saves you a second visit, often flags advisory items before they become failures, and helps protect your car’s reliability and resale value.',
  },
]

// General garage FAQs for the About Us page — relevant to every customer,
// not tied to any single service.
export const ABOUT_FAQS: Faq[] = [
  {
    q: 'Is your work guaranteed?',
    a: 'Yes. We stand behind everything we do, and all our repairs and the quality parts we fit are covered by a guarantee. If you ever have a concern after a job, bring the car back and we will put it right.',
  },
  {
    q: 'Are you fully insured?',
    a: 'Absolutely. We are a fully insured, established garage, so your vehicle is in safe hands from the moment it comes onto our premises to the moment you drive it away.',
  },
  {
    q: 'How quickly can you get me booked in?',
    a: 'We do our best to fit you in as soon as possible, and can often book you in within a day or two — sometimes the same day for urgent jobs. Give us a call on 01329 640528 and we will find a slot that suits you.',
  },
  {
    q: 'Do you work on all makes and models?',
    a: 'Yes. With over 20 years of experience and modern diagnostic equipment, we service and repair all makes and models — petrol, diesel and hybrid, from everyday runabouts to prestige vehicles.',
  },
  {
    q: 'Will you let me know the cost before starting any work?',
    a: 'Always. We give you a clear, honest quote before we begin, and we never carry out work you have not approved. If we spot anything extra along the way, we will call you first so there are no surprises.',
  },
]

export const MOT_FAQS: Faq[] = [
  {
    q: 'How long does an MOT take?',
    a: 'A standard Class 4 MOT typically takes around 45 to 60 minutes. If you would like to wait, let us know when booking and we will do our best to accommodate you.',
  },
  {
    q: 'When is my MOT due?',
    a: 'Your MOT is due every year, either on the anniversary of your last test or before your car turns three years old for the first test. You can check your due date on the DVLA website using your registration.',
  },
  {
    q: 'Do you offer a free retest?',
    a: 'Yes. If your car fails and you have the qualifying repairs carried out with us, we will retest it free of charge within the permitted retest period.',
  },
  {
    q: 'How much does an MOT cost?',
    a: 'We charge competitive, transparent rates for MOT testing. Call us on 01329 640528 for our current price and to book a slot that suits you.',
  },
  {
    q: 'Can you carry out repairs if my car fails?',
    a: 'Absolutely. As a full-service garage we can carry out any repairs needed to get your car through its MOT, and we will always quote you first before starting.',
  },
]

// Per-service FAQ sets, keyed by the service slug in SERVICES (see lib/site.ts).
// Each service page pulls in its own set instead of the shared HOME_FAQS.
export const SERVICE_FAQS: Record<string, Faq[]> = {
  'mot-testing': [
    {
      q: 'How long does an MOT test take?',
      a: 'A standard Class 4 MOT usually takes around 45 to 60 minutes. If you would like to wait while it is carried out, just let us know when you book and we will do our best to fit you in.',
    },
    {
      q: 'When is my MOT due?',
      a: 'Your first MOT is due before your car turns three years old, and every year after that on the anniversary of the last test. You can check your exact due date free of charge on the DVLA website using your registration.',
    },
    {
      q: 'What happens if my car fails its MOT?',
      a: 'We explain exactly why it failed in plain English and give you a clear, no-obligation quote for the repairs needed. As a full-service garage we can carry out the work here, and qualifying repairs come with a free retest.',
    },
    {
      q: 'Can I drive my car if the MOT has expired?',
      a: 'It is against the law to drive on an expired MOT, except when driving to a pre-booked test or to a garage for repairs. To stay on the safe side, book your test up to a month (minus a day) before it runs out and keep the same renewal date.',
    },
    {
      q: 'How much does an MOT cost in Fareham?',
      a: 'We keep our MOT pricing competitive and fully transparent, with no hidden extras. Call us on 01329 640528 for our current price and to reserve a slot that suits you.',
    },
    {
      q: 'Is an MOT the same as a service?',
      a: 'No. An MOT is a legal safety and emissions check with a pass or fail result, while a service is preventative maintenance such as oil changes and inspections. Many customers book both together to save a second visit — just ask when you call.',
    },
  ],
  'car-servicing': [
    {
      q: 'How often should I service my car?',
      a: 'As a general guide, an interim service every six months or 6,000 miles and a full service once a year or every 12,000 miles keeps most cars in good health. Always check your handbook, as some manufacturers set their own intervals.',
    },
    {
      q: 'What is the difference between an interim and a full service?',
      a: 'An interim service covers the essentials — oil and filter change, top-ups and a safety check — and suits high-mileage drivers between full services. A full service is far more thorough, with more checks and replacements to keep your car reliable year-round.',
    },
    {
      q: 'Will servicing my car here affect my manufacturer warranty?',
      a: 'No. Under Block Exemption rules you can have your car serviced at an independent garage like ours without voiding your warranty, provided we follow the manufacturer schedule and use quality parts and oils — which we always do.',
    },
    {
      q: 'Do you stamp my service book?',
      a: 'Yes. We complete and stamp your service record, whether it is a physical book or a digital record, so your service history stays intact and helps protect your car’s resale value.',
    },
    {
      q: 'How long does a car service take?',
      a: 'An interim service typically takes a couple of hours, while a full service usually takes around half a day. Let us know if you need your car back by a certain time and we will plan around it.',
    },
    {
      q: 'What if you find extra work is needed?',
      a: 'If we spot anything beyond the standard service, we will explain it clearly and give you a price before doing any work. You are always in control — we never carry out repairs you have not approved.',
    },
  ],
  brakes: [
    {
      q: 'How do I know if my brakes need replacing?',
      a: 'Common warning signs include squealing or grinding noises, a spongy or vibrating brake pedal, the car pulling to one side when braking, or a brake warning light. If you notice any of these, book a free brake check with us straight away.',
    },
    {
      q: 'How long do brake pads and discs last?',
      a: 'Brake pads typically last between 25,000 and 40,000 miles and discs a little longer, but it depends heavily on your driving style and mileage. We measure the wear precisely so you only replace parts when they genuinely need it.',
    },
    {
      q: 'Do you offer a free brake check?',
      a: 'Yes. We are happy to inspect your pads, discs and fluid and give you an honest assessment at no charge. If anything needs attention, we will show you what and why before recommending any work.',
    },
    {
      q: 'How often should brake fluid be changed?',
      a: 'Brake fluid should usually be replaced every two years, as it absorbs moisture over time which reduces braking performance. We test the condition of your fluid during a brake check and let you know if it is due.',
    },
    {
      q: 'Can I keep driving with worn brakes?',
      a: 'We strongly advise against it. Worn brakes increase your stopping distance and can damage other components, making the repair more costly. If your brakes feel or sound wrong, have them checked as soon as possible.',
    },
  ],
  'suspension-steering': [
    {
      q: 'What are the signs of worn suspension?',
      a: 'Look out for a bumpy or unstable ride, knocking noises over bumps, the car dipping heavily when braking, or uneven tyre wear. Any of these suggests your shocks, springs or bushes may need attention.',
    },
    {
      q: 'Why does my steering feel loose or heavy?',
      a: 'Loose, heavy or vibrating steering can point to worn track rod ends, steering rack issues, low power-steering fluid or wheel balancing problems. We diagnose the exact cause rather than guessing, so the fix is done right first time.',
    },
    {
      q: 'Can worn suspension cause an MOT failure?',
      a: 'Yes. Damaged shock absorbers, springs, bushes and steering components are common MOT failure points. Getting them checked and repaired keeps your car safe and helps it sail through its next test.',
    },
    {
      q: 'How does worn suspension affect my tyres?',
      a: 'Faulty suspension and steering throw out your wheel alignment, which causes uneven and premature tyre wear. Fixing the underlying issue protects your tyres and saves you money in the long run.',
    },
    {
      q: 'Do you carry out wheel alignment?',
      a: 'Yes, and it is well worth having checked after any suspension or steering work, or if you have hit a kerb or pothole. Correct alignment improves handling, reduces tyre wear and keeps the car tracking straight.',
    },
  ],
  exhausts: [
    {
      q: 'How do I know if my exhaust needs repairing?',
      a: 'Tell-tale signs include a louder or droning engine note, a rattling or hissing sound, a drop in fuel efficiency, or a warning light. If you notice any of these, bring your car in and we will inspect the whole system.',
    },
    {
      q: 'Do I need to replace the whole exhaust or just part of it?',
      a: 'Often just the affected section, such as the silencer or a corroded pipe, needs replacing rather than the entire system. We inspect the exhaust end to end and only recommend replacing what is genuinely worn.',
    },
    {
      q: 'What is a DPF and can you fix it?',
      a: 'A diesel particulate filter traps soot from the exhaust of diesel cars. If it becomes blocked you may notice a warning light or reduced performance. We diagnose DPF faults and advise on the best way to resolve them.',
    },
    {
      q: 'Can a faulty exhaust cause an MOT failure?',
      a: 'Yes. Excessive noise, leaks or emissions outside the legal limits will all fail an MOT. Getting exhaust issues sorted keeps your car quiet, efficient and road-legal.',
    },
    {
      q: 'What does a catalytic converter do?',
      a: 'The catalytic converter reduces harmful gases in your exhaust to help your car meet emissions standards. If yours is failing you may see a warning light or fail an emissions test — we can check and advise.',
    },
  ],
  clutches: [
    {
      q: 'What are the signs of a failing clutch?',
      a: 'The usual signs are a slipping clutch where the engine revs but the car does not accelerate as expected, a high or spongy biting point, difficulty changing gear, or a burning smell. If you spot these, have it checked before it worsens.',
    },
    {
      q: 'How long does a clutch replacement take?',
      a: 'Most clutch replacements take between three and five hours, though it varies by vehicle. We will give you a clear timescale when we quote so you can plan around it.',
    },
    {
      q: 'How long should a clutch last?',
      a: 'A clutch typically lasts anywhere from 60,000 to over 100,000 miles, depending largely on driving style and how much stop-start and town driving the car does. Smooth gear changes help it last longer.',
    },
    {
      q: 'Can I keep driving with a slipping clutch?',
      a: 'It is best not to. A slipping clutch only gets worse, can leave you stranded, and may cause further damage that makes the repair more expensive. Book a diagnosis as soon as you notice a problem.',
    },
    {
      q: 'Do you replace the flywheel too?',
      a: 'Sometimes. On cars with a dual-mass flywheel we inspect its condition during the job, as a worn flywheel can quickly ruin a new clutch. We will always advise and quote before replacing anything.',
    },
  ],
  diagnostics: [
    {
      q: 'What does a diagnostic check involve?',
      a: 'We connect your car to specialist diagnostic equipment that reads the fault codes stored by its onboard computer. Our technicians then interpret those codes, alongside live data, to pinpoint the true cause rather than replacing parts on guesswork.',
    },
    {
      q: 'My engine warning light is on — is it serious?',
      a: 'Not always, but it should never be ignored. A warning light can flag anything from a minor sensor fault to a more serious issue. A quick diagnostic check tells you exactly what is wrong so you can act with confidence.',
    },
    {
      q: 'How long does a diagnostic check take?',
      a: 'Reading the fault codes is quick, often under an hour. More involved investigation into wiring or intermittent faults can take longer, but we will keep you informed of the time and cost throughout.',
    },
    {
      q: 'Will a diagnostic check tell you exactly what is wrong?',
      a: 'Fault codes point us to the affected system, and our technicians take it from there with further testing to confirm the precise cause. This avoids the common trap of replacing parts that were never faulty.',
    },
    {
      q: 'Can you clear the warning light after fixing the fault?',
      a: 'Yes. Once the underlying problem is resolved we clear the stored codes and confirm the warning light stays off. If it returns, that tells us the fault has not been fully fixed, and we investigate further.',
    },
  ],
  'air-conditioning-regas': [
    {
      q: 'How often should I have my air-con regassed?',
      a: 'As a rule of thumb, every two years or so, as air-conditioning systems naturally lose a small amount of refrigerant over time. If the air is no longer as cold as it used to be, it is likely due a regas.',
    },
    {
      q: 'Why is my air-con not blowing cold?',
      a: 'The most common cause is low refrigerant, which a regas will resolve. It can also be down to a leak, a faulty compressor or a blocked system. We test the system and diagnose the cause before recharging it.',
    },
    {
      q: 'What does an air-con regas include?',
      a: 'We remove the old refrigerant, check the system for leaks and performance issues, then recharge it to the correct level. We can also carry out an anti-bacterial cleanse to clear any musty odours from the vents.',
    },
    {
      q: 'Why does my air-con smell musty?',
      a: 'A musty smell is usually caused by bacteria and mould building up in the system. An anti-bacterial cleanse clears this out and leaves the air fresh again — we can include it as part of your air-con service.',
    },
    {
      q: 'Should I use my air-con in winter?',
      a: 'Yes. Running your air-con regularly, even in colder months, keeps the system healthy and helps demist your windscreen quickly. Cars left with the air-con unused are more likely to develop leaks and faults.',
    },
  ],
  tyres: [
    {
      q: 'What is the legal tyre tread depth in the UK?',
      a: 'The legal minimum tread depth is 1.6mm across the central three-quarters of the tyre, all the way around. We recommend replacing tyres before they reach the limit for safety, and we offer free tread checks to keep you legal.',
    },
    {
      q: 'Do you offer budget and premium tyres?',
      a: 'Yes. We supply and fit a full range, from cost-effective budget tyres to leading premium brands, so you can choose what suits your car and your budget. We are happy to advise on the best option for your needs.',
    },
    {
      q: 'Can you repair a puncture rather than replace the tyre?',
      a: 'Where it is safe and within the industry guidelines, yes — a repair is often more cost-effective than a new tyre. If the damage is to the sidewall or the puncture is too large, we will explain why a replacement is the safer choice.',
    },
    {
      q: 'How do I know if I need new tyres?',
      a: 'Signs include low tread depth, cracks or bulges in the sidewall, uneven wear, or frequent loss of pressure. If you are unsure, pop in for a free tyre check and we will give you an honest assessment.',
    },
    {
      q: 'Do you balance the wheels when fitting tyres?',
      a: 'Yes. We balance your wheels as part of the fitting process to prevent vibration, uneven wear and steering wobble, so your new tyres perform their best from the moment you drive away.',
    },
  ],
}

// Returns the FAQ set tailored to a service slug, falling back to the shared
// home FAQs if a service has no dedicated set yet.
export function getServiceFaqs(slug: string): Faq[] {
  return SERVICE_FAQS[slug] ?? HOME_FAQS
}
