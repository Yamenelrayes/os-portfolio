# Customization Guide for Yamen OS Portfolio

## Table of Contents
1. [Personal Information](#personal-information)
2. [Projects](#projects)
3. [Skills](#skills)
4. [Achievements](#achievements)
5. [Terminal Commands](#terminal-commands)
6. [Project Images](#project-images)
7. [Theme Customization](#theme-customization)

## Personal Information

Edit the `src/data/aboutMe.js` file to update your personal information:

```javascript
const aboutMe = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio...",
  // ...
};
```

## Projects

Edit the `src/data/projects.js` file to update your projects:

```javascript
const projects = [
  {
    id: 1,
    name: "Project Name",
    year: 2023,
    description: "Project description...",
    technologies: ["Tech1", "Tech2"],
    githubLink: "https://github.com/yourusername/project",
    demoLink: "https://project-demo.com",
    images: [
      "/images/projects/project-name-1.png",
      "/images/projects/project-name-2.png",
      "/images/projects/project-name-3.png"
    ],
    image: "/images/projects/project-name-1.png" // For backward compatibility
  },
  // ...
];
```

## Skills

Edit the `src/data/skills.js` file to update your skills:

```javascript
const skills = [
  {
    category: "Category Name",
    items: [
      { name: "Skill 1", level: 90 },
      { name: "Skill 2", level: 80 },
      // ...
    ]
  },
  // ...
];
```

## Achievements

Edit the `src/data/achievements.js` file to update your achievements:

```javascript
const achievements = [
  {
    title: "Achievement Title",
    date: "Month Year",
    description: "Achievement description...",
    // ...
  },
  // ...
];
```

## Terminal Commands

Edit the Terminal component to add custom commands:

```javascript
// in TerminalWindow.js
const handleCommand = (input) => {
  // Add your custom commands here
};
```

## Project Images

### Adding Project Images

1. Prepare your project images
   - Recommended size: 1200x675px (16:9 ratio)
   - Supported formats: PNG, JPG, WEBP
   - Optimal file size: Under 200KB for better performance

2. **Multiple Images Per Project**
   - You can now add multiple images for each project
   - Name your images with a numbered suffix (e.g., `project-name-1.png`, `project-name-2.png`)
   - The first image in the array will be used as the thumbnail in the project grid
   - All images will be available in a gallery with navigation controls in the project detail view

3. Place your images in the `public/images/projects/` directory
   - Example paths: 
     * `public/images/projects/project-name-1.png`
     * `public/images/projects/project-name-2.png`

4. Update your project data in `src/data/projects.js` to reference the images:
   ```javascript
   {
     // other project fields...
     images: [
       "/images/projects/project-name-1.png",
       "/images/projects/project-name-2.png",
       "/images/projects/project-name-3.png"
     ],
     image: "/images/projects/project-name-1.png" // For backward compatibility
   }
   ```

5. If images aren't available, the system will display a folder icon as a placeholder.

### Image Best Practices
- Use consistent aspect ratios across all project images
- Optimize images for web using tools like TinyPNG or Squoosh
- Use descriptive filenames that match your project names
- Consider adding a subtle branded overlay to maintain visual consistency

## Theme Customization

To customize the theme, edit the following files:

- `src/styles/GlobalStyles.js`: Main theme variables
- `src/components/BootScreen.js`: Boot screen appearance
- `src/components/Desktop/DesktopIcon.js`: Icon styles

## Quick Start

1. **Update Your Personal Information**
   - Edit `src/data/aboutMe.js` with your name, title, summary, contact details, education history, and interests
   - Replace CV file at `public/sample-cv.pdf` with your actual CV

2. **Customize Your Projects**
   - Edit `src/data/projects.js` to add your own projects
   - Add project images to `public/images/projects/` folder
   - Update image paths in the projects data file

3. **Update Your Skills**
   - Edit `src/data/skills.js` to reflect your actual skills and expertise
   - Adjust skill levels accordingly

4. **Add Your Achievements**
   - Edit `src/data/achievements.js` with your awards and accomplishments

## Detailed Customization

### Changing Colors and Theme

The main color scheme can be modified in:
- `src/styles/GlobalStyles.js` - Global theme colors
- Individual component files - Component-specific styling

Key color variables:
- Background: `#121212` (Dark mode background)
- Primary accent: `#4caf50` (Green)
- Secondary accents: Various colors for different sections

### Adding/Removing Desktop Icons

To modify the desktop icons:
1. Edit the `desktopIcons` array in `src/components/Desktop/Desktop.js`
2. Import appropriate icons from `react-icons` or add custom ones

### Terminal Commands

To add or modify terminal commands:
1. Edit the `commands` object in `src/components/Windows/TerminalWindow.js`
2. For project-specific commands, modify the `runCommands` object

### Window Behavior

To adjust how windows behave:
1. Default window positions and sizes are set in `src/components/Desktop/Desktop.js`
2. Window style and behavior can be modified in `src/components/Windows/Window.js`

### Boot Screen

To customize the boot screen:
1. Edit `src/components/BootScreen.js`
2. Modify the boot messages and timing

## Adding New Features

### New Window Type

To add a new window type:
1. Create a new component in `src/components/Windows/`
2. Add it to the `renderWindowContent` function in `src/components/Windows/WindowManager.js`
3. Add a corresponding desktop icon in `src/components/Desktop/Desktop.js`

### Custom Fonts

To change fonts:
1. Update the Google Fonts import in `src/index.css`
2. Modify the font-family references in stylesheet files

## Deployment

### GitHub Pages

1. Install GitHub Pages package:
   ```
   npm install --save gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/yamen-os-portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```
   npm run deploy
   ```

### Netlify/Vercel

1. Create an account on Netlify or Vercel
2. Connect your GitHub repository
3. Set the build command to `npm run build`
4. Set the publish directory to `build`

## Troubleshooting

- **Window dragging issues**: Check `react-rnd` and `react-draggable` configurations in Window component
- **Image loading errors**: Verify image paths and make sure images exist in the correct location
- **PDF viewing issues**: Ensure CV file is a valid PDF and correctly located
- **Icon rendering problems**: Check that you've imported the right icons from `react-icons`

For more advanced customizations, explore the component files directly. 