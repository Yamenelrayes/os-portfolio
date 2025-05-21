# Yamen OS - Operating System-Themed Portfolio Website

An interactive portfolio website designed to mimic an operating system user interface, showcasing your skills, projects, and achievements in a unique and engaging way.

## Features

- **Boot Screen Animation**: Simulated system startup sequence
- **Desktop Environment**: OS-like desktop with clickable icons
- **Window System**: Draggable, resizable windows for different sections
- **Project Showcase**: File explorer-style layout for your projects
- **Skills Overview**: Visual representation of your technical skills
- **Interactive Terminal**: Command-line interface with custom commands
- **About Me Section**: Profile information with education timeline
- **Achievements Section**: Display your awards and accomplishments
- **Contact Form**: Interactive form for visitors to reach out
- **CV/Resume View**: Embedded PDF viewer for your resume

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/yamen-os-portfolio.git
cd yamen-os-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## Customization

### Updating Content

- Edit files in the `src/data` directory to update your personal information, projects, skills, and achievements
- Replace sample CV in the public folder with your own CV PDF file
- Add your project images to the `public/images/projects` folder

### Styling

- Main styling configurations can be found in `src/styles/GlobalStyles.js`
- Component-specific styles are located within each component file

## Technologies Used

- **React.js**: Front-end UI library
- **Styled Components**: CSS-in-JS styling
- **React-PDF**: PDF viewing capabilities
- **React-Draggable**: Draggable windows functionality
- **React-RND**: Resizable and draggable components
- **React-Icons**: Icon library

## License

This project is open source and available under the [MIT License](LICENSE).
