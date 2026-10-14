# Anshul Jangir - Portfolio Website

A clean, modern, responsive portfolio website built with a **simple, lightweight tech stack** (HTML5, CSS3, Vanilla JavaScript).

---

## 🚀 Tech Stack

- **HTML5**: Semantic markup, accessible ARIA attributes, SEO and Open Graph metadata.
- **CSS3**: Custom modern design tokens, responsive grid/flexbox layouts, glassmorphism, dark/light theme support, and clean `@media print` styling for resume printing.
- **Vanilla JavaScript (ES6+)**: Zero build steps or external dependencies. Handles:
  - Dark/Light mode toggle with persistence in `localStorage`
  - Sticky navbar with scroll-spy navigation
  - Animated metric counters
  - Interactive skills category filter
  - Case study / initiative modal popups
  - Instant clipboard copy for contact items with toast notifications
  - Direct mailto contact form

---

## 📁 Project Structure

```
porfolio webpage/
├── index.html        # Main HTML file
├── css/
│   └── style.css     # CSS stylesheet & design tokens
├── js/
│   └── main.js       # Interactive scripts & modal logic
├── .gitignore        # Git ignore rules
├── LICENSE           # MIT License
└── README.md         # Documentation
```

---

## 💻 How to Run Locally

Because this project uses a pure, zero-dependency tech stack, you do not need Node.js, npm, or any build tools!

### Option 1: Direct File Opening
Double-click `index.html` or open it directly in any browser:
```bash
open index.html
```

### Option 2: Simple Local Python Server
Run any local static server:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 🌐 Free 1-Click Deployment

### GitHub Pages
1. Push this repository to GitHub.
2. In the repository settings, go to **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live instantly!

### Vercel / Netlify / Cloudflare Pages
Simply connect your GitHub repo — no build command or output directory configuration needed!

---

## 📄 Printable Resume Feature
Clicking the **"Resume CV"** button in the header or footer invokes a custom print stylesheet, automatically hiding navigation chrome and formatting your work experience into a clean, ready-to-save PDF resume.

---

## 📝 License
This project is open-source and licensed under the [MIT License](LICENSE).


