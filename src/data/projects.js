// Grouped by `date` on /work, newest first: the start month for WIP projects (`status`), the
// finish month for finished ones. Projects with an `image` get a large screenshot frame.
export const CATEGORIES = ['All', 'AI & ML', 'Web', 'Games', 'Hardware', 'Research'];

export const PROJECTS = [
  {
    id: 'owi',
    date: '2026-09',
    title: 'OWI',
    period: 'Sep 2026 — Present',
    status: 'In progress',
    image: '/projects/owi.png',
    categories: ['AI & ML', 'Web'],
    description:
      'Reads the comment section under a social media post and reports which way it leans — and whether that lean grew on its own or was driven by buzzers. It looks for coordination, not a lopsided score, and says so when it cannot read enough to judge.',
    tags: ['TypeScript', 'React', 'Express', 'Data Scraping'],
    links: [
      { label: 'Live demo', url: 'https://owi-tau.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/phuuun/owi' },
    ],
  },
  {
    id: 'superhoop',
    date: '2026-09',
    title: 'SuperHoop',
    period: 'Sep 2026 — Present',
    status: 'In progress',
    image: '/projects/superhoop.png',
    categories: ['Hardware'],
    description:
      'The Timezone basketball arcade machine, rebuilt small. A projector sets the scene, you shoot a mini ball at a mini hoop, and an Arduino with an ultrasonic sensor decides whether it went in.',
    tags: ['Arduino', 'Embedded Systems', 'Sensors'],
    links: [{ label: 'GitHub', url: 'https://github.com/MakiKainan/superhoop' }],
  },
  {
    id: 'notredstone2d',
    date: '2026-06',
    title: 'NotRedstone2D',
    period: 'Jun 2026 — Present',
    status: 'In progress',
    image: '/projects/notredstone2d.png',
    categories: ['Games'],
    description:
      'Minecraft-inspired redstone on a 2D grid — levers, dust, lamps and repeaters wired into working logic circuits.',
    tags: ['Godot', 'GDScript', 'Simulation'],
    links: [{ label: 'GitHub', url: 'https://github.com/phuuun/NotRedstone2D' }],
  },
  {
    id: 'glitchmare',
    date: '2026-08',
    title: 'Glitchmare',
    period: 'Aug 2026 — Present',
    status: 'In progress',
    categories: ['Games'],
    description: 'A 2D pixel-art game in Unity with custom sprites, animations, scenes and audio.',
    tags: ['Unity', 'C#', 'Pixel Art'],
    links: [{ label: 'GitHub', url: 'https://github.com/phuuun/Glitchmare' }],
  },
  {
    id: 'kratt',
    date: '2026-08',
    title: 'Kratt',
    image: '/projects/kratt.jpg',
    period: 'Jul — Aug 2026',
    note: 'UNESCO Youth Hackathon 2026',
    categories: ['AI & ML', 'Web'],
    description:
      'Paste a YouTube link and Kratt estimates how much of the comment section is bot activity, split into ads & spam, copy-paste, low-effort filler and genuine — so the score comes with a reason, not just a number.',
    tags: ['Machine Learning', 'Deep Learning', 'Cloud Run'],
    links: [
      { label: 'Live demo', url: 'https://kratt-5433f.web.app' },
      { label: 'GitHub', url: 'https://github.com/MakiKainan/kratt-cloud-run-' },
    ],
  },
  {
    id: 'nba',
    date: '2026-07',
    title: 'NBA Rookie Career Longevity',
    image: '/projects/nba.jpg',
    video: '/projects/nba.mp4',
    period: 'May — Jul 2026',
    categories: ['AI & ML'],
    description:
      'Scouting reports and gut feel are a poor predictor of who lasts. A classifier trained on rookie-season stats estimates the probability a player sustains a career of five years or more.',
    tags: ['Python', 'Classical ML', 'Classification'],
    links: [
      { label: 'Live demo', url: 'https://predicting-nba-rookie-career-longev.vercel.app' },
      {
        label: 'GitHub',
        url: 'https://github.com/MakiKainan/Predicting-NBA-Rookie-Career-Longevity-Using-Classical-Machine-Learning-Method',
      },
    ],
  },
  {
    id: 'bone-fracture',
    date: '2026-07',
    title: 'Bone Fracture Detection',
    image: '/projects/bone-fracture.jpg',
    video: '/projects/bone-fracture.mp4',
    period: 'Feb — Jul 2026',
    categories: ['AI & ML'],
    description:
      'Detects bone fractures in X-ray images in real time with classical computer vision instead of deep learning — computationally light, accurate, and easy to interpret.',
    tags: ['Computer Vision', 'Python', 'Streamlit'],
    links: [{ label: 'Live demo', url: 'https://bone-fracture-detection4.streamlit.app' }],
  },
  {
    id: 'beenet',
    date: '2026-07',
    title: 'BeeNET',
    period: 'Feb — Jul 2026',
    categories: ['Web'],
    description: 'A sports-based networking app for Binusians — find people to play with.',
    tags: ['TypeScript', 'React', 'Gemini API'],
    links: [
      { label: 'Live demo', url: 'https://bee-net.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/MakiKainan/BeeNET' },
    ],
  },
  {
    id: 'saysomething',
    date: '2026-06',
    title: 'SaySomething',
    image: '/projects/saysomething.jpg',
    video: '/projects/saysomething.mp4',
    period: 'Feb — Jun 2026',
    categories: ['AI & ML', 'Web'],
    description:
      'Toxic comment classifier with live inference across four architectures — TF-IDF, LSTM, BERT and fine-tuned RoBERTa — so you can compare how each behaves on the same text. Trained on Jigsaw across six labels.',
    tags: ['NLP', 'RoBERTa', 'LSTM', 'TF-IDF'],
    links: [
      { label: 'Live demo', url: 'https://say-something-tan.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/MakiKainan/SaySomething' },
    ],
  },
  {
    id: 'c-vs-python',
    date: '2026-06',
    title: 'C vs Python Study',
    image: '/projects/c-vs-python.jpg',
    video: '/projects/c-vs-python.mp4',
    period: 'Feb — Jun 2026',
    categories: ['Research'],
    description:
      'A controlled study comparing C and Python on execution speed and development time, with 20 participant groups solving the same problems in both languages.',
    tags: ['C', 'Python', 'Jupyter', 'Statistics'],
    links: [
      { label: 'Paper', url: '/projects/c-vs-python-paper.pdf' },
      { label: 'GitHub', url: 'https://github.com/phuuun/C-vs-Python-Study' },
    ],
  },
  {
    id: 'ihsg-roguelite',
    date: '2026-02',
    title: 'IHSG Roguelite',
    period: 'Feb 2026 — Present',
    status: 'In progress',
    categories: ['Games'],
    description:
      'A stock-market roguelite themed on the Indonesian stock index — sectors, market events, inflation and diversification cards across a run of years.',
    tags: ['Java', 'OOP', 'Game Design'],
    links: [{ label: 'GitHub', url: 'https://github.com/phuuun/ihsgRoguelite' }],
  },
  {
    id: 'skibidifinder',
    date: '2025-06',
    title: 'SkibidiFinder',
    period: 'Feb — Jun 2025',
    note: 'HCI coursework',
    categories: ['Web'],
    description: 'Finds empty toilet stalls to cut restroom crowding.',
    tags: ['HTML', 'CSS', 'JavaScript', 'HCI'],
    links: [
      { label: 'Live demo', url: 'https://skibidifinder.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/phuuun/skibidifinder' },
    ],
  },
];
