export interface BytebeatTrack {
  id: number
  title: string
  author: string
  sampleRate: number
  formula: string
  description?: string
}

export const bytebeatTracks: BytebeatTrack[] = [
  {
    id: 1,
    title: 'the 42 melody',
    author: 'Separately discovered by several people on irc',
    sampleRate: 8000,
    formula: 't*(42&t>>10)',
    description: 'orig 12B',
  },
  {
    id: 2,
    title: 't',
    author: 'test',
    sampleRate: 48000,
    formula: 't',
    description: 'orig 1B',
  },
  {
    id: 3,
    title: 'bear @ celephais 1 song',
    author: 'bear @ celephais',
    sampleRate: 8000,
    formula: 't+(t&t^t>>6)-t*(t>>9&(t%16?2:6)&t>>9)',
    description: 'min 37B orig 39B',
  },
  {
    id: 4,
    title: 'Awesome level',
    author: 'SthephanShi',
    sampleRate: 8000,
    formula: 't*(t&16384?6:5)*(3+(3&t>>(t&2048?7:14)))>>(3&t>>9)|t>>2',
    description: 'We can get a cool cartoon-game melody! orig 55B',
  },
  {
    id: 5,
    title: 'Awesome level with slower rhythm',
    author: 'SthephanShi',
    sampleRate: 8000,
    formula: 't*(t&16384?6:5)*(3+(3&t>>(t&2048?7:14)))>>(3&t>>9)|t>>3',
    description: 'orig 55B',
  },
  {
    id: 6,
    title: 'Awesome level #2',
    author: 'SthephanShi',
    sampleRate: 8000,
    formula: 't*(t&16384?6:5)*(5-(3&t>>(t&4096?7:14)))>>(3&t>>9)|t>>3',
    description: 'The next awesome level! orig 55B',
  },
  {
    id: 7,
    title: 'Alien dungeon',
    author: 'SthephanShi',
    sampleRate: 8000,
    formula: 't*(t&16384?7:5)*(3+(3&t>>14))>>(3&t>>9)|t>>6',
    description: 'So sinister.. t>>6 gives a fading effect. orig 44B',
  },
  {
    id: 8,
    title: 'Boss level #6',
    author: 'SthephanShi',
    sampleRate: 8000,
    formula: 't*((t&4096?6:16)+(1&t>>14))>>(3&t>>8)|t>>(t&4096?3:4)',
    description: 'orig 53B',
  },
  {
    id: 9,
    title: 'The time is running out!',
    author: 'SthephanShi',
    sampleRate: 11025,
    formula:
      't*(t&16384?7:5)*(3-(3&t>>9)+(3&t>>8))>>(3&-t>>(t&4096?2:16))|t>>3',
    description: 'Hurry up! orig 65B',
  },
  {
    id: 10,
    title: 'The time is running out!!!',
    author: 'SthephanShi',
    sampleRate: 11025,
    formula:
      't*(2&t>>13?7:5)*(3-(3&t>>9)+(3&t>>8))>>(3&-t>>(t&4096|(t>>11)%32>28?2:16))|t>>3',
    description: 'More complicated drums. min 79B orig 81B',
  },
  {
    id: 11,
    title: 'Neurofunk',
    author: 'SthephanShi',
    sampleRate: 8000,
    formula:
      't*((t&4096?t%65536<59392?7:t&7:16)+(1&t>>14))>>(3&-t>>(t&2048?2:10))|t>>(t&16384?t&4096?10:3:2)',
    description:
      'A modified version of this song is used in the salinewin.exe virus. orig 95B',
  },
  {
    id: 12,
    title: 'Neurofunk - Fist punch version',
    author: 'SthephanShi',
    sampleRate: 8000,
    formula:
      't*((t&4096?t%65536<59392?7:t>>6:16)+(1&t>>14))>>(3&-t>>(t&2048?2:10))|t>>(t&16384?t&4096?4:3:2)',
    description: 'remix of Neurofunk. orig 95B',
  },
  {
    id: 13,
    title: '42 melody with adjustable decay',
    author: 'SthephanShi',
    sampleRate: 8000,
    formula: 't*(42&t>>10)%256*(1-t%2048/3000)',
    description: 'remix of the 42 melody. orig 32B',
  },
  {
    id: 14,
    title: 'minimal sierpinski harmony',
    author: 'viznut',
    sampleRate: 8000,
    formula: 't&t>>8',
    description: 'remix of Sierpinski harmony. orig 6B',
  },
  {
    id: 15,
    title: 'viznut classic',
    author: 'viznut',
    sampleRate: 8000,
    formula: 't*((t>>12|t>>8)&63&t>>4)',
    description: 'min 24B orig 32B',
  },
  {
    id: 16,
    title: 'Sin() isn\'t kosher, people!',
    author: 'viznut',
    sampleRate: 8000,
    formula: '10*(t>>6|t|t>>(t>>16))+(7&t>>11)',
    description: 'min 32B orig 34B',
  },
  {
    id: 17,
    title: 'Combined xpansive\'s and varjohukka\'s stuff',
    author: 'viznut',
    sampleRate: 8000,
    formula: '(t>>7|t|t>>6)*10+4*(t&t>>13|t>>6)',
    description: 'remix of Lost in Space. orig 33B',
  },
  {
    id: 18,
    title: 'Another attempt at melody construction',
    author: 'viznut',
    sampleRate: 8000,
    formula: 't*(3+(1^t>>10&5))*(5+(3&t>>14))>>(t>>8&3)',
    description: 'min 41B orig 45B',
  },
  {
    id: 19,
    title: 'moon scanner generalization',
    author: 'viznut',
    sampleRate: 8000,
    formula: '2*(t>>5&t)-(t>>5)+t*(t>>14&14)',
    description: 'min 30B orig 43B',
  },
  {
    id: 20,
    title: 'Long Sierpinski Harmony',
    author: 'viznut',
    sampleRate: 8000,
    formula: '5*t&t>>7|3*t&t>>10',
    description: 'remix of Sierpinski harmony. min 18B orig 22B',
  },
]
