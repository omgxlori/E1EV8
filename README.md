# E1EV8 Habit Tracker

E1EV8 is a personal habit and wellness tracker designed to help you build positive routines, stay motivated, and achieve your goals. The numbers 1 and 8 are in the name because it takes a minimum of 18 days to form a habit, and it reflects the idea of lifting yourself to a better version - elevating your habits, mindset, and overall wellness.


## Features
- **User Authentication:** Users can create an account, log in, and manage their profile.
- **Habit Tracking:** Users can add, update, and track their habits.
- **Progress Visualization:** See your progress over time with easy-to-read charts and statistics.
- **Database Integration:** Habit data is stored in a PostgreSQL database for reliable tracking and retrieval.

## Technologies Used
**Frontend:** React.js, HTML, CSS
**Backend:** Node.js, Express.js
**Database:** PostgreSQL, Sequelize ORM
**Authentication:** JWT (JSON Web Tokens)

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

5. Run the app:
Start the server and the frontend application:

```md
npm start
```

The app should now be running on http://localhost:5000.

## Usage

- **Register / Log In:** To start tracking habits, register a new account or log in to an existing one.
You will be redirected to the main dashboard after logging in.
- **Adding Habits:** From the dashboard, click the "Add Habit" button.
Fill in the habit name and set the frequency (daily, weekly, etc.).
Once added, the habit will be visible on your dashboard.
- **Tracking Progress:**
Mark each habit as completed every day or week, depending on your habit's frequency.
View your progress on a calendar or through visual stats.

## Future Developments

- Evolving E1EV8 into a well-rounded wellness app that includes a mood tracker, journaling/blogging page for self-reflection, and a milestones page where user can view habit data overtime on the front-end

- Achievements for reaching milestones displayed with award emoticons, words of affirmation, etc.

- Implementing reminders via email or push notifications to motivate users to continue positive, healthy habits

- Adding customizable themes for a more personalized experience

- Add calendar integration to sync habits with Google calendar

## License
This project is licensed under the MIT License - see the LICENSE file for details.