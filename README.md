# E1EV8 Habit Tracker

E1EV8 Habit Tracker is a web-based application designed to help users track and maintain their daily habits. It allows users to log their habits, track their progress, and stay motivated as they work towards their goals.

## Features
User Authentication: Users can create an account, log in, and manage their profile.
Habit Tracking: Users can add, update, and track their habits.
Progress Visualization: See your progress over time with easy-to-read charts and statistics.
Database Integration: Habit data is stored in a PostgreSQL database for reliable tracking and retrieval.

## Tech Stack
Frontend: React.js, HTML, CSS
Backend: Node.js, Express.js
Database: PostgreSQL
ORM: Sequelize
Authentication: JWT (JSON Web Tokens)

## Installation
Follow these steps to get your development environment up and running.

1. Clone the repository

```md
git clone https://github.com/yourusername/e1ev8-habit-tracker.git
```

2. Install dependencies: Navigate into the project folder and install the required dependencies.

```md
cd e1ev8-habit-tracker
npm install
```

3. Set up the database: Ensure you have PostgreSQL installed locally or use a cloud database service. Create a new database for the app, for example:

```md
CREATE DATABASE users_db;
```

Then configure your .env file with the appropriate database credentials (username, password, host, etc.).

4. Run database migrations
Run the following command to apply the necessary database migrations:

npx sequelize-cli db:migrate
5. Run the app
Start the server and the frontend application:

npm start
The app should now be running on http://localhost:5000.

Usage
Register / Log In
To start tracking habits, register a new account or log in to an existing one.
You will be redirected to the main dashboard after logging in.
Adding Habits
From the dashboard, click the "Add Habit" button.
Fill in the habit name and set the frequency (daily, weekly, etc.).
Once added, the habit will be visible on your dashboard.
Tracking Progress
Mark each habit as completed every day or week, depending on your habit's frequency.
View your progress on a calendar or through visual stats.
Testing
Run the tests to ensure everything is working properly.

npm run test
License
This project is licensed under the MIT License - see the LICENSE file for details.