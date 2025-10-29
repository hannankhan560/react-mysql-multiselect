# React MySQL Multiselect Demo

This is a **MERN-style demo** project using **React**, **React Hook Form**, **React-Select**, and **MariaDB** (MySQL) instead of MongoDB.

The demo demonstrates a multiselect combo-box where users can select multiple colors. Selections are stored as a comma-separated string in the database and can be loaded, saved, and cleared. It’s a simple proof-of-concept designed for easy integration into your stack.

---

## Table of Contents

* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Database Setup](#database-setup)
* [Running the Server](#running-the-server)
* [Database Tables](#database-tables)
* [API Endpoints](#api-endpoints)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/hannankhan560/react-mysql-multiselect.git
```

2. Navigate to the backend folder:

```bash
cd ./backend
```

3. Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=demo_app
PORT=8080
```

> Adjust the values according to your MariaDB setup.

---

## Database Setup

The database and tables can be initialized automatically using the `initDB.js` script.

1. Run the init script:

```bash
node src/initDB.js
```

2. This will:

* Create the database `demo_app` (if it doesn't exist)
* Create the `colors` table and insert initial colors
* Create the `user_choices` table and insert a default row

> You only need to run this script **once**.

---

## Running the Server

Start the backend server with:

```bash
npm run dev
```

* Server will run on `http://localhost:8080`
* After the backend is running, navigate to the frontend folder and start it:

```bash
cd ./frontend
```
```bash
npm install
```
```bash
npm run dev
```
* Server will run on `http://localhost:5137`

* Now both backend and frontend will be running.

---

## Database Tables

### colors

| Column | Type         | Description                 |
| ------ | ------------ | --------------------------- |
| id     | INT          | Primary Key, auto-increment |
| name   | VARCHAR(100) | Name of the color           |

Initial values: `Red, Blue, Green, Yellow, Orange, Purple`

### user_choices

| Column             | Type         | Description                     |
| ------------------ | ------------ | ------------------------------- |
| id                 | INT          | Primary Key, auto-increment     |
| selected_color_ids | VARCHAR(200) | Comma-separated selected colors |

Initial value: `NULL`

---

## API Endpoints

### GET /

* Returns a simple message to check if the backend is running.

```json
{
  "message": "Backend is running!"
}
```

> You can add more endpoints for CRUD operations on `colors` and `user_choices` as needed.

---

## Notes

* Make sure **MariaDB/XAMPP** is running before starting the backend.
* The `initDB.js` script is safe to run multiple times; it will not duplicate data.
