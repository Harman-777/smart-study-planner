# Smart Study Planner AI

Smart Study Planner AI is a minor project made for students who want to organize daily study tasks, track subject-wise study hours, and get AI-style recommendations for exam preparation.

## Project Objective

The objective of this project is to create an AI-assisted study planning dashboard. The app helps students add tasks, measure urgency, identify weak subjects, generate a weekly plan, and track study progress.

## Features

- Add study tasks with subject, due date, priority, and estimated hours.
- AI-style urgency score for every pending task.
- Personal AI Coach section with risk level, next best task, and weak subject detection.
- Auto-generated 7-day adaptive study plan.
- Mark tasks as completed.
- Delete tasks that are no longer needed.
- Filter tasks by all, pending, completed, or high priority.
- View dashboard statistics for pending tasks, completed tasks, high-priority tasks, and total planned study hours.
- See subject-wise study hours in a simple bar chart.
- Use a 25-minute focus timer for study sessions.
- Save data automatically in browser local storage.
- Responsive layout for desktop and mobile screens.

## Technologies Used

- HTML for page structure.
- CSS for layout, styling, and responsive design.
- JavaScript for task management, dashboard calculations, timer logic, and local storage.
- Rule-based AI logic for scoring, recommendation, weak-area detection, and schedule generation.

## How To Run

Open `index.html` in any modern web browser.

No installation, internet connection, or server is required.

## How It Works

1. The student enters a study task using the planner form.
2. JavaScript stores the task in the browser using local storage.
3. The AI scoring system calculates urgency using priority, due date, and estimated hours.
4. The AI Coach recommends the next best task and detects the weakest subject.
5. The generated weekly plan distributes important pending tasks across seven days.
6. The dashboard updates automatically when tasks are added, completed, deleted, or filtered.
7. The subject chart calculates total planned hours for each subject.
8. The focus timer helps the student study in a timed session.

## AI Logic Used

This project does not require a paid AI API. It uses a transparent rule-based AI approach:

- Priority score: high priority tasks receive more weight.
- Deadline score: tasks closer to the due date receive more urgency.
- Effort score: longer tasks receive extra planning weight.
- Weak subject detection: subjects with high pending hours and high-priority tasks are marked as weak areas.
- Recommendation engine: tasks are sorted by AI score to suggest what the student should do next.

## Future Scope

- Add login system for multiple users.
- Connect with a real AI API for natural language study advice.
- Add notifications before task due dates.
- Export the study plan as a PDF.
- Add weekly and monthly progress reports.
- Add dark mode.

## Conclusion

This project shows how a practical AI-assisted student productivity tool can be built using basic web technologies. It demonstrates form handling, DOM manipulation, data persistence, filtering, calculations, charts, recommendation logic, and responsive design.
