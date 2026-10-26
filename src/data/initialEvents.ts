import { CampusEvent } from '../types';

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-pcu-anantam-2026',
    title: 'ANANTAM 2026 – PCU Flagship Annual Cultural Extravaganza',
    category: 'arts',
    categoryLabel: 'Cultural & Arts',
    description: 'PCU’s premier multi-day fest featuring celebrity concerts, battle of the bands, classical fusion dance, fashion walk, and e-gaming arena.',
    longDescription: 'ANANTAM is the crown jewel of student life at Pimpri Chinchwad University (PCU), Pune. Organized by the PCU Central Cultural Club under the aegis of the Pimpri Chinchwad Education Trust (PCET), this 3-day mega cultural carnival unites over 4,500 students from PCU and leading colleges across Maharashtra. Highlights include the Bollywood & EDM Pro-Night, Western & Classical Group Dance, Rangoli & Mandala Art galleries, and the Inter-Collegiate Fashion Trophy.',
    organizer: {
      name: 'Prof. Aniket Joshi & Cultural Council',
      clubOrDept: 'PCU Central Cultural Club & Student Affairs',
      contactEmail: 'cultural@pcu.edu.in'
    },
    date: '2026-11-12',
    displayDate: 'Thursday, Nov 12 – Saturday, Nov 14, 2026',
    time: '5:00 PM – 10:30 PM (Daily)',
    venue: 'PCU Central Amphitheatre & Festival Grounds',
    room: 'Main Stage Arena & Lawns',
    campusZone: 'Sate-Maval Main Campus',
    format: 'In-Person',
    capacity: 3500,
    registeredCount: 3120,
    image: '/images/event_quad_festival_1793000614111.jpg',
    tags: ['ANANTAM', 'Pro-Night Concert', 'Fashion Walk', 'Dance Trophy', 'PCU Pune Fest'],
    featured: true,
    passes: [
      {
        id: 'tier-anantam-student',
        name: 'PCU Student All-Day Access Pass',
        price: 0,
        description: 'Full 3-day admission to all cultural competitions, food streets, and main stage celebrity concerts.',
        remaining: 260,
        total: 3000
      },
      {
        id: 'tier-anantam-guest',
        name: 'PCU Student + 1 External Guest Pass',
        price: 0,
        description: 'Grants entry for PCU student with one registered friend or sibling from another institution.',
        remaining: 120,
        total: 500
      }
    ],
    speakers: [
      {
        name: 'Amit Trivedi & Collective',
        role: 'Headlining Celebrity Artist',
        organization: 'Pro-Night Guest Performance'
      },
      {
        name: 'Dr. Girish Desai',
        role: 'Director, Student Life & Outreach',
        organization: 'Pimpri Chinchwad Education Trust (PCET)'
      }
    ],
    perks: ['Complimentary ANANTAM 2026 official wristband & lanyard', 'Access to 24 diverse multi-cuisine food stalls', 'Entry to e-sports LAN gaming tournament arena'],
    scheduleHighlights: [
      { time: '05:00 PM Thu', title: 'Grand Inauguration & Dhol Tasha Procession', description: 'Traditional welcome and lighting of the lamp by PCU Dignitaries' },
      { time: '07:30 PM Fri', title: 'Symphony & Inter-School Battle of Bands', description: 'Live rock and fusion band showdown at Central Amphitheatre' },
      { time: '08:00 PM Sat', title: 'Celebrity Concert & Star DJ Pro-Night', description: 'Live musical showcase followed by laser and pyrotechnic finale' }
    ],
    prerequisites: ['Mandatory PCU Student ID card with PRN at gate scanners', 'Outside colors or hazardous materials strictly prohibited', 'Entry turnstiles close at 7:30 PM for security check']
  },
  {
    id: 'evt-pcu-ideathon-2026',
    title: 'PCU National Ideathon & 36-Hour Hackathon 2026',
    category: 'tech',
    categoryLabel: 'Tech & Engineering',
    description: 'Build real-world AI, robotics, and smart mobility solutions at PCU’s state-of-the-art incubation and maker labs.',
    longDescription: 'Hosted by the School of Engineering & Technology (SoET) in partnership with the PCU IEEE Student Branch and the Dr. P.A. Inamdar Innovation & Incubation Center. Students tackle pressing national engineering themes: Electric Mobility & Battery Analytics, Smart Industrial IoT for Pune Auto Hubs, and Generative AI for Vernacular Education. Includes mentor hours with tech leaders from Pune Hinjawadi and Talawade IT parks.',
    organizer: {
      name: 'Dr. Sudarshan Patil & IEEE Chapter',
      clubOrDept: 'School of Engineering & Technology (SoET)',
      contactEmail: 'hackathon@pcu.edu.in'
    },
    date: '2026-10-31',
    displayDate: 'Saturday, Oct 31 – Sunday, Nov 1, 2026',
    time: '8:30 AM Sat – 6:00 PM Sun (36 Hours)',
    venue: 'PCU Innovation & Incubation Center',
    room: 'Atrium Labs & HPC Computing Center (Level 2)',
    campusZone: 'Engineering & Tech Complex',
    format: 'In-Person',
    capacity: 400,
    registeredCount: 358,
    image: '/images/event_hackathon_1793000613790.jpg',
    tags: ['Hackathon', 'AI & Robotics', 'Pune Tech', 'Cash Prizes ₹2,50,000', 'SoET PCU'],
    featured: true,
    passes: [
      {
        id: 'tier-hack-hacker',
        name: 'Hacker Team Pass (Includes Lab Bench & Kit)',
        price: 0,
        description: 'Complete 36-hr hacking bench, hardware sensor starter pack, high-speed WiFi, and 5 meals.',
        remaining: 32,
        total: 350
      },
      {
        id: 'tier-hack-hardware',
        name: 'IoT & Robotics Lab Track Pass',
        price: 0,
        description: 'Includes reserved 3D printer and soldering station access for physical prototyping.',
        remaining: 10,
        total: 50
      }
    ],
    speakers: [
      {
        name: 'Dr. Rajiv Shinde',
        role: 'Dean, School of Engineering & Technology',
        organization: 'Pimpri Chinchwad University'
      },
      {
        name: 'Pooja Kulkarni',
        role: 'Head of Automotive Embedded Systems',
        organization: 'Tata Technologies Pune'
      }
    ],
    perks: ['Cash prize pool of ₹2,50,000 + PCU Seed Incubation Grants', 'Catered Maharashtrian meals, midnight pizza & Red Bull station', 'Direct interview shortlists with Pune tech recruiters'],
    scheduleHighlights: [
      { time: '08:30 AM Sat', title: 'Check-in & Kit Distribution', description: 'PRN verification, badge issuance, and lab workstation allocation' },
      { time: '11:00 AM Sat', title: 'Problem Statements Release & Sprint Kick-off', description: 'Automotive IoT, AgriTech, and Generative AI problem tracks' },
      { time: '03:00 PM Sun', title: 'Grand Jury Pitches & Winner Felicitation', description: 'Demonstrations before venture capital and corporate judges' }
    ],
    prerequisites: ['Valid PCU Student PRN or approved collegiate delegate pass', 'Personal laptop and extension board required', 'Teams of 2 to 4 members']
  },
  {
    id: 'evt-pcu-navyom-2026',
    title: 'NAVYOM 2026 – Annual Corporate Conclave & Management Fest',
    category: 'career',
    categoryLabel: 'Management & Leadership',
    description: 'Pune Management School’s flagship management summit with CXO panels, B-plan pitches, and corporate interview simulations.',
    longDescription: 'NAVYOM is the premier business and leadership festival curated by the Pune Management School (PMS) at Pimpri Chinchwad University. The 2026 edition, themed "Navigating India’s Industrial Century", invites CXOs from leading multinational corporations across Pune, Mumbai, and Bengaluru. Features the PCU Shark Tank Venture Pitch, Best Manager Championship, and live case study competitions.',
    organizer: {
      name: 'Prof. Meenakshi Sundaram',
      clubOrDept: 'Pune Management School (PMS)',
      contactEmail: 'navyom@pcu.edu.in'
    },
    date: '2026-11-06',
    displayDate: 'Friday, Nov 6, 2026',
    time: '9:30 AM – 5:30 PM',
    venue: 'PCU Executive Management Auditorium',
    room: 'Hall A & Case Study Suites',
    campusZone: 'Management Block',
    format: 'In-Person',
    capacity: 600,
    registeredCount: 524,
    image: '/images/event_career_fair_1793000614416.jpg',
    tags: ['NAVYOM', 'MBA / BBA', 'Corporate Leaders', 'B-Plan Pitch', 'Networking'],
    featured: false,
    passes: [
      {
        id: 'tier-nav-delegate',
        name: 'Student Delegate Pass',
        price: 0,
        description: 'Access to all keynote panels, networking luncheon, and corporate case competition.',
        remaining: 62,
        total: 500
      },
      {
        id: 'tier-nav-pitch',
        name: 'PCU Shark Tank Pitch Team Pass',
        price: 0,
        description: 'For student startup teams pitching to angel investors and incubation directors.',
        remaining: 14,
        total: 100
      }
    ],
    speakers: [
      {
        name: 'Harsh Vardhan Goel',
        role: 'Managing Director, Supply Chain Tech',
        organization: 'Bharat Forge Pune'
      },
      {
        name: 'Sunita Deshpande',
        role: 'VP Human Capital & Leadership',
        organization: 'Infosys Hinjawadi'
      }
    ],
    perks: ['Executive networking buffet lunch with industry guests', 'Official NAVYOM Certificate of Executive Participation', '1-on-1 resumé clinic with senior HR leadership'],
    scheduleHighlights: [
      { time: '09:30 AM', title: 'Inaugural Keynote: Scaling India’s Digital Core', description: 'Address by eminent corporate CXOs and PCU Leadership' },
      { time: '01:45 PM', title: 'PCU Shark Tank: Pitching Before Angels', description: 'Student founders pitch for up to ₹10 Lakh in PCET seed grant capital' },
      { time: '04:15 PM', title: 'The Ultimate Corporate Leader Challenge', description: 'High-stakes crisis management case study finals' }
    ],
    prerequisites: ['Formal or business casual dress code required', 'Attendance counts towards PCU professional development credits']
  },
  {
    id: 'evt-pcu-kridarambha-2026',
    title: 'KRIDARAMBHA 2026 – Annual Inter-School Sports Championship',
    category: 'athletics',
    categoryLabel: 'Sports & Athletics',
    description: 'The ultimate university athletic tournament spanning Cricket, Football, Volleyball, Badminton, Athletics, and Chess.',
    longDescription: 'KRIDARAMBHA brings the entire campus together in a fierce and spirited athletic clash. Students from the School of Engineering, Pune Management School, Pune Design School, School of Pharmacy, School of Law, and School of Sciences compete for the prestigious PCU General Championship Shield. Matches are hosted across the international-standard synthetic courts, football grounds, and cricket pavilion at Sate-Maval.',
    organizer: {
      name: 'Coach R. K. Gaikwad & Sports Committee',
      clubOrDept: 'PCU Sports Directorate',
      contactEmail: 'sports@pcu.edu.in'
    },
    date: '2026-11-20',
    displayDate: 'Friday, Nov 20 – Sunday, Nov 22, 2026',
    time: '7:00 AM – 7:30 PM (Daily)',
    venue: 'PCU Sports Complex & Outdoor Arena',
    room: 'Pavilion Grounds & Indoor Badminton Arena',
    campusZone: 'South Campus Athletic Zone',
    format: 'In-Person',
    capacity: 1800,
    registeredCount: 1620,
    image: '/images/pcu_sports_complex_1793001610696.jpg',
    tags: ['KRIDARAMBHA', 'Cricket League', 'Football Cup', 'Athletics Meet', 'PCU Sports'],
    featured: false,
    passes: [
      {
        id: 'tier-krid-athlete',
        name: 'Registered Athlete / Team Squad Pass',
        price: 0,
        description: 'For students competing in university brackets with access to warmup pavilions and hydration tents.',
        remaining: 80,
        total: 600
      },
      {
        id: 'tier-krid-cheer',
        name: 'Student Spectator & Cheering Section Pass',
        price: 0,
        description: 'Access to grandstands, cheering gear, and complimentary energy refreshments.',
        remaining: 100,
        total: 1200
      }
    ],
    speakers: [
      {
        name: 'Sushil Jadhav',
        role: 'Former National Athlete & Coach',
        organization: 'Maharashtra Sports Authority'
      }
    ],
    perks: ['Official KRIDARAMBHA 2026 athletic jersey for participants', 'Complimentary Gatorade and fresh fruits at field stations', 'Medals and merit certificates endorsed by PCU Sports Board'],
    scheduleHighlights: [
      { time: '07:30 AM Fri', title: 'March Past & Torch Relay', description: 'Grand parade of all eight PCU schools with student contingents' },
      { time: '02:00 PM Sat', title: 'Inter-School Cricket & Football Semifinals', description: 'Engineering vs. Management clash on Main Ground 1' },
      { time: '04:30 PM Sun', title: '100m Dash & Championship Trophy Presentation', description: 'Award ceremony by the Chancellor and Trustee Board' }
    ],
    prerequisites: ['Appropriate sports shoes and student ID required on all turf surfaces']
  },
  {
    id: 'evt-pcu-design-vista-2026',
    title: 'PCU Design Vista 2026 – Pune Design School Graduation Expo',
    category: 'academic',
    categoryLabel: 'Design & Architecture',
    description: 'Explore visionary student prototypes in Mobility Design, UI/UX Interaction, Ergonomic Products, and Sustainable Living.',
    longDescription: 'Curated by the faculty and students of the Pune Design School (PDS), Design Vista is an experiential exhibition celebrating innovative human-centric solutions. The exhibition displays working physical models, clay automotive concept scale models, spatial interior architectures, and immersive AR/VR user experience demos. Leading automotive and product design heads from Pune and Mumbai attend as external critics.',
    organizer: {
      name: 'Prof. Tanvi Nambiar',
      clubOrDept: 'Pune Design School (PDS)',
      contactEmail: 'design@pcu.edu.in'
    },
    date: '2026-11-25',
    displayDate: 'Wednesday, Nov 25, 2026',
    time: '10:00 AM – 5:00 PM',
    venue: 'Pune Design School Studio Complex',
    room: 'Main Exhibition Gallery & Workshop Atrium',
    campusZone: 'Creative Arts & Architecture Block',
    format: 'In-Person',
    capacity: 500,
    registeredCount: 420,
    image: '/images/event_arts_music_1793000613362.jpg',
    tags: ['Design Vista', 'Pune Design School', 'UI/UX', 'Product Prototypes', 'Automotive Styling'],
    featured: false,
    passes: [
      {
        id: 'tier-des-student',
        name: 'Student & Faculty Exhibition Pass',
        price: 0,
        description: 'Full gallery tour, access to interactive demo stations, and design talk sessions.',
        remaining: 65,
        total: 400
      },
      {
        id: 'tier-des-industry',
        name: 'Design Industry Reviewer Pass',
        price: 0,
        description: 'Includes candidate portfolio reviews and private networking lounge access.',
        remaining: 15,
        total: 100
      }
    ],
    speakers: [
      {
        name: 'Shrikant Rao',
        role: 'Chief Design Officer',
        organization: 'Studio Carbon India'
      }
    ],
    perks: ['Printed exhibition lookbook catalog of student projects', 'Interactive 3D printing and clay sculpting live demos', 'Networking tea in the Courtyard Garden'],
    scheduleHighlights: [
      { time: '10:00 AM', title: 'Ribbon Cutting & Gallery Walkthrough', description: 'Inauguration of Mobility and Ergonomics showcase' },
      { time: '02:00 PM', title: 'Design Talk: AI as a Creative Amplifier', description: 'Masterclass on prompt engineering and spatial computing' },
      { time: '04:00 PM', title: 'Best Sustainable Design Award Felicitation', description: 'Honor ceremony for standout undergraduate design theses' }
    ],
    prerequisites: ['Open to all students interested in technology, design, and innovation']
  },
  {
    id: 'evt-pcu-crest-cyber-summit',
    title: 'PCU Cyber Defence Summit & CTF Challenge 2026',
    category: 'tech',
    categoryLabel: 'Cyber Security & Research',
    description: 'CREST Club and School of Computer Applications present live Capture-the-Flag, ethical hacking drills, and cloud threat defense.',
    longDescription: 'Organized by PCU’s prestigious CREST Club (Cyber Research & Ethical Security Team) in collaboration with the School of Computer Applications and School of Law. With Pune emerging as a global fintech and banking hub, this summit equips students with defensive cybersecurity skills, digital forensics workflows, and understanding of the Digital Personal Data Protection (DPDP) Act.',
    organizer: {
      name: 'Prof. Omkar Bapat & CREST Club',
      clubOrDept: 'School of Computer Applications & CREST Club',
      contactEmail: 'crest@pcu.edu.in'
    },
    date: '2026-11-28',
    displayDate: 'Saturday, Nov 28, 2026',
    time: '9:00 AM – 4:30 PM',
    venue: 'PCU Cyber Security & Cloud Computing Laboratory',
    room: 'Lab 402 & Cyber Range Room',
    campusZone: 'Central Computing Complex',
    format: 'Hybrid',
    capacity: 250,
    registeredCount: 215,
    image: '/images/event_hackathon_1793000613790.jpg',
    tags: ['Cyber Security', 'CTF Challenge', 'Ethical Hacking', 'CREST Club', 'Cloud Defense'],
    featured: false,
    passes: [
      {
        id: 'tier-crest-lab',
        name: 'In-Lab CTF Challenger Pass',
        price: 0,
        description: 'Dedicated virtual sandboxed terminal for hands-on web, reverse engineering, and crypto challenges.',
        remaining: 25,
        total: 150
      },
      {
        id: 'tier-crest-webinar',
        name: 'Virtual Keynote & Observer Stream',
        price: 0,
        description: 'Live HD broadcast of vulnerability breakdowns and expert industry talks.',
        remaining: 10,
        total: 100
      }
    ],
    speakers: [
      {
        name: 'Col. K. V. Sharma (Retd.)',
        role: 'Adviser, National Cyber Security Taskforce',
        organization: 'Cyber Defence Institute Pune'
      }
    ],
    perks: ['CREST Cyber Badge of Completion', 'Hardware security USB toolkit for top 10 CTF finalists', 'Snacks and lunch provided for physical attendees'],
    scheduleHighlights: [
      { time: '09:00 AM', title: 'Briefing: Modern Attack Vectors & Zero-Days', description: 'Real-world exploit walkthroughs by certified ethical hackers' },
      { time: '11:00 AM', title: 'PCU CTF Tournament Kick-off', description: '4-hour live jeopardy-style capture the flag challenge' },
      { time: '03:30 PM', title: 'Legal Dimensions of Cyber Warfare', description: 'Joint talk by PCU School of Law on data privacy compliance' }
    ],
    prerequisites: ['Basic understanding of Linux commands and networking fundamentals recommended', 'Bring personal laptop with Kali Linux or VM']
  },
  {
    id: 'evt-pcu-library-colloquium',
    title: 'PCU National Research Colloquium & Digital Scholar Summit 2026',
    category: 'academic',
    categoryLabel: 'Research & Scholarly',
    description: 'Join faculty, doctoral fellows, and student researchers at the Swami Vivekananda Central Library for multidisciplinary research symposiums and digital archiving masterclasses.',
    longDescription: 'Hosted inside the grand Swami Vivekananda Central Library at Pimpri Chinchwad University, this annual research colloquium explores modern open-science paradigms, patent filing for undergraduate innovators, and AI-assisted bibliometrics. Featuring keynotes from CSIR-NCL scientists and access to IEEE and ProQuest research databases.',
    organizer: {
      name: 'Dr. Sunita Jagtap & Library Committee',
      clubOrDept: 'Swami Vivekananda Central Library & PCU Research Cell',
      contactEmail: 'library@pcu.edu.in'
    },
    date: '2026-12-04',
    displayDate: 'Friday, Dec 4, 2026',
    time: '10:00 AM – 4:00 PM',
    venue: 'Swami Vivekananda Central Library',
    room: 'Main Reading Atrium & Level 2 Research Pods',
    campusZone: 'Central Academic Block',
    format: 'In-Person',
    capacity: 220,
    registeredCount: 165,
    image: '/images/pcu_central_library_1793001610594.jpg',
    tags: ['Swami Vivekananda Library', 'Research Colloquium', 'IEEE Xplore', 'Patent Filing', 'Scholar Summit'],
    featured: false,
    passes: [
      {
        id: 'tier-lib-delegate',
        name: 'Student Research Delegate Pass',
        price: 0,
        description: 'Access to research track presentations, digital library terminal pass, and conference proceedings.',
        remaining: 45,
        total: 180
      },
      {
        id: 'tier-lib-author',
        name: 'Paper Author / Presenter Pass',
        price: 0,
        description: 'For students presenting research posters or papers before the faculty peer review board.',
        remaining: 10,
        total: 40
      }
    ],
    speakers: [
      {
        name: 'Dr. V. K. Deshmukh',
        role: 'Dean of Research & Innovation',
        organization: 'Pimpri Chinchwad University'
      },
      {
        name: 'Dr. Sharmila Roy',
        role: 'Chief Scientist, Data & Knowledge Systems',
        organization: 'CSIR National Chemical Laboratory Pune'
      }
    ],
    perks: ['Complimentary PCU Research Compendium 2026', 'Access to Delnet, EBSCO & Scopus indexing workshop', 'Working lunch and networking tea in the library garden gallery'],
    scheduleHighlights: [
      { time: '10:00 AM', title: 'Keynote: Navigating High-Impact Scopus & SCI Publications', description: 'Address on research integrity, literature synthesis, and methodology' },
      { time: '01:30 PM', title: 'Student Innovation Poster Showcase', description: 'Undergraduate and postgraduate prototypes evaluated by jury' },
      { time: '03:15 PM', title: 'Workshop: Automated Citation & Patent Filing', description: 'Hands-on clinic using Mendeley, Zotero, and Indian Patent Office portals' }
    ],
    prerequisites: ['Open to all PCU students and research scholars', 'Prior research paper draft optional but encouraged']
  }
];

export interface PCUFacility {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  highlights: string[];
  capacityOrSpecs: string;
  location: string;
}

export const PCU_FACILITIES: PCUFacility[] = [
  {
    id: 'fac-library',
    title: 'Swami Vivekananda Central Library',
    category: 'Knowledge & Research',
    description: 'Automated multi-level library equipped with 10,000+ volumes, RFID tracking, KOHA software, high-speed Wi-Fi, and global e-journal databases (EBSCO, ProQuest, IEEE).',
    image: '/images/pcu_central_library_1793001610594.jpg',
    highlights: ['RFID Self-Check Kiosks', 'Collaborative Study Pods', 'Digital Library Suite', 'Over 10,000+ Academic Volumes'],
    capacityOrSpecs: '500+ Seating Capacity',
    location: 'Central Academic Block, Level 1–3'
  },
  {
    id: 'fac-sports',
    title: 'PCU International Sports Complex & Arena',
    category: 'Athletics & Recreation',
    description: 'Championship-grade athletic grounds featuring a full-size football turf, cricket match pavilion, synthetic running track, and indoor badminton arena overlooking the scenic Sahyadri hills.',
    image: '/images/pcu_sports_complex_1793001610696.jpg',
    highlights: ['Synthetic 400m Athletic Track', 'Floodlit Turf Stadium', 'Indoor Badminton & Table Tennis', 'Annual KRIDARAMBHA Venue'],
    capacityOrSpecs: '2,000+ Spectator Capacity',
    location: 'South Campus Athletic Zone, Sate-Maval'
  },
  {
    id: 'fac-campus',
    title: 'PCU Main Academic Complex & Entrance Portico',
    category: 'Academic Infrastructure',
    description: 'Iconic contemporary architectural entrance with geometric glass facades, smart tech-enabled lecture amphitheaters, and landscaped tropical gardens.',
    image: '/images/pcu_campus_entrance_1793001612096.jpg',
    highlights: ['Tech-Enabled Smart Classrooms', 'PMRDA Educational Corridor', 'Air-Conditioned Conference Suites', 'Solar Powered Green Building'],
    capacityOrSpecs: 'Multi-Department Complex',
    location: 'Main University Entrance, Sate, Pune'
  },
  {
    id: 'fac-hostel',
    title: 'Student Residential Hostels & Dining Quad',
    category: 'Campus Living & Hostels',
    description: 'Safe, modern residential towers with single, double, and triple occupancy rooms, 24/7 security surveillance, high-speed Wi-Fi, recreational lounges, and hygienic multi-cuisine dining.',
    image: '/images/pcu_hostel_residence_1793001612149.jpg',
    highlights: ['24/7 CCTV & Security', 'Nutritious Multi-Cuisine Mess', 'Lush Outdoor Dining Pergola', 'Laundry & Housekeeping'],
    capacityOrSpecs: '1,200+ Student Residents',
    location: 'Residential Living Quad, PCU Campus'
  }
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'All PCU Events' },
  { id: 'arts', label: 'Cultural & ANANTAM' },
  { id: 'tech', label: 'Tech & Hackathons' },
  { id: 'career', label: 'Management & NAVYOM' },
  { id: 'athletics', label: 'Sports & KRIDARAMBHA' },
  { id: 'academic', label: 'Design & Academic' }
] as const;

export const PCU_SCHOOLS_AND_MAJORS = [
  'School of Engineering & Technology – Computer Science & Engg (CSE)',
  'School of Engineering & Technology – AI & Machine Learning',
  'School of Engineering & Technology – Robotics & Automation',
  'School of Engineering & Technology – Mechanical Engineering',
  'School of Computer Applications – MCA (Cloud & Cyber Security)',
  'School of Computer Applications – BCA',
  'Pune Management School – MBA (Marketing & Business Analytics)',
  'Pune Management School – MBA (Finance & FinTech)',
  'Pune Management School – BBA (International Business)',
  'Pune Design School – B.Des (Product & Industrial Design)',
  'Pune Design School – B.Des (UI/UX & Visual Communication)',
  'Pune Design School – B.Des (Interior & Spatial Design)',
  'School of Sciences – B.Sc / M.Sc (Clinical Psychology)',
  'School of Sciences – B.Sc / M.Sc (Biotechnology)',
  'School of Pharmacy – B.Pharm / M.Pharm',
  'School of Law – B.A. LL.B. (Hons)',
  'School of Law – B.B.A. LL.B. (Hons)',
  'Pune School of Media & Communication – BA (Journalism & Media)',
  'School of Allied Health Sciences'
];

export const PCU_BATCH_YEARS = [
  'Batch 2024–2028 (Year 1)',
  'Batch 2023–2027 (Year 2)',
  'Batch 2022–2026 (Year 3 / Final Year)',
  'Batch 2021–2025 (Outgoing Final Year)',
  'PG / MBA / MCA Batch (2025–2027)',
  'Ph.D. Research Scholar'
];
