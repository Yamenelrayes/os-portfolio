const projects = [
  {
    id: 1,
    name: 'FitPose',
    year: 2023,
    description: 'FitPose is a mobile app that delivers real-time form correction for bodyweight exercises (squats, pushups, planks) using on-device pose estimation. Built with Flutter and Google\'s ML Kit, the app analyzes joint angles via the phone\'s front camera and provides instant audio and visual feedback to help users correct their form, reduce injury risk, and stay motivated. Designed for beginners and home workout users, FitPose includes automated rep counting, tutorials, workout logging, and progress tracking. All processing is done locally to ensure user privacy, with strong performance across both low- and high-end devices.',
    technologies: ['Flutter', 'Dart', 'ML Kit', 'Supabase', 'Figma'],
    githubLink: 'https://github.com/Yamenelrayes/fitpose',
    demoLink: 'https://drive.google.com/file/d/1aUKQ6W225w9OQENkljUHuK-hsDAvn9vo/view?usp=sharing',
    images: [
      '/images/projects/fitpose-1.png',
      '/images/projects/fitpose-2.png',
      '/images/projects/fitpose-3.png',
      '/images/projects/fitpose-4.png',
      '/images/projects/fitpose-5.png',
      '/images/projects/fitpose-6.png',
      '/images/projects/fitpose-7.png'
    ],
    image: '/images/projects/fitpose-1.png'
  },
  {
    id: 2,
    name: 'SpendWise',
    year: 2022,
    description: 'SpendWise is a full-stack personal finance management app that helps users track income and expenses, set financial goals, and analyze spending habits. It features interactive charts, budget categorization, transaction history, and a built-in Zakat calculator for Muslim users. The app follows modern full-stack practices using the MERN stack, with a clear frontend-backend separation and support for recurring transactions via scheduled cron jobs.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Express'],
    githubLink: 'https://github.com/Yamenelrayes/SpendWise',
    demoLink: '',
    images: [
      '/images/projects/spendwise-1.jpg',
      '/images/projects/spendwise-2.jpg',
      '/images/projects/spendwise-3.jpg',
      '/images/projects/spendwise-4.jpg'
    ],
    image: '/images/projects/spendwise-1.jpg'
  },
  {
    id: 3,
    name: 'Battleships',
    year: 2021,
    description: 'Battleships is a classic naval combat game built in Java, featuring both a command-line and graphical interface (Swing). Players attempt to locate and sink randomly placed enemy ships on a grid, with real-time feedback and game stats like hit counts and attempts. The project follows a clean Model-View-Controller (MVC) architecture and uses the Observer pattern for efficient UI updates, demonstrating strong object-oriented design principles.',
    technologies: ['Java', 'Java Swing', 'MVC Pattern', 'JUnit'],
    githubLink: 'https://github.com/COMP6018-25/battleships-coursework-1-2025-Yamenelrayes',
    demoLink: '',
    images: [
      '/images/projects/battleships-1.png',
      '/images/projects/battleships-2.png',
      '/images/projects/battleships-3.png',
      '/images/projects/battleships-4.png'
    ],
    image: '/images/projects/battleships-1.png'
  },
  {
    id: 4,
    name: 'Blue Snake',
    year: 2020,
    description: 'Blue Snake is a simple 2D snake game built using C++ and SFML (Simple and Fast Multimedia Library). The player controls a blue snake that grows as it consumes food, while avoiding collisions with the walls and its own body. The game features smooth frame-based movement, graphical rendering, and a basic game loop. ',
    technologies: ['C++', 'SFML'],
    githubLink: '',
    demoLink: '',
    images: [
      '/images/projects/bluesnakegame-1.png'
    ],
    image: '/images/projects/bluesnakegame-1.png'
  },
  {
    id: 5,
    name: 'Sahl',
    year: 2022,
    description: 'Sahl is a Python-based chatbot built to assist Coventry University TKH students and applicants. It provides campus navigation, office locations, course info, and admissions guidance. Originally terminal-based, the bot was later integrated into Discord for a more user-friendly experience. The bot uses conditional logic to guide users based on whether they are students or applicants, offering relevant options like class locations or application steps. Google Maps links were included to improve navigation support.',
    technologies: ['Python', 'Discord'],
    githubLink: '',
    demoLink: '',
    images: [
      '/images/projects/sahl-1.png',
      '/images/projects/sahl-2.png',
      '/images/projects/sahl-3.png'
    ],
    image: '/images/projects/sahl-1.png'
  },
  {
    id: 6,
    name: 'Chill n Drink',
    year: 2019,
    description: 'Chill n Drink is a custom-built Arduino-powered device that rapidly chills canned drinks using a combination of ice water immersion and motorized spinning. By placing a can on the platform and inserting a coin, the system activates and spins the drink in ice water, cooling it in under 1 minute—equivalent to 30 minutes in a freezer. Built from scratch, the device showcases skills in embedded systems, mechanical design, circuit integration, and user-triggered automation. It\'s designed to be user-friendly, cost-effective, and efficient for fast beverage cooling in casual or event settings.',
    technologies: ['Arduino', 'IoT', 'Electronics'],
    githubLink: '',
    demoLink: '',
    images: [
      '/images/projects/chillndrink-1.png'
    ],
    image: '/images/projects/chillndrink-1.png'
  }
];

export default projects; 