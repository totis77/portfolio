# Deployment Instructions

This guide provides instructions for deploying your Next.js portfolio website. The recommended method is using Vercel for its seamless integration and performance. An alternative method for GitHub Pages is also provided.

---

## Method 1: Vercel (Recommended)

Vercel is the platform created by the developers of Next.js, and it's the easiest and most powerful way to deploy your site. It offers a generous free tier that is perfect for this project.

### Step 1: Push Your Code to GitHub

1.  **Initialize Git:** If you haven't already, open a terminal in your project folder and run:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  **Create a GitHub Repository:** Go to [GitHub](https://github.com) and create a new, empty repository. Do not add a `README` or `.gitignore` file from the GitHub interface.
3.  **Link and Push:** Follow the instructions on your new GitHub repository page to "push an existing repository from the command line". It will look something like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    git branch -M main
    git push -u origin main
    ```

### Step 2: Deploy with Vercel

1.  **Sign Up:** Create a free account at [vercel.com](https://vercel.com), choosing to sign up with your GitHub account.
2.  **Import Project:** From your Vercel dashboard, click "Add New... > Project".
3.  **Select Repository:** Find the GitHub repository you just created and click "Import".
4.  **Deploy:** Vercel will automatically detect that this is a Next.js project. You do not need to change any settings. Simply click the "Deploy" button.

That's it! Vercel will build and deploy your site, giving you a live URL. From now on, every time you `git push` an update to your `main` branch on GitHub, Vercel will automatically redeploy the site with the changes.

---

## Method 2: GitHub Pages (Alternative)

Deploying a Next.js application to GitHub Pages is more complex because it requires a static export of the site. This method will work, but you will lose some of the dynamic features of Next.js, like the API route.

### Step 1: Configure Your Project

1.  **Set Output Mode:** In your `next.config.js` file, you need to specify that you want a static export. If you don't have this file, create it.
    ```javascript
    // next.config.js
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'export',
    };

    module.exports = nextConfig;
    ```
2.  **Update `package.json`:** Add a `deploy` script to your `package.json` to automate the build and deployment process.
    ```json
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "deploy": "next build && touch out/.nojekyll && git add out/ && git commit -m \"Deploy\" && git subtree push --prefix out origin gh-pages"
    },
    ```

### Step 2: Deploy

1.  **Run the Deploy Script:** From your terminal, run the new deploy script:
    ```bash
    npm run deploy
    ```
    This command will:
    *   Build a static version of your site into an `out` folder.
    *   Create a `.nojekyll` file to prevent issues with GitHub Pages.
    *   Commit the `out` folder.
    *   Push the contents of the `out` folder to a special branch named `gh-pages`.

2.  **Configure GitHub Repository:**
    *   Go to your repository's settings on GitHub.
    *   Navigate to the "Pages" section.
    *   Under "Build and deployment", set the **Source** to "Deploy from a branch".
    *   Set the **Branch** to `gh-pages` with the `/ (root)` folder.

After a few moments, your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`.
