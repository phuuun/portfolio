// Grouped by `date` on /work, newest first: the start month for WIP projects (`status`), the
// finish month for finished ones. Projects with a `video` or `image` get a large frame.
export const CATEGORIES = ['All', 'AI & ML', 'Web', 'Games', 'Mobile', 'Hardware', 'Research'];

export const PROJECTS = [
  {
    id: 'fotoin',
    date: '2026-10',
    title: 'FOTOIN',
    video: '/projects/fotoin.mp4',
    period: 'Sep — Oct 2026',
    note: 'Venture Creation coursework',
    categories: ['AI & ML', 'Web'],
    description:
      'Product photos for Indonesian small sellers, straight from their phone. Send a plain snapshot and get back styled shots sized exactly for Shopee, Tokopedia, TikTok Shop and Instagram, with a human reviewer checking every photo before it goes out over WhatsApp. It\'s a pilot. The whole order flow works end to end, from upload and QRIS payment to the review queue and delivery messages. But image generation and payment are still stand-ins, and WhatsApp sending is off by default. I redesigned the web app (home page, order flow, a how-it-works page), and I\'m taking on the backend next, starting with hooking up a paid image-generation API.',
    tags: ['React', 'Express', 'Gemini API', 'Image Processing'],
    links: [{ label: 'GitHub', url: 'https://github.com/gretil3/fotoin' }],
  },
  {
    id: 'owi',
    date: '2026-09',
    title: 'OWI',
    period: 'Sep 2026 — Present',
    status: 'In progress',
    video: '/projects/owi.mp4',
    categories: ['AI & ML', 'Web'],
    description:
      'Will read the comment section under a social media post and report which way it leans, and whether that lean grew on its own or was pushed by buzzers. It looks for coordination, not a lopsided score. It\'s early days: the interface is built and the live demo answers from five sample cases, and we\'ve scraped our first few thousand comments. No model has been trained yet.',
    tags: ['TypeScript', 'React', 'Express', 'Data Scraping'],
    links: [
      { label: 'Live demo', url: 'https://owi-tau.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/phuuun/owi' },
    ],
  },
  {
    id: 'beenoise',
    date: '2026-10',
    title: 'BeeNoise',
    period: 'Sep — Oct 2026',
    video: '/projects/beenoise.mp4',
    note: 'Speech Recognition coursework',
    categories: ['AI & ML'],
    description:
      'Give it a noisy vlog, lecture or group conversation and it returns denoised audio plus timestamped subtitles with a speaker name on every line — enrolled people by name, everyone else as Speaker 1, Speaker 2. It runs locally for now, and a public demo is planned.',
    tags: ['Python', 'Whisper', 'pyannote', 'DeepFilterNet'],
    links: [{ label: 'GitHub', url: 'https://github.com/gretil3/BeeNoise' }],
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
      'The Timezone basketball arcade machine, rebuilt small. A projector throws the scoreboard, timer and backboard onto the wall around a mini hoop, and an Arduino with an ultrasonic sensor will count the baskets. The projected game works, with a key press standing in for the sensor, but the Arduino isn\'t hooked up yet.',
    tags: ['React', 'Arduino', 'Web Serial API', 'Embedded Systems'],
    links: [{ label: 'GitHub', url: 'https://github.com/MakiKainan/superhoop' }],
  },
  {
    id: 'tsundoku',
    date: '2026-09',
    title: 'Tsundoku',
    video: '/projects/tsundoku.mp4',
    period: 'Sep 2026',
    categories: ['Mobile'],
    description:
      'A personal library for the books you own, the ones you have read, and the pile you still mean to get to. Scan a barcode to add a book, then log finish dates, ratings, reviews and rereads — with import from Goodreads and StoryGraph.',
    tags: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Android', 'Open Library API'],
    links: [
      { label: 'Download', url: 'https://github.com/phuuun/Tsundoku/releases' },
      { label: 'GitHub', url: 'https://github.com/phuuun/Tsundoku' },
    ],
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
      'Minecraft redstone on a flat 2D grid. Place levers, wire, lamps and repeaters, drag to draw wire, and flip a lever to watch the signal travel. Like the real thing, the signal starts at 15 and loses 1 per tile of wire, and repeaters boost it back to full in one direction. There are no torches yet, so you can\'t build logic gates like NOT and AND.',
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
    description:
      'A 2D pixel-art platformer where you collect puzzle pieces to beat the ghosts. I wrote all the code in Unity, and two friends did the art and level design. The Unity build is shelved and I am remaking the whole thing in Godot.',
    tags: ['Unity', 'C#', 'Godot', 'Pixel Art'],
    links: [{ label: 'GitHub', url: 'https://github.com/phuuun/Glitchmare' }],
  },
  {
    id: 'kratt',
    date: '2026-08',
    title: 'Kratt',
    video: '/projects/kratt.mp4',
    period: 'Jul — Aug 2026',
    note: 'UNESCO Youth Hackathon 2026',
    categories: ['AI & ML', 'Web'],
    description:
      'A media-literacy tool. Paste a YouTube link and Kratt estimates how much of the comment section is bot activity, split into ads & spam, copy-paste, low-effort filler and genuine. It shows the flagged comments as evidence, and it asks for your guess first so you learn to spot bots yourself. My part was the data: I scraped the YouTube comments the BERT model was trained on, and helped on the backend.',
    tags: ['Data Scraping', 'YouTube Data API', 'BERT', 'FastAPI'],
    links: [
      { label: 'Live demo', url: 'https://kratt-5433f.web.app' },
      { label: 'GitHub', url: 'https://github.com/gretil3/kratt' },
    ],
  },
  {
    id: 'bone-fracture',
    date: '2026-07',
    title: 'Bone Fracture Detection',
    video: '/projects/bone-fracture.mp4',
    period: 'Feb — Jul 2026',
    categories: ['AI & ML'],
    description:
      'Flags fractures in X-rays without deep learning. I built the backend: a classical computer vision pipeline (contrast boost, denoising, Sobel and Canny edges, Hough lines, watershed segmentation) that turns each X-ray into 42 hand-picked features. I then compared SVM, Random Forest and Gradient Boosting on those features, and Random Forest won. In the app you can step through every stage to see what the model saw, and set the fracture threshold yourself.',
    tags: ['Computer Vision', 'OpenCV', 'scikit-learn', 'Streamlit'],
    links: [
      { label: 'Live demo', url: 'https://bone-fracture-detection4.streamlit.app' },
      { label: 'GitHub', url: 'https://github.com/geraldadli/bone_fracture' },
    ],
  },
  {
    id: 'beenet',
    date: '2026-07',
    title: 'BeeNET',
    video: '/projects/beenet.mp4',
    period: 'Feb — Jul 2026',
    categories: ['Web'],
    description:
      'A campus sports hub for Binus students. Start or join pick-up matches, book courts across the Binus campuses, and swap tips on an upvoted forum, with separate student, moderator and admin roles. The live site is a front-end demo. It started on a PocketBase backend, but now each visitor gets their own sandbox saved in the browser, seeded with demo data.',
    tags: ['TypeScript', 'React', 'Tailwind CSS'],
    links: [
      { label: 'Live demo', url: 'https://bee-net.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/MakiKainan/BeeNET' },
    ],
  },
  {
    id: 'saysomething',
    date: '2026-06',
    title: 'SaySomething',
    video: '/projects/saysomething.mp4',
    period: 'Feb — Jun 2026',
    categories: ['AI & ML', 'Web'],
    description:
      'A toxic comment classifier. Type a comment and four models I trained on Jigsaw score it across six labels, side by side: TF-IDF, an LSTM, DistilBERT and a fine-tuned RoBERTa. You see where each one breaks, like TF-IDF missing negation or the LSTM never flagging threats. All four run in your browser, with no backend. One ~240 MB download caches the models, and your text never leaves the page.',
    tags: ['NLP', 'RoBERTa', 'ONNX Runtime Web', 'TypeScript'],
    links: [
      { label: 'Live demo', url: 'https://say-something-tan.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/MakiKainan/SaySomething' },
    ],
  },
  {
    id: 'c-vs-python',
    date: '2026-06',
    title: 'C vs Python Study',
    video: '/projects/c-vs-python.mp4',
    period: 'Feb — Jun 2026',
    note: 'Research Methodology coursework',
    categories: ['Research'],
    description:
      'A controlled experiment run by my research group. 20 student volunteers solved the same nine problems in both C and Python, and we measured how long each solution took to write and how fast it ran. In Python, writing took 1.6× less time and 56% fewer lines. C ran a large matrix transpose 31× faster. Python won the sorting benchmark, but only because most volunteers hand-wrote bubble sort in C and used the built-in sort in Python.',
    tags: ['C', 'Python', 'Jupyter', 'Statistics'],
    links: [
      { label: 'Paper', url: '/projects/c-vs-python-paper.pdf' },
      { label: 'GitHub', url: 'https://github.com/phuuun/C-vs-Python-Study' },
    ],
  },
  {
    id: 'skibidifinder',
    date: '2025-06',
    title: 'SkibidiFinder',
    video: '/projects/skibidifinder.mp4',
    period: 'Feb — Jun 2025',
    note: 'HCI coursework',
    categories: ['Web'],
    description:
      'A clickable prototype of a restroom-finder app, and where I learned HTML and CSS. It walks through the whole flow: a list of nearby toilets with ratings, busy hours and reviews, a review form, and points you trade for vouchers. It is a UI/UX mock, not a working service. The toilets are hard-coded, the map is a static image, and there is no backend.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    links: [
      { label: 'Live demo', url: 'https://skibidifinder.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/phuuun/skibidifinder' },
    ],
  },
];
