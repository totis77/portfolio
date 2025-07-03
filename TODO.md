# Project TODO

This document tracks the development process of the portfolio website.

---

## Completed Tasks

### Phase 1: Project Setup & Foundation
- [x] Initialize Next.js project
- [x] Set up basic styling and layout
- [x] Install all necessary content parsing libraries

### Phase 2: Content Integration & Display
- [x] Create a script to parse and merge publication and media data
- [x] Create "Publications" page to display the list
- [x] Create "Bio" page from Markdown
- [x] Create "Projects" page from YAML
- [x] Create "News" page from Markdown
- [x] Integrate "Grants and Projects" from CV into the main Projects page

### Phase 3: Advanced Functionality
- [x] Implement interactive publications page (search, grouping, collapsible sections)
- [x] Create printable CV page
- [x] Expand CV with all sections from the provided PDF (Experience, Education, Skills, Teaching)
- [x] Implement a "Download PDF" feature for the CV

### Phase 4: Polishing the Design & Deployment
- [x] Refine overall aesthetic based on a high-quality template
- [x] Ensure full responsiveness and dark mode support
- [x] Create a `.gitignore` file for deployment readiness

### Phase 5: API & Future-Proofing
- [x] Create a Next.js API route to expose publication data
- [x] Add dedicated, detailed pages for individual projects

---

## Future Roadmap

### Tier 1: High-Impact Visuals
- [ ] **Interactive Thumbnails:**
  - [ ] Install `three.js` and related types.
  - [ ] Create a reusable `InteractiveThumbnail.tsx` component.
  - [ ] Develop a default, abstract animation (e.g., particle system).
  - [ ] Integrate the component into the Publications page.
  - [ ] Add a new `animation` field to `media.yaml` to allow for per-publication customization.
- [ ] **"Research Visuals" Gallery:**
  - [ ] Create a new `gallery.yaml` content file.
  - [ ] Build a new `/gallery` page with a masonry grid layout.
  - [ ] Implement a "lightbox" view for full-size images and videos.

### Tier 2: Ambitious Enhancements
- [ ] **Generative Art Header:**
  - [ ] Develop a subtle, performant background animation.
  - [ ] Integrate it into the main site layout.
- [ ] **LaTeX-based CV Generation:**
  - [ ] Devise a plan to generate the CV from a LaTeX source file for perfect formatting.

### Tier 3: Additional Content
- [ ] **"Presentations" or "Talks" Section:**
    - [ ] This was completed, but we reverted it. We can re-add it here if desired.
