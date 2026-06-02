export type Marking = {
  id: string
  name: string
  description: string
  image: string
  section: 'across' | 'along' | 'on' | 'bus-lane'
  key?: string
}

export const MARKINGS: Marking[] = [
  // ─── ACROSS THE ROAD ─────────────────────────────────────────────────────────
  {
    id: 'parallel-broken-white',
    name: 'Parallel Broken White Lines',
    description: 'Traffic approaching these lines must give way to traffic on the major road.',
    image: '/images/img-036-184.png',
    section: 'across',
    key: 'Give way to major road traffic',
  },
  {
    id: 'single-white-line-across',
    name: 'Single White Line (stop line)',
    description: 'Traffic is required to stop and must stop close to and before this line.',
    image: '/images/img-036-185.png',
    section: 'across',
    key: 'Full stop required',
  },
  {
    id: 'parallel-dashed-solid-white',
    name: 'Parallel Dashed / Solid White Lines (signalised crossing)',
    description: 'Indicates a designated crossing accompanied by pedestrian signals (Green Man/Red Man). Turning vehicles must give way to pedestrians when the Green Man is lighted.',
    image: '/images/img-036-186.png',
    section: 'across',
    key: 'Give way to pedestrians on Green Man',
  },
  {
    id: 'zebra-crossing',
    name: 'Zebra Crossing',
    description: 'Slow down and stop if there are pedestrians or cyclists crossing or about to cross.',
    image: '/images/img-036-187.png',
    section: 'across',
    key: 'Stop for pedestrians/cyclists',
  },
  {
    id: 'raised-zebra-crossing',
    name: 'Raised Zebra Crossing',
    description: 'Slow down and stop if there are pedestrians or cyclists crossing or about to cross. Beware of raised hump.',
    image: '/images/img-037-188.png',
    section: 'across',
    key: 'Stop + beware of hump',
  },
  {
    id: 'hump',
    name: 'Hump',
    description: 'Slow down.',
    image: '/images/img-037-189.png',
    section: 'across',
    key: 'Slow down',
  },
  {
    id: 'bus-friendly-hump',
    name: 'Bus-Friendly Hump',
    description: 'Slow down. The gap in the middle allows buses to pass without slowing as much.',
    image: '/images/img-037-190.png',
    section: 'across',
    key: 'Slow down',
  },

  // ─── ALONG THE ROAD ──────────────────────────────────────────────────────────
  {
    id: 'broken-white-line',
    name: 'Broken White Line',
    description: 'Centre line of a two-way road. Vehicles should keep to the left of this line.',
    image: '/images/img-038-191.png',
    section: 'along',
    key: 'Keep left. Can cross if safe.',
  },
  {
    id: 'continuous-white-line',
    name: 'Continuous White Line',
    description: 'Centre line of a two-way road. No parking on either side. Can cross only when road ahead is clear and it is safe to do so.',
    image: '/images/img-038-192.png',
    section: 'along',
    key: 'Keep left. No parking. Can cross if safe.',
  },
  {
    id: 'double-white-lines',
    name: 'Unbroken Double White Lines',
    description: 'No parking on either side at all times. Vehicles are not allowed to cross. Never cross double white lines. No U-turn or right turn on roads with these lines.',
    image: '/images/img-038-193.png',
    section: 'along',
    key: 'No crossing. No U-turn. No right turn. No parking.',
  },
  {
    id: 'unbroken-yellow-line',
    name: 'Unbroken Yellow Line',
    description: 'No parking between 7.00am and 7.00pm on that side of the road, except on Sundays and public holidays.',
    image: '/images/img-039-194.png',
    section: 'along',
    key: 'No parking 7am–7pm (except Sun/PH)',
  },
  {
    id: 'double-yellow-lines',
    name: 'Unbroken Double Yellow Lines',
    description: 'No parking at all times on that side, except for the immediate picking up and letting down of passengers.',
    image: '/images/img-039-195.png',
    section: 'along',
    key: 'No parking at all times (pick-up/drop-off only)',
  },
  {
    id: 'single-yellow-zigzag',
    name: 'Single Yellow Zig-Zag Line',
    description: 'No parking at all times on that side except for immediate pick-up/drop-off. Violation attracts demerit points and a fine.',
    image: '/images/img-039-196.png',
    section: 'along',
    key: 'No parking (pick-up/drop-off only). Demerit points.',
  },
  {
    id: 'double-yellow-zigzag',
    name: 'Double Yellow Zig-Zag Lines',
    description: 'No stopping at all times on that side where the lines are drawn. Violation attracts demerit points and a fine.',
    image: '/images/img-039-197.png',
    section: 'along',
    key: 'No stopping at all times. Demerit points.',
  },
  {
    id: 'broken-white-accelerating',
    name: 'Broken White Line at Accelerating Lane',
    description: 'Indicates the edge of a road adjacent to an accelerating lane.',
    image: '/images/img-039-198.png',
    section: 'along',
    key: 'Edge of accelerating lane',
  },
  {
    id: 'broken-white-decelerating',
    name: 'Broken White Line at Decelerating Lane',
    description: 'Indicates the edge of a road adjacent to a turning or decelerating lane.',
    image: '/images/img-039-199.png',
    section: 'along',
    key: 'Edge of decelerating lane',
  },

  // ─── ON THE ROAD ─────────────────────────────────────────────────────────────
  {
    id: 'school-zone-marking',
    name: 'School Zone (brick red sections)',
    description: 'Sections in brick red indicate a school zone. Slow down and look out for children on the road.',
    image: '/images/img-040-200.png',
    section: 'on',
    key: 'Slow down, look out for children',
  },
  {
    id: 'yellow-box',
    name: 'Yellow Box',
    description: 'Do not drive into the yellow box when traffic has come to a standstill at the left lane. Give way to vehicles from the side road entering the main road.',
    image: '/images/img-040-201.png',
    section: 'on',
    key: 'Do not enter if exit is blocked',
  },
  {
    id: 'chevron-areas',
    name: 'Chevron Areas',
    description: 'Used to channel traffic. No driving or parking in the chevron area.',
    image: '/images/img-040-202.png',
    section: 'on',
    key: 'No driving or parking here',
  },
  {
    id: 'zigzag-lines-side',
    name: 'Zig-Zag Lines by Side of Road',
    description: 'Warns of a Pedestrian Crossing ahead. No stopping at all times on this road. Do not overtake or wait here. Pedestrians also prohibited from crossing in zig-zag areas.',
    image: '/images/img-043-207.png',
    section: 'on',
    key: 'No stopping. No overtaking. Pedestrian crossing ahead.',
  },
  {
    id: 'right-turn-pocket',
    name: 'Right-Turn Pocket',
    description: 'Vehicles turning right at road junctions should stay within the pocket until it is clear to complete the turn.',
    image: '/images/img-043-208.png',
    section: 'on',
    key: 'Wait in pocket before turning right',
  },
  {
    id: 'traffic-calming',
    name: 'Traffic Calming Markings',
    description: 'A series of triangular markings at the side of the road to create a visually narrowed road and encourage motorists to slow down.',
    image: '/images/img-043-209.png',
    section: 'on',
    key: 'Encourages slowing down',
  },
  {
    id: 'dashed-pedestrian-lines',
    name: 'Dashed Pedestrian Crossing Lines',
    description: 'Provides better contrast with the stop line to demarcate the crossing area. Motorists must comply with the stop line for pedestrians to cross.',
    image: '/images/img-043-210.png',
    section: 'on',
    key: 'Stop for pedestrians',
  },
  {
    id: 'pedestrian-crossing-ahead-marking',
    name: 'Pedestrian Crossing Ahead Markings',
    description: 'Warns motorists of a Zebra Crossing ahead. Motorists should watch out and give way to pedestrians.',
    image: '/images/img-043-211.png',
    section: 'on',
    key: 'Zebra crossing ahead',
  },

  // ─── BUS LANES ───────────────────────────────────────────────────────────────
  {
    id: 'normal-bus-lane',
    name: 'Normal Bus Lane',
    description: 'Continuous yellow line + short horizontal line at intervals. No driving or parking in the bus lane during operational hours: Mon–Fri 7.30am–9.30am and 5.00pm–8.00pm (not Sat, Sun & PH). Broken yellow line = vehicles may turn into/out of side road.',
    image: '/images/img-041-203.png',
    section: 'bus-lane',
    key: 'Mon–Fri: 7.30–9.30am and 5–8pm restricted',
  },
  {
    id: 'full-day-bus-lane-marking',
    name: 'Full-Day Bus Lane',
    description: 'Additional red line parallel to the yellow line. No driving or parking during Mon–Sat 7.30am–11.00pm (not Sun & PH).',
    image: '/images/img-041-204.png',
    section: 'bus-lane',
    key: 'Mon–Sat: 7.30am–11pm restricted',
  },
  {
    id: 'bus-priority-box',
    name: 'Bus Priority Box (Mandatory Give-Way to Buses)',
    description: 'Yellow section near bus bay. Stop before the give-way line and give way to buses exiting. Do not stay in the yellow Give-Way Bus Box.',
    image: '/images/img-042-205.png',
    section: 'bus-lane',
    key: 'Give way to buses exiting bus bay',
  },
  {
    id: 'enhanced-chevron-bus-stop',
    name: 'Enhanced Chevron Zone at Bus-Stop Separator',
    description: 'Painted red to alert motorists of merging vehicles from bus-stops. No driving or parking in the enhanced chevron zone.',
    image: '/images/img-042-206.png',
    section: 'bus-lane',
    key: 'No driving/parking. Merging buses.',
  },
]

export const MARKING_SECTIONS = [
  { id: 'across', label: 'Across the Road', description: 'Give-way lines, stop lines, zebra crossings, humps' },
  { id: 'along', label: 'Along the Road', description: 'Centre lines, parking lines (white and yellow)' },
  { id: 'on', label: 'On the Road', description: 'School zones, yellow boxes, chevrons, zig-zag lines' },
  { id: 'bus-lane', label: 'Bus Lanes', description: 'Bus lane markings and bus priority boxes' },
]

export function getMarkingsBySection(section: Marking['section']) {
  return MARKINGS.filter(m => m.section === section)
}
