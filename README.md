# Stonewise Construction Website

A professional, responsive multi-page website for **Stonewise Construction**, a Ghana-based construction company serving local and diaspora clients. The site showcases the company's services and projects, and gives overseas clients an easy way to make contact and start a conversation about building back home.

**Live demo:** (https://stonewise.vercel.app)


## Features

- **Multi-page layout:** Home, About, Services, Projects, and Contact pages
- **Project carousels:** image sliders to showcase completed and ongoing work
- **Responsive grids:** layouts that adapt cleanly from mobile to desktop
- **Contact form:** submissions go through Formspree, with a `mailto:` fallback if the service is unavailable
- **Performance optimizations:** compressed and lazy-loaded images, minimal dependencies, and fast page loads on slower connections
- **Diaspora-focused content:** messaging and layout designed around clients who manage building projects from abroad

## Tech Stack

| Area | Tools |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 (Flexbox, Grid, media queries) |
| Behavior | Vanilla JavaScript |
| Forms | Formspree |
| Hosting | GitHub Pages / Netlify (update to match yours) |

## Project Structure

```
stonewise/
├── css/
│   ├── pages.css
│   └── style.css
├── js/
│   └── main.js
├── projects/
│   └── granite-heights.html
├── Butterfly-209.mp4
├── sample_video.mp4
├── about.html
├── contact.html
├── faq.html
├── index.html
├── projects.html
├── services.html
└── README.md
└──test.mkv
```

> Adjust this tree to match your actual repo layout.


## What I Learned

- Building a polished multi-page site without a framework
- Writing accessible, mobile-first responsive layouts
- Implementing carousels in vanilla JavaScript
- Improving performance through image optimization and lean code
- Designing a resilient contact flow with a fallback path

