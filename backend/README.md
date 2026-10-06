# Smart Expense Tracker - Backend

Backend API for the Smart Expense Tracker built with **Node.js, Express.js, MongoDB, and JWT Authentication**.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST API

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/anujkashyap84/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Go to Backend

```bash
cd backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file inside the `backend` folder.

Add:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace:

- `your_mongodb_connection_string` with your MongoDB connection string.
- `your_jwt_secret` with a secure JWT secret key.

### 5. Start the Backend

For development:

```bash
npm start
```

The backend API will run at:

```text
http://localhost:4000/api
```

## 📂 Project Structure

```text
backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── .env
├── package.json
└── server.js
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port on which the backend server runs |
| `MONGO_URI` | MongoDB database connection string |
| `JWT_SECRET` | Secret key used for JWT authentication |

## ⚠️ Important

Do not upload your `.env` file to GitHub.

Make sure your `.gitignore` contains:

```gitignore
.env
.env.*
!.env.example
```

## 🔗 API Base URL

```text
http://localhost:4000/api
```

The frontend uses this URL to communicate with the backend.

## 🚀 Development

Start the backend server:

```bash
npm start
```

Once the server starts successfully, the API will be available at:

```text
http://localhost:4000/api
```

## 👨‍💻 Author

**Anuj Kumar Kashyap**

GitHub: https://github.com/anujkashyap84
