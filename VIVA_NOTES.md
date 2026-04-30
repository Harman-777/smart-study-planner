# Viva Notes

## Project Name

Smart Study Planner

## Problem Statement

Many students forget deadlines, do not track how many hours they study, and cannot easily see which subjects need more attention. This project solves that by providing a simple study planning dashboard.

## Main Modules

1. Task Planner
   - Adds subject-wise study tasks.
   - Stores title, subject, hours, date, and priority.

2. Dashboard
   - Shows pending tasks, completed tasks, total hours, and urgent tasks.
   - Calculates completion percentage.

3. Subject Progress Chart
   - Shows total planned hours for each subject.

4. Focus Timer
   - Provides a 25-minute study timer.

5. Local Storage
   - Saves tasks in the browser even after refreshing the page.

## Important JavaScript Concepts Used

- DOM manipulation
- Event listeners
- Arrays and objects
- Filtering and sorting
- Local storage
- Timer using `setInterval`
- Dynamic chart rendering

## Why This Project Is Useful

It helps students plan better, reduce missed deadlines, and understand their study progress subject by subject.

## Possible Teacher Questions

### Why did you use local storage?

Local storage allows the app to save tasks in the browser without using a database. It is simple and suitable for a minor project.

### What happens when a task is completed?

The task status changes to completed, the dashboard updates, and the completion percentage is recalculated.

### Can this project be expanded?

Yes. It can be expanded with login, cloud database, notifications, PDF export, and detailed reports.

### Which part is dynamic?

The task list, dashboard numbers, subject chart, filters, and timer are all controlled dynamically using JavaScript.
