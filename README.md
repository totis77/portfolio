# Personal Portfolio Website for Researchers

This is an elegant, visually-driven, and easily maintainable personal portfolio website, designed specifically for researchers in fields like computer animation. It was built with the help of the Gemini CLI.

The core philosophy is **content-first**. All content is managed through simple, human-readable text files (`.md`, `.bib`, `.yaml`), allowing for quick and easy updates without needing to touch the code.

## Core Features

*   **Content-Driven:** All site content is managed through simple text files in the `src/content` directory.
*   **Rich Publication Management:** Publications are managed via a single, standard `.bib` file. A powerful YAML manifest (`media.yaml`) links these entries to rich media like thumbnails, videos, project pages, PDFs, and more.
*   **Interactive & Searchable Publications:** The publications page is fully interactive, with features for full-text search and collapsible year-based grouping to handle a large number of publications gracefully.
*   **Dynamic & Printable CV:** A dedicated, printer-friendly CV page is available at `/cv`. It dynamically generates its content from the same sources as the rest of the site (e.g., `bio.md`), ensuring it's always up-to-date. It includes a "Download PDF" option.
*   **Detailed Project Pages:** Each project has its own dedicated page, showcasing details, image galleries, and videos.
*   **Modern Design:** The site features a clean, minimalist design with light and dark modes.
*   **API Endpoint:** A JSON API endpoint is available at `/api/publications` to expose publication data for other applications.
*   **Responsive:** The layout is fully responsive and works well on all devices.

## Technology Stack

*   **Framework:** Next.js (React)
*   **Styling:** Tailwind CSS
*   **Content Parsing:** `citation-js`, `js-yaml`, `marked`

## How to Update Your Content

*   **Bio, Experience, Education, Skills, Teaching:** Edit the `src/content/bio.md` file.
*   **Publications:** Add new entries to `src/content/publications.bib`.
*   **Publication Media (videos, links, etc.):** Add or edit entries in `src/content/media.yaml`, using the BibTeX key as the identifier.
*   **Projects & Grants:** Add or edit entries in `src/content/projects.yaml`.
*   **News:** Edit the `src/content/news.md` file.
*   **CV PDF:** Replace the `public/panayiotis-cv-2023.pdf` file with your updated PDF.

## Running Locally

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.