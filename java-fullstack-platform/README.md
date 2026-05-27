# Java Full Stack Learning Platform

Personal learning dashboard for becoming a Java Full Stack Developer with a backend-first focus.

## Folder Structure

```text
java-fullstack-platform/
  index.html
  assets/
    css/
      styles.css
    js/
      app.js
    data/
      platform-data.js
```

## What Each File Does

- `index.html` contains the page layout and app sections.
- `assets/css/styles.css` contains all styling and responsive layout rules.
- `assets/js/app.js` contains navigation, notes, custom tasks, progress tracking, export, and local saving.
- `assets/data/platform-data.js` contains configurable view titles/subtitles.

## How To Run

Open `index.html` directly in a browser.

The app saves progress, notes, and custom tasks in browser `localStorage`. For a future deployed multi-device version, add a Spring Boot backend and a database such as MySQL, AWS RDS, or Azure Database for MySQL.
