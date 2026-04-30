# Viva Notes

## Project Name

Smart Study Planner AI

## Problem Statement

Many students forget deadlines, do not track how many hours they study, and cannot easily see which subjects need more attention. This project solves that by providing an AI-assisted study planning dashboard.

## Main Modules

1. Task Planner
   - Adds subject-wise study tasks.
   - Stores title, subject, hours, date, and priority.

2. Dashboard
   - Shows pending tasks, completed tasks, total hours, and urgent tasks.
   - Calculates completion percentage.

3. AI Coach
   - Scores tasks using priority, due date, and estimated hours.
   - Recommends the next best task.
   - Detects weak subjects.
   - Generates a 7-day adaptive study plan.

4. Subject Progress Chart
   - Shows total planned hours for each subject.

5. Focus Timer
   - Provides a 25-minute study timer.

6. Local Storage
   - Saves tasks in the browser even after refreshing the page.

## Important JavaScript Concepts Used

- DOM manipulation
- Event listeners
- Arrays and objects
- Filtering and sorting
- Local storage
- Timer using `setInterval`
- Dynamic chart rendering
- Rule-based AI recommendation system
- Urgency scoring algorithm

## Why This Project Is Useful

It helps students plan better, reduce missed deadlines, understand weak subjects, and decide which task should be completed first.

## How Is AI Used?

The project uses a rule-based AI approach. It calculates an AI score for each task based on:

- Priority
- Due date
- Estimated study hours

The task with the highest score is recommended as the next best task. The app also checks subject-wise pending hours to detect weak areas.

## Possible Teacher Questions

### Why did you use local storage?

Local storage allows the app to save tasks in the browser without using a database. It is simple and suitable for a minor project.

### What happens when a task is completed?

The task status changes to completed, the dashboard updates, and the completion percentage is recalculated.

### Can this project be expanded?

Yes. It can be expanded with login, cloud database, notifications, PDF export, detailed reports, and a real AI API for natural language guidance.

### Which part is dynamic?

The task list, dashboard numbers, subject chart, filters, and timer are all controlled dynamically using JavaScript.

### Is this real AI?

It is an AI-inspired rule-based recommendation system. It does not use a paid API, but it follows AI decision-making ideas such as scoring, ranking, and personalized recommendations.
