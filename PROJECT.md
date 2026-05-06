# Yamen OS Portfolio — Project Documentation

## Overview

An interactive portfolio website styled as a desktop operating system. Built with React, it simulates a full OS experience: a boot screen, draggable/resizable windows, a taskbar, desktop icons, and an interactive terminal.

**Live URL**: https://yamenelrayes.github.io/os-portfolio  
**Repo**: https://github.com/Yamenelrayes/os-portfolio  
**Deploy**: GitHub Pages via `gh-pages`

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| react / react-dom | 19.1.0 | UI framework |
| styled-components | 6.1.18 | All styling (CSS-in-JS) |
| framer-motion | 12.12.1 | Interactive animations |
| react-rnd | 10.5.2 | Draggable + resizable windows |
| react-draggable | 4.4.6 | Desktop icon dragging |
| react-icons | 5.5.0 | Icon library (FA + Simple Icons) |
| react-pdf | 9.2.1 | PDF viewer in CVWindow |
| emailjs-com | 3.2.0 | Contact form email sending |
| gsap | 3.13.0 | Supplemental animation |
| three | 0.176.0 | (imported, unused currently) |
| tsparticles | 3.8.1 | Particle effects (unused, replaced by canvas) |
| react-router-dom | 7.6.0 | (imported, unused currently) |

**Scripts**:
```
npm start       — dev server
npm run build   — production build
npm run deploy  — build + push to gh-pages branch
```

---

## Project Structure

```
os-portfolio/
├── public/
│   ├── index.html
│   ├── manifest.json          — PWA manifest ("Yamen OS")
│   ├── yamen-cv.pdf           — Resume
│   ├── favicon.ico / logo*.png
│   ├── images/
│   │   ├── projects/          — 23 project screenshots
│   │   │   ├── fitpose-1..7.png
│   │   │   ├── spendwise-1..4.jpg
│   │   │   ├── battleships-1..4.png
│   │   │   ├── bluesnakegame-1.png
│   │   │   ├── sahl-1..3.png
│   │   │   └── chillndrink-1.png
│   │   └── wallpapers/
│   │       ├── abstract.jpg
│   │       └── mountains.jpg
└── src/
    ├── App.js                 — Entry point, boot gate
    ├── App.css
    ├── index.js
    ├── index.css              — Font import, global reset
    ├── styles/
    │   └── GlobalStyles.js    — Global styled-components styles
    ├── utils/
    │   └── pathUtils.js       — Asset path helper for GitHub Pages
    ├── data/
    │   ├── aboutMe.js
    │   ├── skills.js
    │   ├── projects.js
    │   └── achievements.js
    └── components/
        ├── BootScreen.js
        ├── Desktop/
        │   ├── Desktop.js
        │   ├── DesktopIcon.js
        │   └── Taskbar.js
        └── Windows/
            ├── Window.js
            ├── WindowManager.js
            ├── AboutWindow.js
            ├── SkillsWindow.js
            ├── ProjectsWindow.js
            ├── AchievementsWindow.js
            ├── ContactWindow.js
            ├── CVWindow.js
            └── TerminalWindow.js
```

---

## Component Architecture

### App.js
- State: `isBooting` (boolean, controls 3-second boot sequence)
- Renders `BootScreen` while booting, then switches to `Desktop`

---

### BootScreen.js
Animated OS startup sequence. ~325 lines.

- Matrix rain background (20 animated columns, random speed/delay)
- Scanline effect (moving horizontal stripe every 4s)
- Glitch effect on "YAMEN OS" title (color shift + translation every 3s)
- Typed boot messages with blinking cursor
- Progress bar (0–100%)
- Duration controlled externally (App.js 3s timeout)

---

### Desktop.js (~780 lines — most complex)
Main environment container. Manages all windows and background effects.

**State**:
- `openWindows[]` — array of `{ id, title, position, size, zIndex, minimized }`
- `activeWindow` — currently focused window ID
- `mousePosition` — used for parallax on stars/nebulae
- `stars` — 150 twinkling star elements
- `nebulae` — 5 pulsing radial gradients
- `shootingStars` — 5 animated trails
- `currentTime` — updates every minute (shown in clock widget)
- Canvas refs for particle system

**Background effects**:
- Canvas particle system: 100 particles with proximity-based line connections (< 100px), parallax offset from mouse, ripple waves on click
- CSS-based twinkling stars, pulsing nebulae, shooting star trails

**Window lifecycle handlers**: `handleIconClick`, `handleWindowClose`, `handleWindowMinimize`, `handleWindowFocus`, `handleWindowResize`, `handleWindowMove`

**Desktop icons** (each opens a window):
- About Me, Skills, Projects, Achievements, Contact, CV, Terminal

**Widgets** (top-right area):
- Clock, Weather, Quick Links

---

### DesktopIcon.js (~230 lines)
Props: `icon`, `title`, `onClick`, `hasNotification?`

- Hover: scale 1.1, translateY -5px, glassmorphic background
- Tap: scale 0.95
- Light sweep on icon hover
- Shimmer text animation on title
- Pulsing notification badge if `hasNotification` is true
- Color-coded icon gradient per window title

---

### Taskbar.js (~235 lines)
Props: `windows[]`, `activeWindow`, `onWindowSelect`

- Bottom bar with spring-in animation on load
- Shows one button per open window (active = green underline, minimized = 0.7 opacity)
- System tray: wifi, volume, battery, notification icons
- Live time + date (updates every second)
- Staggered fade-in for taskbar items

---

### Window.js (~290 lines)
Base wrapper for all window content. Uses `react-rnd`.

Props: `id`, `title`, `zIndex`, `position`, `size`, `isActive`, `onClose`, `onMinimize`, `onFocus`, `onResize`, `onMove`, `children`

- State: `isMaximized`, `preMaximizeState` (save/restore position+size)
- Glassmorphic design (backdrop-blur, translucent bg)
- Active: brighter border, stronger shadow; Inactive: dimmed
- Traffic-light style buttons: close (red), minimize (yellow), maximize (green)
- Resize handle only shown when active + not maximized
- Constrained to `#desktop-container` bounds
- Framer Motion spring animation on open, fade on close

---

### WindowManager.js
Routes `openWindows[]` entries to content components. Skips minimized windows.

| Window ID | Component |
|---|---|
| `about` | AboutWindow |
| `skills` | SkillsWindow |
| `projects` | ProjectsWindow |
| `achievements` | AchievementsWindow |
| `contact` | ContactWindow |
| `cv` | CVWindow |
| `terminal` | TerminalWindow |

---

### AboutWindow.js (~215 lines)
Data source: `src/data/aboutMe.js`

Two-column layout (sidebar + content):
- **Sidebar**: Initials avatar, name, title, interests list
- **Content**: Bio summary, education timeline (icon + institution + degree + year + location)

---

### SkillsWindow.js (~200 lines)
Data source: `src/data/skills.js`

Tabs: Languages | Frameworks | Tools | Concepts | Design

Each skill card shows:
- Icon (resolved from react-icons FA or Simple Icons)
- Name + level (0–100)
- Progress bar (green >80%, lime >60%, amber >40%, red <40%)

Tab accent colors: Languages=blue, Frameworks=purple, Tools=orange, Concepts=pink, Design=cyan

---

### ProjectsWindow.js (~375 lines)
Data source: `src/data/projects.js`

**Grid view**: Card per project — thumbnail, name, year, 100-char truncated description, top-3 tech badges, hover lift
**Detail modal** (on click): Full info, multi-image gallery (arrows + dot indicators), GitHub/demo links, all technologies

Projects (6):
| Name | Year | Stack | Images |
|---|---|---|---|
| FitPose | 2023 | Flutter, ML Kit | 7 |
| SpendWise | 2022 | React Native | 4 |
| Battleships | 2021 | Java | 4 |
| Blue Snake | 2020 | C++, SFML | 1 |
| Sahl | 2022 | Python (Discord bot) | 3 |
| Chill n Drink | 2019 | Arduino | 1 |

---

### AchievementsWindow.js
Data source: `src/data/achievements.js`

Vertical list. Each card: circular icon (trophy/code/certificate/medal/star), title, organization, year, description.

Achievements (6):
1. FinTech Competition Winner — CBE (2023)
2. ICPC ECPC Participation (2022)
3. Certificate of Appreciation — Coventry University (2023)
4. STEM Fair Winner (2019)
5. JCIMUN Honorable Mention (2018)
6. Certificate of Appreciation — TKH (2023)

---

### ContactWindow.js (~365 lines)
Two-column layout: contact form (left) + contact info (right).

**Form**: Name, Email, Message. Sent via EmailJS.
- Service ID: `service_6n0k94l`
- Template ID: `template_xhxsl9u`
- Public Key: `2TsMXrK9HJck_NXO_`
- Timestamp + from_email injected as hidden fields before send

**Contact info displayed**:
- Email: yamenmohamedelrayes@gmail.com
- UK phone: +7884418415
- Egypt phone: +201066130783
- LinkedIn: linkedin.com/in/yamenelrayes/
- GitHub: github.com/Yamenelrayes

---

### CVWindow.js
Iframe embedding `yamen-cv.pdf` with toolbar/navpanes/scrollbar hidden, FitH view. Download button at top.

Uses `getAssetPath()` for GitHub Pages-compatible URL.

---

### TerminalWindow.js (~510 lines)
Green-on-black terminal emulator.

**Commands**: `help`, `about`, `skills`, `projects`, `get cv`, `clear`, `contact`, `play snake`

Features:
- Command history navigation (↑/↓ arrow keys)
- Auto-scroll to latest output

**Snake game** (`play snake`):
- 20×10 grid
- Arrow key controls
- Food collision grows snake + increases score
- Speed starts at configurable ms, decreases by 5ms per food (min 50ms)
- Wall/self collision = game over
- Reset + exit buttons

---

## Data Files

### `src/data/aboutMe.js`
```js
{
  name, title, summary,
  contact: { email, phone, phone2, linkedin, github },
  education: [{ institution, degree, year, location }],
  interests: []
}
```

### `src/data/skills.js`
```js
{
  languages:  [{ name, icon, level }],
  frameworks: [{ name, icon, level }],
  tools:      [{ name, icon, level }],
  concepts:   [{ name, icon, level }],
  design:     [{ name, icon, level }]
}
```

### `src/data/projects.js`
```js
[{
  id, name, year, description,
  technologies: [],
  githubLink, demoLink,
  image,       // single path for card thumbnail
  images: []   // array of paths for gallery
}]
```

### `src/data/achievements.js`
```js
[{ id, title, organization, year, description, icon }]
```

---

## Styling

All styling done via **styled-components**. No CSS modules or Tailwind.

**Color palette**:
- Backgrounds: `#121212`, `#0c0c0c`, `#1a1a1a`, `#2a2a2a`, `#333`
- Accent: `#4caf50` (green)
- Text: `#fff`, `#f1f1f1`, `#ddd`, `#aaa`, `#888`
- Borders: `#444`

**Typography**: `Roboto Mono` (Google Fonts), monospaced throughout.

**Key effects**:
- Glassmorphism: `backdrop-filter: blur(10px)` + semi-transparent backgrounds
- Box shadows with multiple layers
- Keyframe animations: twinkle, pulse, glow, glitch, scanline, shooting star
- Framer Motion for interactive spring/fade/stagger animations

**Breakpoint**: `768px` (grid switches from 2-column to 1-column)

**Custom scrollbar** (GlobalStyles): 8px wide, `#4a4a4a` thumb

---

## Utilities

### `src/utils/pathUtils.js` — `getAssetPath(path)`
Prepends correct base path for GitHub Pages (`/os-portfolio`) or returns empty string for local dev. Reads `process.env.PUBLIC_URL`. Prevents double-prefixing.

Used in: `src/data/projects.js`, `CVWindow.js`

---

## State Management

No Redux/Zustand. Pure React hooks:
- `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`
- Window state lives entirely in `Desktop.js` and is passed down as props
- Content windows are stateless or manage only local UI state (active tab, modal open, form data)

---

## Deployment

```
npm run deploy
```
Runs `npm run build` then `gh-pages -d build`.

`package.json` homepage field: `"https://yamenelrayes.github.io/os-portfolio"`

Asset paths use `getAssetPath()` to resolve correctly under the `/os-portfolio` subpath.
