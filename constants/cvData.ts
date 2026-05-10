/**
 * Sourced from Muhammad Ramzan — React Native Developer CV.
 * Update links or wording anytime.
 */
export type Project = {
  id: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  body: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  status?: 'live' | 'wip' | 'internal';
};

export const profile = {
  name: 'Muhammad Ramzan',
  title: 'React Native Developer',
  tagline:
    'Results-driven React Native developer with ~2.5 years shipping scalable mobile apps — UI/UX focus, performance, APIs, IAP, push, and store releases. Strong Node.js exposure (~8 months) for APIs and integrations.',
  location: 'Lahore, Pakistan',
  email: 'programmer1zero1@gmail.com',
  phone: '+92-3136212143',
  github: 'https://github.com/programmer1zero1',
  links: [
    {label: 'GitHub', url: 'https://github.com/programmer1zero1'},
  ],
};

export const profileBullets = [
  'Strong focus on UI/UX, performance, and real-world integrations.',
  'Backend knowledge with Node.js — hands-on API development and integrations.',
  'Primary expertise: efficient, user-friendly mobile applications.',
];

export const experience = [
  {
    id: '1',
    company: 'TX Dynamics',
    role: 'React Native Developer',
    period: 'May 2023 – Present',
    location: 'Lahore, Pakistan',
    points: [
      'Developed and maintained production-level mobile applications.',
      'Integrated APIs, payments, real-time systems, and media handling.',
      'Implemented In-App Purchases, push notifications, deep linking.',
      'Managed App Store and Play Store deployments.',
      'Optimized performance and improved user experience.',
      'Contributed to backend logic (Node.js) when required.',
    ],
  },
  {
    id: '2',
    company: 'PNY Trainings',
    role: 'MERN Stack Developer',
    period: 'Oct 2022 – Jan 2023',
    location: 'Lahore, Pakistan',
    points: [
      'Developed full-stack applications using the MERN stack.',
      'Built REST APIs and authentication systems.',
    ],
  },
  {
    id: '3',
    company: 'Lahore Leads University',
    role: 'Web Development Intern',
    period: 'Feb 2022 – May 2022',
    location: 'Lahore, Pakistan',
    points: [
      'Developed responsive UI and assisted with backend integrations.',
    ],
  },
];

export const technicalSkills = [
  'React Native',
  'Expo',
  'EAS',
  'React Navigation',
  'Expo Router',
  'React.js',
  'Redux Toolkit',
  'React Query',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Realm',
  'REST APIs',
  'GraphQL (Basic)',
  'Firebase',
  'Socket.IO',
  'WebSockets',
  'Git',
  'GitHub Actions',
  'CI/CD',
  'Cursor AI',
  'Javascript',
  'CSS',
  'HTML',
];

export const expertise = [
  'Mobile App Development',
  'Frontend UI/UX Development',
  'App Deployment (iOS & Android)',
  'Performance Optimization',
  'Real-Time Systems',
  'Payment Integration',
  'In-App Purchases',
  'Push Notifications',
  'Media Handling',
  'Location Services',
  'Authentication Systems',
  'Deep Linking',
  'OTA Updates',
  'HIPAA-Compliant Development',
  'Offline-First Applications',
];

export const languages = [
  {name: 'English', dots: 5},
  {name: 'Urdu', dots: 5},
  {name: 'Punjabi', dots: 5},
];

export const strengths = [
  'Problem Solving',
  'Consistency',
  'Team Collaboration',
  'Adaptability',
];

export const dayInLife: {label: string; pct: number}[] = [
  {label: 'Sleeping & rest / personal time', pct: 35},
  {label: 'Coding & mobile app development', pct: 35},
  {label: 'Learning new technologies & AI tools', pct: 10},
  {label: 'Backend & Node.js integrations', pct: 10},
  {label: 'Team collaboration & meetings', pct: 10},
];

export const education = [
  {
    id: 'e1',
    school: 'University of Agriculture, Faisalabad',
    degree: 'BS Computer Science',
    period: '2018 – 2022',
    note: 'Final Year Project: Online Medical Store (Full Stack)',
  },
  {
    id: 'e2',
    school: 'University of Agriculture, Faisalabad',
    degree: 'B.Ed (Home Economics)',
    period: '2022 – 2022',
  },
];

export const projects: Project[] = [
  {
    id: 'ticket-central',
    title: 'Ticket Central App',
    summary: 'Event booking and ticket management application.',
    role: 'React Native',
    stack: ['React Native', 'Deploy', 'Stores'],
    body: 'Production app with booking flows and ticket management — shipped on App Store and Play Store.',
    appStoreUrl: 'https://apps.apple.com/us/app/ticketcentral/id6477536780',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.ticketcentralapp',
    status: 'live',
  },
  {
    id: 'bus-connect',
    title: 'BusConnect App',
    summary: 'Smart transport and parking solution with real-time features.',
    role: 'React Native',
    stack: ['React Native', 'Real-time', 'Maps'],
    body: 'Transport-focused product with live updates and parking-oriented UX.',
    appStoreUrl: 'https://apps.apple.com/us/app/bus-connect-app/id6502083416',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.busconnect',
    status: 'live',
  },
  {
    id: 'face-yoga',
    title: 'FaceYoga TG App',
    summary: 'Wellness app with subscriptions and multi-language support.',
    role: 'React Native',
    stack: ['Expo', 'IAP', 'i18n'],
    body: 'Subscription wellness experience with localization and store compliance.',
    appStoreUrl: 'https://apps.apple.com/us/app/face-yoga-tg/id6504173004',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.faceyoga',
    status: 'live',
  },
  {
    id: 'scripid',
    title: 'ScripId App',
    summary:
      'Healthcare ecosystem: pharmacies, riders, and users — HIPAA-aware workflows.',
    role: 'React Native (prior team)',
    stack: ['React Native', 'Node', 'Media', 'Compliance'],
    body: 'Connected pharmacies, riders, and users with real-time workflows, media uploads, and HIPAA-compliant handling of sensitive data. (Shifted to other team.)',
    status: 'internal',
  },
  {
    id: 'sfi-task',
    title: 'SFI Task Management System',
    summary: 'Org task management — not published.',
    role: 'Full-stack',
    stack: ['React Native', 'Node', 'REST'],
    body: 'Admin assigns tasks; employees complete and inspect workflows. Contributed to frontend and backend APIs.',
    status: 'internal',
  },
  {
    id: 'pip',
    title: 'Passive Income Partnership App',
    summary: 'Partnership-based passive income platform — in progress.',
    role: 'React Native + Node',
    stack: ['Expo', 'Node.js', 'Real-time', 'APIs'],
    body: 'Building APIs and business logic with Node.js, frontend integration, and real-time data flows for scalable structure.',
    status: 'wip',
  },
  {
    id: 'fit-my-feet',
    title: 'Fit My Feet',
    summary: 'Foot capture → 3D GLB/STL for preview and printing.',
    role: 'React Native',
    stack: ['Camera', '3D', 'GLB', 'STL'],
    body: 'Mobile capture and processing for 3D preview (GLB) and print-ready STL generation. Integration in progress.',
    status: 'wip',
  },
];

export const additionalUiProjects = [
  'INME',
  'Review Cut',
  'Talk Tango',
  'MY Insurance Bag',
  'One Up IQ',
  'Vibe Up',
  'Raha',
  'Mindcare',
  'Fit My Feet (integration in progress)',
];

export const internshipProject = {
  title: 'E-commerce Store (MERN Stack)',
  description:
    'Full-stack platform with authentication, payments, and CRUD operations.',
};

export const skills = {
  mobile: ['React Native', 'Expo', 'EAS', 'React Navigation', 'Expo Router'],
  web: ['React.js', 'Redux Toolkit', 'React Query', 'HTML', 'CSS', 'JavaScript'],
  backend: ['Node.js', 'Express.js', 'REST', 'MongoDB', 'Firebase', 'Socket.IO'],
  other: ['Git', 'CI/CD', 'GitHub Actions', 'Realm', 'GraphQL (Basic)', 'Cursor AI'],
};
