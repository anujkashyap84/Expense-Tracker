# 💰 Smart Expense Tracker

A full-stack personal finance management web application that helps users manage income and expenses, monitor financial activities, track savings, and understand spending habits through an interactive dashboard.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login
- Protected application routes
- JWT-based authentication
- Secure user authentication flow

### 💵 Income Management
- Add new income records
- Edit existing income
- Delete income records
- Categorize income
- View income history
- Export income data to Excel

### 💸 Expense Management
- Add new expense records
- Edit existing expenses
- Delete expense records
- Categorize expenses
- View expense history
- Export expense data to Excel

### 📊 Interactive Dashboard
- Total balance
- Total income
- Total expenses
- Total savings
- Savings rate
- Financial overview
- Spending by category
- Recent transactions
- Daily, weekly, and monthly financial views

### 📅 Transaction Date Management
- Past transaction dates are allowed
- Today's date is allowed
- Future dates are disabled
- Transaction dates use Indian Standard Time (IST)

### 📱 Responsive Design
- Desktop-friendly interface
- Tablet support
- Mobile-friendly layout
- Responsive sidebar and navigation

### 🆘 Support Center
- Support center
- Frequently asked questions
- Helpful resources
- Contact support option

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Lucide React
- Vite
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Tools & Deployment
- VS Code
- Git
- GitHub
- MongoDB
- Vercel (Frontend Deployment)
- Render (Backend Deployment)

---

## 📦 Key Dependencies

### 🎨 Frontend Dependencies

| Package | Purpose |
|---|---|
| React | Building interactive user interfaces |
| React DOM | Rendering React components |
| React Router DOM | Client-side routing and navigation |
| Axios | Making HTTP requests to backend APIs |
| Tailwind CSS | Responsive UI styling |
| @tailwindcss/vite | Tailwind CSS integration with Vite |
| Recharts | Financial data visualization and charts |
| Lucide React | Modern icons |
| Framer Motion | UI animations and transitions |
| React Modal | Creating modal dialogs |
| React Toastify | Displaying notifications and alerts |
| XLSX | Exporting financial data to Excel |
| Vite | Frontend development server and build tool |

### ⚙️ Backend Dependencies

| Package | Purpose |
|---|---|
| Express | Building REST APIs |
| Mongoose | MongoDB object modeling and database operations |
| Bcrypt.js | Password hashing |
| JSON Web Token | User authentication and authorization |
| CORS | Managing cross-origin requests |
| Dotenv | Managing environment variables |
| Body Parser | Parsing incoming request bodies |
| Validator | Validating and sanitizing data |
| XLSX | Generating Excel files |
| Nodemon | Automatically restarting the server during development |

### 🧰 Development Dependencies

**Frontend**
- ESLint – Code quality and linting
- @eslint/js – ESLint JavaScript configuration
- @vitejs/plugin-react – React integration with Vite
- eslint-plugin-react-hooks – React Hooks linting rules
- eslint-plugin-react-refresh – React Fast Refresh linting
- globals – Global variable definitions
- @types/react – React type definitions
- @types/react-dom – React DOM type definitions
 ---

## 📁 Project Structure


Expense-Tracker/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md


---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB account or local MongoDB installation
- Git

### 1. Clone the Repository

bash
git clone https://github.com/anujkashyap84/Expense-Tracker


Navigate to the project directory:

bash
cd Expense-Tracker


### 2. Backend Setup

Navigate to the backend directory:

bash
cd backend


Install dependencies:

bash
npm install


Create a `.env` file in the backend directory:

env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

bash
npm run dev


### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

bash
cd frontend


Install dependencies:

bash
npm install


Create a `.env` file if required:

env
VITE_API_URL=http://localhost:4000/api


Start the frontend development server:

bash
npm run dev


Open the local URL provided by Vite in your browser.

---

## 🌐 Deployment

The application can be deployed using the following services:

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

### Live Demo

- https://expense-tracker-six-pi-78.vercel.app/login
---

## 🔮 Future Improvements

Planned enhancements for the project:

- AI-powered expense insights
- Monthly budget planning
- Smart spending recommendations
- Advanced financial analytics
- Personalized financial suggestions
- Automated expense categorization

---

## 👨‍💻 Author

**Anuj Kumar Kashyap**

B.Tech Computer Science Student | Aspiring Full-Stack Developer

- GitHub: [anujkashyap84](https://github.com/anujkashyap84)
- LinkedIn: [Anuj Kumar Kashyap](https://www.linkedin.com/in/anujkashyap84/)

---

## ⭐ Support

If you find this project useful or interesting, consider giving it a ⭐ on GitHub.

Thank you for visiting **Smart Expense Tracker!**        
