import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from "axios";
import Income from "./pages/income";
import Expenses from "./pages/Expense";
import Expense from "./pages/Expense";
import Profile from "./pages/Profile";

import Support from "./pages/Support";

const API_URL = "http://localhost:4000";

// Get transactions from local storage
const getTransactionsFromStorage = () => {
  try {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Error parsing transactions:", err);
    return [];
  }
};

// Protected Route
const ProtectedRoute = ({ user, children }) => {
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");

  const hasToken = localToken || sessionToken;

  if (!user || !hasToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return null;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Persist authentication
  const persistAuth = (userObj, tokenStr, remember = false) => {
    try {
      if (remember) {
        if (userObj) {
          localStorage.setItem("user", JSON.stringify(userObj));
        }

        if (tokenStr) {
          localStorage.setItem("token", tokenStr);
        }

        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      } else {
        if (userObj) {
          sessionStorage.setItem("user", JSON.stringify(userObj));
        }

        if (tokenStr) {
          sessionStorage.setItem("token", tokenStr);
        }

        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }

      setUser(userObj || null);
      setToken(tokenStr || null);
    } catch (err) {
      console.error("persistAuth error:", err);
    }
  };

  // Clear authentication
  const clearAuth = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } catch (err) {
      console.error("clearAuth error:", err);
    }

    setUser(null);
    setToken(null);
  };

  // Update user data
  const updateUserData = (updatedUser) => {
    setUser(updatedUser);

    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");

    if (localToken) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else if (sessionToken) {
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Bootstrap authentication
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const localUserRaw = localStorage.getItem("user");
        const sessionUserRaw = sessionStorage.getItem("user");

        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");

        const storedUser = localUserRaw
          ? JSON.parse(localUserRaw)
          : sessionUserRaw
            ? JSON.parse(sessionUserRaw)
            : null;

        const storedToken = localToken || sessionToken || null;

        const tokenFromLocal = !!localToken;

        // Load stored user
        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
          return;
        }

        // Fetch profile if token exists
        if (storedToken) {
          try {
            const res = await axios.get(`${API_URL}/api/user/me`, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            });

            const profile = res.data;

            persistAuth(profile, storedToken, tokenFromLocal);
          } catch (fetchErr) {
            console.warn(
              "Could not fetch profile with stored token:",
              fetchErr,
            );

            clearAuth();
          }
        } else {
          clearAuth();
        }
      } catch (err) {
        console.error("Error bootstrapping auth:", err);

        clearAuth();
      } finally {
        setIsLoading(false);

        try {
          setTransactions(getTransactionsFromStorage());
        } catch (txErr) {
          console.error("Error loading transactions:", txErr);
        }
      }
    };

    bootstrapAuth();
  }, []);

  // Save transactions to local storage
  useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    } catch (err) {
      console.error("Error saving transactions:", err);
    }
  }, [transactions]);

  // Login
  const handleLogin = (userData, remember = false, tokenFromApi = null) => {
    persistAuth(userData, tokenFromApi, remember);

    navigate("/");
  };

  // Signup
  const handleSignup = (userData, remember = false, tokenFromApi = null) => {
    persistAuth(userData, tokenFromApi, remember);

    navigate("/");
  };

  // Logout
  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  // Transaction helpers
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...updatedTransaction, id } : t)),
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshTransactions = () => {
    setTransactions(getTransactionsFromStorage());
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>

          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute user={user}>
              <Layout
                user={user}
                onLogout={handleLogout}
                transactions={transactions}
                addTransaction={addTransaction}
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
                refreshTransactions={refreshTransactions}
              />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <Dashboard
                user={user}
                transactions={transactions}
                addTransaction={addTransaction}
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
                refreshTransactions={refreshTransactions}
              />
            }
          />
          <Route
            path="/income"
            element={
              <Income
                transactions={transactions}
                addTransaction={addTransaction}
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
                refreshTransactions={refreshTransactions}
              />
            }
          />
          <Route
            path="/expense"
            element={
              <Expense
                transactions={transactions}
                addTransaction={addTransaction}
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
                refreshTransactions={refreshTransactions}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                onUpdateProfile={updateUserData}
                onLogout={handleLogout}
              />
            }
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />

        <Route path="/support" element={<Support />} />
      </Routes>
    </>
  );
};

export default App;
