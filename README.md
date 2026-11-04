# Chhinchea Voreak - Software Developer Portfolio

A responsive, modern personal portfolio website built with vanilla HTML, CSS, and JavaScript. Designed to present backend development experience, technical skills, projects, and contact avenues with clean typography, interactive animations, and multi-theme support.

## Features

- **Multi-Theme System**:
  - Three distinct themes: Dark, Light, and Liquid Glass.
  - Quick theme toggle in the bottom navigation dock with automatic local storage persistence.
  - Solid color palettes and high-contrast styling optimized for readability across themes.

- **Interactive Profile Avatar**:
  - Dual-photo display with seamless bidirectional glitch transition effects.
  - Digital chromatic aberration, horizontal slicing, scanline effects, and micro-jitter on hover or mobile tap.
  - Clean transparent background integration for portrait headshots.

- **Skills & Proficiency Indicators**:
  - Interactive skill pills displaying categorized technologies and tools.
  - Dynamic percentage popovers with animated progress bars and high-contrast indicators on hover or focus.

- **Work Experience & Education**:
  - Expandable timeline entries for professional roles, internships, and educational milestones.
  - Interactive card expansion with accessible keyboard navigation support.

- **Professional Certifications & Credential Lightbox**:
  - Accredited certification timeline featuring course hour breakdowns and completion dates.
  - Interactive credential preview buttons opening high-resolution certificate modals with direct external verification links.

- **Project Showcase & Image Lightbox**:
  - Grid presentation of software projects including tech stacks, descriptions, and code repository links.
  - Full-resolution screenshot preview lightbox with backdrop blur, image captions, and multiple closing options (close button, backdrop click, Escape key).

- **Direct Contact Channels**:
  - Interactive direct contact cards for Gmail and Telegram with one-click copy and direct launch actions.
  - Quick-access social and messaging links integrated directly in the floating bottom dock.

- **Floating Navigation Dock**:
  - Fixed-position floating dock inspired by modern operating system docks.
  - Smooth anchor scrolling, active item scaling, and contextual tooltips.

## Tech Stack

- **Markup**: HTML5 (Semantic elements, accessible ARIA attributes)
- **Styling**: CSS3 (Custom properties, Flexbox, CSS Grid, keyframe animations)
- **Scripting**: Vanilla JavaScript (ES6+, DOM manipulation, IntersectionObserver API)
- **Libraries & Assets**:
  - Bootstrap 5 (Grid and utility classes)
  - FontAwesome 6 (Vector iconography)

## Project Structure

```text
Portfolio/
├── index.html                  # Main portfolio webpage
├── README.md                   # Project documentation
└── assets/
    ├── css/
    │   └── style.css           # Core styling, themes, animations, responsive design
    ├── js/
    │   └── script.js           # Theme switching, animations, lightbox, EmailJS handler
    └── img/
        ├── certificates/       # High-resolution course certification images
        ├── icon/               # Custom vector SVG, favicon, and app icons
        ├── projects/           # Screenshots of software projects
        ├── profile.png         # Default cutout profile picture
        ├── profile-2.png       # Fallback profile picture
        └── profile-hover.png   # Transparent suit portrait for hover glitch animation
```

## Getting Started

### Prerequisites

A modern web browser such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/voreakchhinchea23/Portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Portfolio
   ```

3. Open `index.html` in your preferred browser:
   - On Windows:
     ```powershell
     Start-Process index.html
     ```
   - Or serve with a lightweight local server (such as Python):
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000`.

## Contact & Links

- **Email**: voreak.chhinchea@gmail.com
- **Telegram**: [@chhinchea_voreak](https://t.me/chhinchea_voreak)
- **GitHub**: [github.com/voreakchhinchea23](https://github.com/voreakchhinchea23)
- **LinkedIn**: [linkedin.com/in/voreak-chhinchea](https://www.linkedin.com/in/voreak-chhinchea/)

## License

This project is open-source and available under the MIT License.
