# Java Developer Tracker

Java Developer Tracker is a static learning platform for students and early-career developers who want a practical Java developer roadmap with a backend-first full stack path.

It is focused on Java, Spring Boot, REST APIs, SQL, React, JWT authentication, Spring Security, Docker, Kafka, cloud deployment, real-world projects, notes, and interview preparation.

## Live Demo

```text
https://java-developer-tracker.vercel.app/
```

Production deployment is hosted on Vercel. Future pushes to `main` can be redeployed from the Vercel dashboard or through Vercel Git integration.

## Main Features

- Java developer roadmap dashboard
- Java Full Stack Developer learning path
- Backend-first curriculum for Java, Spring Boot, REST APIs, JPA, SQL, JWT, and Spring Security
- Frontend learning path for HTML, CSS, JavaScript, React, forms, routing, and API calls
- Project Lab for backend, full-stack, Docker, Kafka, and cloud deployment projects
- Notes section for saving explanations, doubts, and interview answers
- Custom task creation for weekly learning goals
- Progress tracking using browser `localStorage`
- SEO-ready static structure for Vercel deployment

## Tech Stack

- HTML
- CSS
- JavaScript
- Browser `localStorage`
- Vercel

## Project Structure

```text
.
|-- index.html
|-- README.md
|-- robots.txt
|-- sitemap.xml
|-- vercel.json
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- data/
|   |   `-- platform-data.js
|   `-- js/
|       `-- app.js
```

## Run Locally

Open `index.html` directly in your browser.

No build step is required because this is a static frontend project.

## Deploy On Vercel

Recommended method:

1. Go to `https://vercel.com/new`.
2. Import the GitHub repository `mayank2295/Java-developer-tracker`.
3. Keep the framework preset as `Other`.
4. Keep build command empty.
5. Keep output directory empty or set it to `.`.
6. Click `Deploy`.

After the first deployment, Vercel will redeploy automatically whenever changes are pushed to `main`.

## SEO Setup Included

This project includes:

- Search-friendly page title
- Meta description
- Keyword-focused homepage content
- Canonical URL
- Open Graph metadata
- Twitter card metadata
- JSON-LD structured data
- `robots.txt`
- `sitemap.xml`
- Vercel config with clean URLs and cache headers

Target search topics:

- Java developer roadmap
- Java full stack developer roadmap
- Spring Boot roadmap
- Backend developer roadmap
- Java interview preparation
- Java full stack projects

## Data Storage

The current version stores progress, notes, and custom tasks in browser `localStorage`.

That means:

- Data stays saved on the same browser and device.
- Data does not automatically sync across devices.
- Clearing browser storage can remove saved notes and progress.

## Future Backend Plan

A production version can add:

- Spring Boot backend
- MySQL or PostgreSQL database
- JWT authentication
- User accounts
- Cloud database using AWS RDS or Azure Database
- Dockerized deployment

That would allow notes, tasks, and progress to be saved permanently for each logged-in user.
