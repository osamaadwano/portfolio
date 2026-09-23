export const profile = {
  name: 'Osama Adwan',
  title: 'Video Editor · Post-Production',
  location: 'As-Suwayda, Syria',
  phone: '+963 939 651 766',
  email: 'vosamaqiadwan@gmail.com',
  summary:
    'Video Editor with professional experience since 2022 and advanced proficiency in Adobe Premiere Pro. Skilled across the full post-production pipeline — editing, color, sound, motion graphics, and VFX — for advertising, marketing, VSL, news, tourism, and social.',
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Intermediate (B1/B2)' },
  ],
} as const

export type WorkBin = {
  id: string
  label: string
  note: string
  accent: string
  src: string
  /** Optional static poster when video-frame seek fails (e.g. vertical clips). */
  poster?: string
}

export const workBins: WorkBin[] = [
  {
    id: 'reel-01',
    label: 'REEL 01',
    note: 'Showreel cut · pacing & polish',
    accent: '#00f0ff',
    src: 'https://fwupzsjkhgfetqeuiwow.supabase.co/storage/v1/object/public/Osama/reel-01.mp4',
  },
  {
    id: 'study-zone',
    label: 'STUDY ZONE',
    note: 'Educational promo · narrative rhythm',
    accent: '#b8ff3c',
    src: 'https://fwupzsjkhgfetqeuiwow.supabase.co/storage/v1/object/public/Osama/study-zone.mp4',
  },
  {
    id: 'al-madraj',
    label: 'المدرج',
    note: 'Location story · atmosphere & grade',
    accent: '#7b8cff',
    src: 'https://fwupzsjkhgfetqeuiwow.supabase.co/storage/v1/object/public/Osama/al-madraj.mp4',
  },
  {
    id: 'maryam',
    label: 'مريم',
    note: 'Portrait edit · color & sound',
    accent: '#6dff9a',
    src: 'https://fwupzsjkhgfetqeuiwow.supabase.co/storage/v1/object/public/Osama/maryam.mp4',
    poster: 'projects/thumbs/maryam.jpg',
  },
  {
    id: 'apeex',
    label: 'APEEX',
    note: 'Brand / product spot',
    accent: '#e8c547',
    src: 'https://fwupzsjkhgfetqeuiwow.supabase.co/storage/v1/object/public/Osama/apeex.mp4',
    poster: 'projects/thumbs/apeex.jpg',
  },
  {
    id: 'harry-potter',
    label: 'HARRY POTTER',
    note: 'Fan edit · motion & cut',
    accent: '#5ad0c8',
    src: 'https://fwupzsjkhgfetqeuiwow.supabase.co/storage/v1/object/public/Osama/harry-potter.mp4',
  },
  {
    id: 'one-piece',
    label: 'ONE PIECE',
    note: 'Fan edit · energy & timing',
    accent: '#8ab4ff',
    src: 'https://fwupzsjkhgfetqeuiwow.supabase.co/storage/v1/object/public/Osama/one-piece.mp4',
  },
]


export type ExperienceClip = {
  id: string
  role: string
  org: string
  period: string
  track: 'V1' | 'V2' | 'A1'
  bullets: string[]
  width: string
}

export const experience: ExperienceClip[] = [
  {
    id: 'sara',
    role: 'Video Editor',
    org: 'Sara Group — Tourism & Travel',
    period: 'Nov 2025 – Present',
    track: 'V1',
    width: '28%',
    bullets: [
      'Edit tourism content into engaging visual narratives.',
      'Pacing, color, and sound tailored to travel promo.',
    ],
  },
  {
    id: 'news',
    role: 'News Media Video Editor',
    org: 'News Media Organization',
    period: 'Sep 2024 – Oct 2026',
    track: 'V1',
    width: '42%',
    bullets: [
      'Average 2–3 news videos per day under tight deadlines.',
      'Broadcast-consistent pacing, sound, and graphics.',
    ],
  },
  {
    id: 'freelance',
    role: 'Freelance Video Editor',
    org: 'Self-Employed · Remote',
    period: '2022 – Present',
    track: 'V2',
    width: '72%',
    bullets: [
      '50+ projects across marketing, ads, VSL, and social.',
      '10–15 recurring retainer clients; on-time delivery.',
      'Full pipeline: cut, grade, sound, motion, finish.',
    ],
  },
  {
    id: 'vsl',
    role: 'Freelance VSL Video Editor',
    org: 'U.S.-based Company · Remote',
    period: 'Contract',
    track: 'A1',
    width: '36%',
    bullets: [
      'VSL content with direct-response editing techniques.',
    ],
  },
]

export type SkillScope = {
  id: string
  label: string
  group: string
}

export const skills: SkillScope[] = [
  { id: 'pr', label: 'Premiere Pro', group: 'Software' },
  { id: 'ae', label: 'After Effects', group: 'Software' },
  { id: 'ps', label: 'Photoshop', group: 'Software' },
  { id: 'capcut', label: 'CapCut', group: 'Software' },
  { id: 'canva', label: 'Canva', group: 'Software' },
  { id: 'narrative', label: 'Narrative structure', group: 'Editing' },
  { id: 'story', label: 'Visual storytelling', group: 'Editing' },
  { id: 'pace', label: 'Pacing & rhythm', group: 'Editing' },
  { id: 'footage', label: 'Footage selection', group: 'Editing' },
  { id: 'project', label: 'Story-driven editing', group: 'Editing' },
  { id: 'correction', label: 'Color correction', group: 'Color' },
  { id: 'grade', label: 'Color grading', group: 'Color' },
  { id: 'treatment', label: 'Visual consistency', group: 'Color' },
  { id: 'sound', label: 'Sound design & effects', group: 'Sound' },
  { id: 'music', label: 'Music integration', group: 'Sound' },
  { id: 'sync', label: 'Audio synchronization', group: 'Sound' },
  { id: 'mograph', label: 'Motion graphics', group: 'Motion & VFX' },
  { id: 'comp', label: 'Compositing', group: 'Motion & VFX' },
  { id: 'key', label: 'Chroma key / green screen', group: 'Motion & VFX' },
  { id: 'vfx', label: 'Visual effects', group: 'Motion & VFX' },
  { id: 'ads', label: 'Advertising', group: 'Industries' },
  { id: 'marketing', label: 'Marketing', group: 'Industries' },
  { id: 'vsl', label: 'VSL / Direct Response', group: 'Industries' },
  { id: 'news', label: 'News & Media', group: 'Industries' },
  { id: 'tourism', label: 'Tourism & Travel', group: 'Industries' },
  { id: 'social', label: 'Social Media', group: 'Industries' },
]
