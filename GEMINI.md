# Gemini Project Plan: Personal Portfolio Website

This document provides a comprehensive overview of the architecture, content strategy, and key technical decisions for the personal portfolio website. It is intended as a technical guide for future maintenance and development.

## 1. Project Goal

The primary goal was to create an elegant, visually-driven, and easily maintainable personal portfolio website for a researcher in computer animation. The site is designed to highlight publications, projects, talks, and other professional activities in a clean, modern interface.

## 2. Core Technologies

*   **Framework:** Next.js (React)
*   **Styling:** Tailwind CSS
*   **Content Parsing:**
    *   `citation-js`: For robust parsing and formatting of BibTeX data.
    *   `js-yaml`: For parsing YAML-based content files (`projects.yaml`, `talks.yaml`, `media.yaml`).
    *   `marked`: For converting Markdown content to HTML.
*   **Deployment:** The project is structured for easy deployment on Vercel.

## 3. Content-First Architecture

The core design philosophy is **"content-first"**. The website is architected so that the vast majority of updates can be made by editing simple, human-readable text files in the `src/content/` directory, without needing to modify React components.

### 3.1. Content File Strategy

*   **`src/content/bio.md`**: A Markdown file with a YAML frontmatter. This single file drives the content for the "About Me" section on the home page and the comprehensive, multi-section "Resume" page. It includes structured data for experience, education, skills, and teaching activities.

*   **`src/content/publications.bib`**: The single source of truth for all bibliographic data. This is a standard BibTeX file, ensuring portability and compatibility with academic tools.

*   **`src/content/media.yaml`**: A manifest file that enriches the raw BibTeX data. It links publication entries (via their BibTeX key) to rich media like thumbnails, project pages, videos, and PDFs. This separation keeps the `.bib` file clean and standard-compliant.

*   **`src/content/projects.yaml`**: A YAML file that manages the list of all projects and grants. Each entry contains detailed information, including the user's role, project duration, funding, and links to detailed project pages.

*   **`src/content/talks.yaml`**: A YAML file for listing talks and presentations, including details like the event, date, location, and a link to the slides.

*   **`src/content/news.md`**: A simple Markdown file for news updates and announcements.

### 3.2. Data Loading (`src/lib/`)

The `src/lib/` directory contains a set of data-loading functions, one for each content type. These server-side modules are responsible for reading the content files, parsing them, and transforming the data into a structured format that the page components can easily consume.

## 4. Key Features & Implementation Details

*   **Interactive Publications Page:**
    *   **Architecture:** This page uses a standard Next.js pattern for interactive server-rendered pages. The main `page.tsx` is a Server Component that fetches all publication data. It then passes this data as a prop to a `PublicationsClient.tsx` component, which is a Client Component (`'use client'`) that handles all user interaction (state management for search, etc.). This prevents server-side modules like `fs` from being sent to the browser.
    *   **Features:** Implements full-text search (on title and author), grouping by year, and collapsible sections to manage a large number of publications gracefully.
    *   **Citation Formatting:** Uses `citation-js` to automatically format each entry into the APA style. It also programmatically highlights the owner's name in bold for emphasis.

*   **Dynamic Project Pages:**
    *   Uses Next.js dynamic routing (`/projects/[id]`) to generate a detailed page for each project listed in `projects.yaml`.
    *   The `generateStaticParams` function is used to pre-build these pages at build time, ensuring fast load times and good SEO.

*   **Comprehensive Resume Page:**
    *   The `/resume` page is a single, comprehensive view of the user's professional life.
    *   It dynamically assembles its content from `bio.md` (for experience, education, skills, etc.) and `publications.bib`.
    *   It includes a "Print" button that uses CSS media queries (`@media print`) to provide a clean, paper-friendly layout, and a "Download PDF" button that links to a pre-compiled PDF in the `public/` directory.

*   **Styling & Theming:**
    *   The site uses Tailwind CSS for all styling.
    *   The color scheme and typography are centralized in `tailwind.config.ts`, making site-wide visual changes easy to implement.
    *   The site supports both light and dark modes, managed by the `next-themes` package.

## 5. How to Maintain and Update

*   **To Add a Publication:** Add the BibTeX entry to `publications.bib`. Then, add a corresponding entry in `media.yaml` using the same key to link media.
*   **To Add a Project:** Add a new item to the list in `projects.yaml`. A detailed page will be automatically generated.
*   **To Update Your CV:** Edit the relevant sections in the frontmatter of `src/content/bio.md`. To update the downloadable PDF, simply replace the file in the `public/` directory.
*   **For All Other Content:** Edit the corresponding file in the `src/content` directory.

This architecture ensures that the portfolio is not just a static website, but a living, easily maintainable platform for showcasing professional work.
