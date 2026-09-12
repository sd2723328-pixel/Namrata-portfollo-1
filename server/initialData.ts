import { PortfolioData } from '../src/types.js';

export const initialPortfolioData: PortfolioData = {
  personal: {
    name: "Namrata Ghosh",
    role: "Aspiring Web Developer",
    email: "namrataghosh9832@gmail.com",
    phone: "+91 98320 12345",
    location: "Kolkata, West Bengal, India",
    tagline: "Crafting modern, accessible, and high-performance web experiences with clean code.",
    summary: "Dedicated and curious BCA student with a deep passion for modern frontend & full-stack web engineering. Eager to contribute to innovative software teams and continuously build practical, user-centric web applications.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    resumeUrl: "#",
    status: "Actively seeking Web Development Internships & Junior Roles",
    socialLinks: {
      github: "https://github.com/namrataghosh",
      linkedin: "https://linkedin.com/in/namrata-ghosh",
      twitter: "https://twitter.com/namrata_dev",
      codepen: "https://codepen.io/namrataghosh"
    }
  },
  about: {
    headline: "Turning curiosity and foundational computer science into real-world web applications.",
    story: [
      "Hello! I'm Namrata Ghosh, an aspiring web developer currently pursuing my Bachelor of Computer Applications (BCA). My journey with coding started when I built my first HTML and CSS page—the feeling of seeing lines of code transform into an interactive visual canvas immediately hooked me.",
      "As a BCA student, I have developed a strong foundation in core computer science concepts—data structures, object-oriented programming, relational databases, and software engineering methodologies. I continuously bridge theoretical academic knowledge with modern web technologies like React, JavaScript (ES6+), Tailwind CSS, and Node.js.",
      "I believe great software is born out of empathy for the user, meticulous attention to detail, and a commitment to writing clean, maintainable code. When I am not writing code or debugging, you will find me mentoring fellow BCA peers, exploring UI/UX design trends, and participating in tech community meetups."
    ],
    highlights: [
      {
        icon: "Code2",
        title: "Modern Frontend Focus",
        desc: "Building intuitive interfaces using React, responsive CSS, and state management."
      },
      {
        icon: "Smartphone",
        title: "Mobile-First Philosophy",
        desc: "Designing touch-friendly, fluid layouts that adapt seamlessly from mobile to 4K displays."
      },
      {
        icon: "GraduationCap",
        title: "Strong CS Fundamentals",
        desc: "Solid understanding of DSA, DBMS, OOP, and Computer Networking from BCA curriculum."
      },
      {
        icon: "Users",
        title: "Peer Mentorship",
        desc: "Creating study guides and sharing practical programming tips for fellow BCA students."
      }
    ],
    interests: [
      "Frontend Engineering",
      "Full-Stack Web Apps",
      "UI/UX Micro-interactions",
      "Open Source Software",
      "Web Accessibility (a11y)",
      "Technical Writing"
    ]
  },
  skills: [
    {
      id: "skill-1",
      name: "React.js",
      category: "frontend",
      level: 88,
      experience: "1+ years",
      description: "Functional components, custom hooks, context API, state management, and modern component lifecycle.",
      icon: "Atom"
    },
    {
      id: "skill-2",
      name: "JavaScript (ES6+)",
      category: "frontend",
      level: 90,
      experience: "2 years",
      description: "Asynchronous programming (Promises, async/await), DOM manipulation, closures, and modern array methods.",
      icon: "FileCode"
    },
    {
      id: "skill-3",
      name: "HTML5 & Semantic Web",
      category: "frontend",
      level: 95,
      experience: "2.5 years",
      description: "Clean semantic markup, SEO best practices, accessibility (ARIA), and cross-browser standard compliance.",
      icon: "Globe"
    },
    {
      id: "skill-4",
      name: "CSS3 & Tailwind CSS",
      category: "frontend",
      level: 92,
      experience: "2 years",
      description: "Utility-first design, Flexbox, CSS Grid, custom themes, fluid responsive layouts, and smooth animations.",
      icon: "Palette"
    },
    {
      id: "skill-5",
      name: "TypeScript",
      category: "frontend",
      level: 80,
      experience: "1 year",
      description: "Type safety, interfaces, union types, generics, and statically typed React component patterns.",
      icon: "Cpu"
    },
    {
      id: "skill-6",
      name: "Node.js & Express",
      category: "backend",
      level: 82,
      experience: "1.5 years",
      description: "Building RESTful APIs, middleware architecture, request validation, authentication, and error handling.",
      icon: "Server"
    },
    {
      id: "skill-7",
      name: "SQL & Relational DBs",
      category: "backend",
      level: 85,
      experience: "2 years",
      description: "Schema design, normalization (1NF-3NF), complex joins, subqueries, and ACID transaction principles.",
      icon: "Database"
    },
    {
      id: "skill-8",
      name: "MongoDB & NoSQL",
      category: "backend",
      level: 78,
      experience: "1 year",
      description: "Document storage, CRUD operations, indexing, and aggregation pipelines for dynamic data.",
      icon: "Layers"
    },
    {
      id: "skill-9",
      name: "Git & GitHub",
      category: "tools",
      level: 88,
      experience: "2 years",
      description: "Version control workflows, branching, pull requests, merge conflict resolution, and code collaboration.",
      icon: "GitBranch"
    },
    {
      id: "skill-10",
      name: "VS Code & Chrome DevTools",
      category: "tools",
      level: 90,
      experience: "2.5 years",
      description: "Efficient keyboard shortcuts, debugging breakpoints, network tab analysis, and performance profiling.",
      icon: "Terminal"
    },
    {
      id: "skill-11",
      name: "Postman & API Testing",
      category: "tools",
      level: 85,
      experience: "1.5 years",
      description: "Testing REST endpoints, environment variables, authorization headers, and automated test collections.",
      icon: "Send"
    },
    {
      id: "skill-12",
      name: "Data Structures & Algorithms",
      category: "cs-fundamentals",
      level: 82,
      experience: "Academic coursework",
      description: "Arrays, Linked Lists, Stacks, Queues, Binary Trees, Searching & Sorting algorithms, Time & Space complexity.",
      icon: "Binary"
    },
    {
      id: "skill-13",
      name: "OOP & Software Engineering",
      category: "cs-fundamentals",
      level: 86,
      experience: "Academic coursework",
      description: "Encapsulation, Inheritance, Polymorphism, Abstraction, SDLC models, and design patterns.",
      icon: "BookOpen"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "CampusConnect - BCA Student Portal",
      tagline: "Collaborative study hub and semester resource exchange for computer application students.",
      description: "A full-featured responsive platform designed specifically for BCA classmates to browse semester syllabus breakdowns, download verified lecture notes, share code snippets, and participate in discussion threads. Includes a clean search filter and tag-based sorting.",
      category: "Full Stack",
      tags: ["React", "Node.js", "Express", "Tailwind CSS", "REST API"],
      features: [
        "Semester-wise resource categorization (Sem 1 to 6)",
        "Instant search for subjects, question banks, and notes",
        "Responsive cards with download counters and verified badges",
        "Cross-device friendly design with dark/light visual harmony"
      ],
      liveUrl: "https://campusconnect-demo.example.com",
      githubUrl: "https://github.com/namrataghosh/campus-connect-bca",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-2",
      title: "DevSprint - Kanban Task Board",
      tagline: "Streamlined task management application with drag-and-drop workflow tracking.",
      description: "A productivity tool inspired by Trello and Jira, built to help developer teams and student project groups organize sprints. Features status columns (Backlog, In Progress, Review, Completed), priority badges, due date countdowns, and instant local persistence.",
      category: "Frontend",
      tags: ["React", "TypeScript", "Tailwind CSS", "Local Storage", "Lucide Icons"],
      features: [
        "Interactive board view with quick-add cards",
        "Color-coded priority tags (Urgent, High, Medium, Low)",
        "Filter tasks by tag, assignee, and search keywords",
        "100% responsive grid adapting smoothly to touch smartphones"
      ],
      liveUrl: "https://devsprint-demo.example.com",
      githubUrl: "https://github.com/namrataghosh/devsprint-taskboard",
      imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-3",
      title: "Atmosphere - Weather Intelligence App",
      tagline: "Real-time meteorological forecast with dynamic atmospheric visualization.",
      description: "Modern weather forecasting web application consuming OpenWeather APIs. Provides 7-day extended forecasts, hourly precipitation curves, air quality indices, sunrise/sunset animations, and automated geolocation lookup with fallback city searching.",
      category: "Utility",
      tags: ["JavaScript", "REST APIs", "CSS Grid", "Responsive Design", "Vite"],
      features: [
        "Dynamic background tones matching weather conditions",
        "Metric & Imperial unit switcher with saved user preference",
        "Detailed humidity, wind velocity, UV index, and atmospheric pressure metrics",
        "PWA-ready with offline cached results"
      ],
      liveUrl: "https://atmosphere-weather.example.com",
      githubUrl: "https://github.com/namrataghosh/atmosphere-weather-app",
      imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-4",
      title: "PulseStore - Modern Electronics Showcase",
      tagline: "Fast, sleek e-commerce storefront with client-side cart and filter engine.",
      description: "An interactive digital storefront featuring real-time product filtering, multi-attribute searching, shopping cart slide-over drawer, promo code calculations, and responsive product detail modals with high-resolution image galleries.",
      category: "Frontend",
      tags: ["React", "Tailwind CSS", "Context API", "Responsive UI"],
      features: [
        "Category & price range sliders with instant live filtering",
        "Interactive slide-out shopping cart with quantity multipliers",
        "Optimized image loading and responsive layout",
        "Checkout validation with user-friendly error prompts"
      ],
      liveUrl: "https://pulsestore-demo.example.com",
      githubUrl: "https://github.com/namrataghosh/pulse-store-frontend",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Techno India University / West Bengal University of Technology",
      period: "2023 - 2026 (Expected)",
      grade: "Current CGPA: 8.85 / 10",
      description: "Comprehensive 3-year undergraduate degree focusing on computer software development, computational theory, systems design, and database architectures.",
      keyCourses: [
        "Data Structures & Algorithms in C/C++",
        "Web Technologies (HTML5, CSS3, JavaScript)",
        "Database Management Systems & SQL",
        "Object-Oriented Programming with Java & C++",
        "Software Engineering & Agile Methodologies",
        "Computer Networks & Cyber Security Basics",
        "Operating Systems & Linux Shell Scripting"
      ],
      achievements: [
        "Ranked among top 5% students in university semester assessments",
        "Active member and presenter in College Coding & Web Dev Club",
        "Organized peer study workshops on modern JavaScript and Git version control"
      ]
    },
    {
      id: "edu-2",
      degree: "Higher Secondary Education (Class XII - Science)",
      institution: "Kolkata Public Higher Secondary School",
      period: "2021 - 2023",
      grade: "Scored: 89.4%",
      description: "Majored in Science with Computer Science, Mathematics, Physics, and Chemistry. Developed initial passion for logic, algebra, and algorithmic thinking.",
      keyCourses: [
        "Computer Science (Python & C++ basics)",
        "Mathematics & Calculus",
        "Physics & Logical Problem Solving"
      ],
      achievements: [
        "School Science Exhibition Award for Computer Automated Project",
        "Certificate of Academic Excellence in Computer Science"
      ]
    }
  ],
  bcaOverview: {
    intro: "The Bachelor of Computer Applications (BCA) is a foundational 3-year undergraduate program in computer science and software applications. It equips students with both theoretical computing concepts and the practical software engineering skills required to thrive in modern IT and web development industries.",
    whyBCA: [
      "Application-Focused Curriculum: Emphasizes software design, web development, coding, and real-world project creation rather than pure hardware engineering.",
      "Accelerated Path into Tech: Provides a rapid 3-year launchpad directly into software engineering, web development, and cloud computing careers.",
      "Versatile Post-Graduation Pathways: Direct entry into IT industry roles or higher studies like MCA, M.Sc Computer Science, or MBA in Information Systems.",
      "Affordable & Accessible: Excellent return on investment with abundant opportunities for internships and freelance work during college."
    ],
    techStackRecommendations: [
      {
        tech: "C & C++",
        role: "Foundation & DSA",
        reason: "Essential in 1st & 2nd semesters to understand memory allocation, pointers, and data structure internals."
      },
      {
        tech: "Java / Python",
        role: "OOP & Backend",
        reason: "Teaches solid Object-Oriented principles, multi-threading, and rapid backend scripting."
      },
      {
        tech: "HTML5, CSS3 & JavaScript",
        role: "Web Engineering",
        reason: "The backbone of the modern web. Every BCA student should master modern JS (ES6+) for high employability."
      },
      {
        tech: "React.js & Tailwind CSS",
        role: "Modern Frontend",
        reason: "The industry standard for building fast, responsive, and scalable user interfaces."
      },
      {
        tech: "SQL & Relational DBMS",
        role: "Data Management",
        reason: "Critical for college practicals (DBMS) and real-world database queries, joins, and indexing."
      },
      {
        tech: "Git & GitHub",
        role: "Version Control",
        reason: "Indispensable tool for showcasing projects, collaborating with peers, and building a public portfolio."
      }
    ],
    studyTips: [
      "Code Every Day: Spend at least 60–90 minutes daily writing code on your machine rather than just reading textbooks.",
      "Build Mini Projects: Apply every subject learned (e.g., build a Student Management CLI after learning C++, or a Personal Blog after learning HTML/CSS).",
      "Master Git Early: Store all your college lab assignments and personal projects on GitHub to build your digital footprint.",
      "Balance University Marks & Practical Skills: Maintain a solid CGPA (7.5+) for campus placements while simultaneously building modern tech projects.",
      "Leverage Free Developer Documentation: Learn to read official docs like MDN Web Docs, W3Schools, and developer roadmap resources."
    ]
  },
  bcaResources: [
    {
      id: "res-1",
      title: "MDN Web Docs (Mozilla)",
      category: "Web Development",
      description: "The gold standard documentation for HTML, CSS, JavaScript, and Web APIs. Clear examples, browser compatibility tables, and interactive tutorials.",
      url: "https://developer.mozilla.org",
      level: "Beginner to Advanced",
      badge: "Essential"
    },
    {
      id: "res-2",
      title: "freeCodeCamp Responsive Web Design & JS",
      category: "Interactive Practice",
      description: "Free, structured, hands-on curriculum covering modern HTML5, CSS Flexbox/Grid, and JavaScript algorithms with verified completion certifications.",
      url: "https://www.freecodecamp.org",
      level: "Semester 1-3",
      badge: "Free Certification"
    },
    {
      id: "res-3",
      title: "GeeksforGeeks BCA Subject Notes",
      category: "BCA Core Syllabus",
      description: "Comprehensive notes tailored for Indian university BCA curricula covering Data Structures, Computer Networks, Operating Systems, and DBMS with code snippets.",
      url: "https://www.geeksforgeeks.org",
      level: "All Semesters",
      badge: "Exam & Viva Prep"
    },
    {
      id: "res-4",
      title: "CS50's Introduction to Computer Science (Harvard)",
      category: "Computer Science",
      description: "World-renowned introductory computer science lecture series covering algorithmic thinking, C, Python, SQL, and memory management.",
      url: "https://cs50.harvard.edu",
      level: "Semester 1-2",
      badge: "World Class"
    },
    {
      id: "res-5",
      title: "W3Schools SQL Tutorial & Compiler",
      category: "Database & SQL",
      description: "Interactive SQL browser terminal allowing BCA students to practice SELECT, JOIN, GROUP BY, and DDL commands without installing local DB servers.",
      url: "https://www.w3schools.com/sql/",
      level: "Semester 2-4",
      badge: "Interactive"
    },
    {
      id: "res-6",
      title: "JavaScript.info - The Modern JS Tutorial",
      category: "JavaScript",
      description: "From the basics to advanced topics with simple, but detailed explanations of asynchronous programming, event loop, and DOM manipulation.",
      url: "https://javascript.info",
      level: "Semester 3-5",
      badge: "In-Depth"
    }
  ],
  bcaProjectIdeas: [
    {
      id: "idea-1",
      title: "Student Attendance & Marks Tracker",
      semesterLevel: "1st Year (Beginner)",
      techStack: ["C / C++ or Python", "File Handling / CSV"],
      description: "A menu-driven console application allowing teachers or class representatives to record daily attendance percentages, input semester grades, calculate GPA, and export attendance warning reports.",
      keyFeatures: [
        "CRUD operations on student records saved to local text files",
        "Automated attendance percentage calculator with 75% threshold warnings",
        "Grade evaluation using university scoring criteria"
      ],
      difficulty: "Beginner"
    },
    {
      id: "idea-2",
      title: "Interactive BCA Semester Quiz & Flashcards",
      semesterLevel: "1st / 2nd Year (Beginner)",
      techStack: ["HTML5", "CSS3", "JavaScript (ES6)", "Local Storage"],
      description: "A responsive web quiz application featuring multiple choice questions from BCA subjects (DSA, OS, DBMS). Includes timer countdown, score breakdown, and custom flashcards.",
      keyFeatures: [
        "Timed quiz modes with question randomization",
        "Instant score analytics with correct answer explanations",
        "Bookmark tough questions for revision before semester finals"
      ],
      difficulty: "Beginner"
    },
    {
      id: "idea-3",
      title: "Digital College Library Management System",
      semesterLevel: "2nd Year (Intermediate)",
      techStack: ["Java / Python", "MySQL / SQLite", "JDBC / SQLAlchemy", "GUI / Web"],
      description: "A desktop or web application for college librarians to catalog books, track issued volumes to students, enforce due dates, and calculate overdue penalty fines automatically.",
      keyFeatures: [
        "Book inventory with ISBN search, author categorization, and stock counts",
        "Student issue/return logs with automated fine calculation",
        "Database relationships with relational integrity constraints"
      ],
      difficulty: "Intermediate"
    },
    {
      id: "idea-4",
      title: "Campus Placement & Internship Aggregator",
      semesterLevel: "3rd Year (Final Capstone)",
      techStack: ["React", "Node.js", "Express", "MongoDB / PostgreSQL", "Tailwind CSS"],
      description: "A full-stack placement cell web application where college training & placement officers can post recruitment drives, and students can upload resumes, apply for drives, and track round statuses.",
      keyFeatures: [
        "Role-based authentication (Student vs Training Officer)",
        "Resume upload, eligibility criterion checker, and status notifications",
        "Responsive analytics dashboard for college placement stats"
      ],
      difficulty: "Advanced"
    }
  ],
  bcaCareerGuides: [
    {
      id: "career-1",
      role: "Frontend Web Developer",
      description: "Build user interfaces, websites, and single-page web applications. Focuses on responsiveness, aesthetic layouts, performance, and user accessibility.",
      keySkillsNeeded: ["HTML5 / CSS3", "JavaScript (ES6+)", "React or Vue", "Tailwind CSS", "Git / GitHub", "Responsive Design"],
      averageStartingSalary: "₹3.5 LPA - ₹6.5 LPA (Fresher)",
      higherStudiesOption: "MCA or Specialized UI/UX & Web Development Certifications"
    },
    {
      id: "career-2",
      role: "Full-Stack Software Engineer",
      description: "Develops both client-facing frontend applications and robust server-side APIs, database systems, and cloud deployments.",
      keySkillsNeeded: ["React / Next.js", "Node.js & Express", "SQL & NoSQL Databases", "REST APIs", "Authentication", "Cloud Basics (AWS/GCP/Vercel)"],
      averageStartingSalary: "₹4.0 LPA - ₹8.0 LPA (Fresher)",
      higherStudiesOption: "MCA (Master of Computer Applications) with Software Engineering focus"
    },
    {
      id: "career-3",
      role: "Database Administrator (DBA) & SQL Developer",
      description: "Manages organizational database systems, ensures data integrity, tunes performance, executes backups, and optimizes complex SQL queries.",
      keySkillsNeeded: ["Advanced SQL", "PostgreSQL / MySQL / Oracle", "Database Normalization & Indexing", "Backup & Recovery", "Linux Shell"],
      averageStartingSalary: "₹3.2 LPA - ₹5.5 LPA (Fresher)",
      higherStudiesOption: "MCA or M.Sc in Data Science / Database Systems"
    },
    {
      id: "career-4",
      role: "Software Quality Assurance (QA) & Test Engineer",
      description: "Ensures software applications are bug-free, performant, and secure by executing manual test plans and automated testing scripts.",
      keySkillsNeeded: ["Manual Testing & Test Cases", "Selenium / Cypress / Playwright", "API Testing (Postman)", "Basic Python or Java", "Bug Tracking (Jira)"],
      averageStartingSalary: "₹3.0 LPA - ₹5.0 LPA (Fresher)",
      higherStudiesOption: "MCA or ISTQB Software Testing Certifications"
    },
    {
      id: "career-5",
      role: "Junior Data Analyst",
      description: "Extracts, cleans, and analyzes organizational datasets to find patterns, generate statistical reports, and guide business decisions.",
      keySkillsNeeded: ["Python (Pandas, NumPy)", "SQL Queries", "Excel / Spreadsheets", "Data Visualization (Tableau, PowerBI)", "Basic Statistics"],
      averageStartingSalary: "₹3.5 LPA - ₹6.0 LPA (Fresher)",
      higherStudiesOption: "MCA, M.Sc Data Science, or MBA in Business Analytics"
    }
  ]
};
