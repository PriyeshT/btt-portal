export type Rule = {
  id: string
  title: string
  section: string
  points: string[]
  note?: string
}

export const RULE_SECTIONS = [
  'Lane Rules',
  'Speed',
  'Junctions & Turns',
  'Expressways',
  'Parking & Stopping',
  'Signals & Lights',
  'Road Users',
  'Safety',
  'Vehicle Requirements',
  'Special Zones',
]

export const RULES: Rule[] = [
  {
    id: 'keep-left-rule',
    title: 'The Keep-Left Rule',
    section: 'Lane Rules',
    points: [
      'Always drive on the left side of the road.',
      'Keep to the left lane unless you are overtaking.',
      'The right lane (outermost lane) is for overtaking only.',
    ],
  },
  {
    id: 'lane-discipline',
    title: 'Lane Discipline',
    section: 'Lane Rules',
    points: [
      'Keep to the left unless overtaking.',
      'Do not change lanes unnecessarily.',
      'Signal before changing lanes and check mirrors and blind spots.',
      'Do not weave in and out of lanes.',
      'You must not straddle two lanes.',
    ],
  },
  {
    id: 'road-hogging',
    title: 'Road-Hogging',
    section: 'Lane Rules',
    points: [
      'Road-hogging is an offence. Do not occupy the right lane unnecessarily.',
      'Move to the left lane once you have completed overtaking.',
      'On an expressway with 3 or more lanes, road-hogging = remaining in the two rightmost lanes unnecessarily.',
    ],
  },
  {
    id: 'overtaking',
    title: 'Overtaking',
    section: 'Lane Rules',
    points: [
      'Overtake on the right side.',
      'Never overtake when visibility is restricted (bend, crest of hill).',
      'Never overtake near a pedestrian crossing, junction, or school zone.',
      'Never overtake where there is a "No Overtaking" sign or double white lines.',
      'Give a signal before overtaking. Return to the left after overtaking.',
      'Do not overtake when road narrows.',
    ],
  },
  {
    id: 'speed-limits',
    title: 'Speed Limits',
    section: 'Speed',
    points: [
      'Default speed limit on roads: 50 km/h.',
      'Expressways: 90 km/h (unless otherwise posted).',
      'School zones: 40 km/h.',
      'Silver zones: 30 or 40 km/h (as posted).',
      'Friendly Streets: 40 km/h.',
      'Always obey posted speed limit signs.',
    ],
    note: 'Speed limit signs are red circles with the number inside.',
  },
  {
    id: 'give-way-junctions',
    title: "The 'Give Way' Rule at Road Junctions",
    section: 'Junctions & Turns',
    points: [
      'At junctions without signs or signals, give way to traffic from the right.',
      'Before turning, always check for vehicles, cyclists and pedestrians.',
      'Signal your intention well in advance.',
    ],
  },
  {
    id: 'roundabouts',
    title: 'Roundabouts',
    section: 'Junctions & Turns',
    points: [
      'Give way to traffic already in the roundabout (traffic from your right).',
      'Signal when entering, changing lanes within, and exiting the roundabout.',
      'Exit from the left lane when leaving the roundabout.',
      'Do not make a U-turn in a roundabout unless signs permit.',
    ],
  },
  {
    id: 'u-turns',
    title: 'U-Turns',
    section: 'Junctions & Turns',
    points: [
      'U-turns are only allowed where there is a U-turn sign or arrow.',
      'Never make a U-turn where there are double white lines.',
      'Never make a U-turn at a pedestrian crossing.',
      'Give way to all oncoming traffic when making a U-turn.',
    ],
  },
  {
    id: 'yellow-box-junctions',
    title: 'Yellow-Box Junctions',
    section: 'Junctions & Turns',
    points: [
      'Do not enter the yellow box if traffic ahead has come to a standstill.',
      'You may enter the yellow box only if your exit is clear.',
      'Exception: you may enter when you are turning right and are waiting for oncoming traffic to clear.',
    ],
    note: 'If you stop inside the yellow box blocking other traffic, you commit an offence.',
  },
  {
    id: 'expressway-rules',
    title: 'Driving on Expressways',
    section: 'Expressways',
    points: [
      'Maximum speed: 90 km/h (unless otherwise posted).',
      'Keep left except when overtaking.',
      'Road-hogging (staying in the 2 rightmost lanes) is an offence on expressways with 3+ lanes.',
      'Do not stop on the expressway except in an emergency.',
      'If broken down: switch on hazard lights, place warning triangle at least 20m behind vehicle, call for help.',
      'Vehicles prohibited from expressways: motorcycles below 400cc, pedal cycles, and others as signed.',
    ],
  },
  {
    id: 'stopping-parking',
    title: 'Stopping and Parking',
    section: 'Parking & Stopping',
    points: [
      'Do not park within 9 metres of a bus stop or junction.',
      'Do not park within 3 metres of a fire hydrant.',
      'Single unbroken yellow line: no parking 7am–7pm (except Sunday and PH).',
      'Double unbroken yellow lines: no parking at all times (pick-up/drop-off only).',
      'Single yellow zig-zag: no parking at all times (pick-up/drop-off only). Demerit points apply.',
      'Double yellow zig-zag: no stopping at all times. Demerit points apply.',
      'Do not park on a pedestrian crossing or within the zig-zag area.',
    ],
  },
  {
    id: 'traffic-lights',
    title: 'Traffic Lights',
    section: 'Signals & Lights',
    points: [
      'RED: Stop. Do not proceed.',
      'ALL RED: Do not start until the green light appears in your favour.',
      'AMBER: Stop unless you are so close to the stop line that stopping safely is not possible.',
      'FLASHING AMBER: Traffic lights are out of order. Proceed with caution. Give way to the right.',
      'GREEN: Go. Look right and left to ensure it is safe before proceeding.',
      'GREEN ARROW: Go only in the direction indicated after ensuring oncoming traffic is clear.',
      'FLICKERING GREEN ARROW: Signal about to be cancelled. Do not proceed if you have not crossed the stop line.',
      'RED ARROW: Do not turn in the direction indicated even if there is no oncoming traffic.',
    ],
  },
  {
    id: 'police-officer-signals',
    title: 'Signals by Police Officers',
    section: 'Signals & Lights',
    points: [
      'Police officer signals take precedence over road signs, traffic lights, road markings and traffic regulations.',
      'Both arms raised = all approaching vehicles stop.',
      'Arms outstretched sideways = vehicles from front and behind stop; vehicles from right and left may proceed.',
      'One arm raised = vehicles from right, front and behind stop; vehicles from left may proceed.',
      'Arm extended to one side = vehicles from front and behind stop; vehicles from that side may proceed, others ready to stop.',
    ],
  },
  {
    id: 'hand-signals',
    title: 'Hand Signals',
    section: 'Signals & Lights',
    points: [
      'Give a clear signal in good time before: turning right/left, stopping/slowing down, pulling out from parking, pulling out to pass.',
      'Right turn: right arm extended horizontally to the right.',
      'Left turn: right arm rotated in a circular motion clockwise (or left arm extended).',
      'Slowing down: right arm extended and moved up and down.',
      'Stopping: right arm raised vertically.',
    ],
  },
  {
    id: 'seat-belts',
    title: 'Seat Belts',
    section: 'Safety',
    points: [
      'All passengers in a vehicle must wear seat belts.',
      'The driver is responsible for ensuring all passengers below 1.35m in height use an approved child restraint or booster seat.',
      'Failure to wear a seat belt is an offence.',
    ],
  },
  {
    id: 'mobile-devices',
    title: 'Mobile Communication Devices',
    section: 'Safety',
    points: [
      'It is an offence to use a mobile phone while driving unless it is mounted in a holder and you use a hands-free function.',
      'Do not hold or manipulate the phone while the vehicle is in motion.',
    ],
  },
  {
    id: 'alcohol',
    title: 'Alcohol',
    section: 'Safety',
    points: [
      'Do not drink and drive.',
      'Prescribed limit: 80 mg of alcohol per 100 ml of blood.',
      'Breath alcohol limit: 35 micrograms per 100 ml of breath.',
      'Exceeding the limit is an offence. Penalties include fine, imprisonment, and disqualification from driving.',
    ],
  },
  {
    id: 'following-distance',
    title: 'Safe Following Distance',
    section: 'Safety',
    points: [
      "Use the 'Three-Second Rule': pick a fixed object ahead. When the vehicle in front passes it, count 'one thousand and one, one thousand and two, one thousand and three'. You should not reach the object before you finish counting.",
      'Increase following distance in wet weather, low visibility, or when driving a heavy vehicle.',
    ],
  },
  {
    id: 'lights',
    title: 'Vehicle Lights',
    section: 'Vehicle Requirements',
    points: [
      'Switch on headlights from 7pm to 7am.',
      'Use headlights during rain when visibility is poor.',
      'Use hazard lights when stationary or broken down.',
      'Do not use high beam when meeting or following another vehicle closely.',
      'Switch on headlights when entering a tunnel.',
    ],
  },
  {
    id: 'school-zone-rules',
    title: 'School Zone Rules',
    section: 'Special Zones',
    points: [
      'Maximum speed in a school zone: 40 km/h.',
      'Look out for children crossing and walking on the road.',
      'School zone is indicated by yellow warning signs and brick-red road markings.',
    ],
  },
  {
    id: 'silver-zone-rules',
    title: 'Silver Zone Rules',
    section: 'Special Zones',
    points: [
      'Speed limit is 30 or 40 km/h as posted.',
      'Look out for elderly pedestrians crossing.',
      'Give way to elderly pedestrians.',
    ],
  },
  {
    id: 'friendly-streets-rules',
    title: 'Friendly Streets Rules',
    section: 'Special Zones',
    points: [
      'Maximum speed: 40 km/h.',
      'Look out for active mobility users (cyclists, PMDs, pedestrians) crossing.',
      'Give way to road users crossing.',
    ],
  },
  {
    id: 'emergency-vehicles',
    title: 'Emergency Vehicles',
    section: 'Road Users',
    points: [
      'Give way to emergency vehicles (police, ambulance, fire engines) with sirens and flashing lights.',
      'Move to the left and stop if safe to do so.',
      'Do not follow closely behind emergency vehicles.',
    ],
  },
  {
    id: 'pedestrian-safety',
    title: 'Safety of Pedestrians and Cyclists',
    section: 'Road Users',
    points: [
      'Slow down and give way to pedestrians at all pedestrian crossings.',
      'Stop for pedestrians at zebra crossings — they have priority.',
      'Be alert to cyclists in bus lanes and on the road.',
      'Never park on the pavement or cycling path.',
    ],
  },
]

export function getRulesBySection(section: string): Rule[] {
  return RULES.filter(r => r.section === section)
}
