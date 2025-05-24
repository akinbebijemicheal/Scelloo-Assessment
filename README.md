# Scelloo Assessment - Task API

## Overview

This project is a backend implementation for a simple nodejs application where users can register, create tasks, manage, complete and track tasks associated for user. It uses PostgreSQL as the database with Sequelize ORM and follows a clean and scalable structure using TypeScript and Express.js.

---

## 🔧 Technologies Used

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **ORM**: Sequelize (dialect: PostgreSQL)
* **Language**: TypeScript
* **Authentication**: JWT (JSON Web Token)
* **API Documentation**: Swagger (OAS)

---

## 📌 Features

* User Registration & Authentication
* Task Creation, Management and Tracking
* Admin Management Tools

---

## 🧪 API Routes

### Auth

* `POST /v1/auth/register` - Register a new user
* `POST /v1/auth/login` - User login
* `POST /v1/auth/forgot-password` - Initiate password reset
* `POST /v1/auth/reset-password` - Reset password

### User

* `GET /v1/user` - Get current user info
* `PATCH /v1/user` - Update user profile
* `POST /v1/user/findUsersByUsername` - Search for users by username

### Task

* `POST /v1/task` - Create a new task
* `GET /v1/task` - Get all tasks for current user
* `POST /v1/task/getTaskById` - Get task by ID
* `PATCH /v1/task/updateStatus` - Update task status
* `PATCH /v1/task/start` - Start a task timer
* `PATCH /v1/task/stop` - Stop task timer
* `PATCH /v1/task/complete` - Mark task as complete

### Admin

* `GET /v1/admin/tasks` - Get all tasks (filter by status, user, plan)
* `PATCH /v1/admin/task/complete` - Admin manually complete a task
* `PATCH /v1/admin/user/activate` - Activate a user account
* `PATCH /v1/admin/user/deactivate` - Deactivate a user account

### Global

* `GET /` - Server health check
* `PATCH /sync` - Sync database models with schema

---

## 📘 Documentation

All APIs are documented using Swagger and accessible via `/docs` endpoint once the server is running.

---

## 🛠️ Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your `.env` file with database credentials and JWT secret
5. Start the server: `npm run dev`

---

## ✅ Test Credentials (Optional)

```
email: *****testuser@example.com*****
password: ****Test@1234****
```

---

## 📫 Contact

For any queries or support, reach out to the project maintainer.

---

## License

MIT
