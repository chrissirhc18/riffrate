import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
/* eslint-disable react-refresh/only-export-components */ 

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      // Store username in sessionStorage for backward compatibility
      sessionStorage.setItem("username", user.email || user.displayName || "User");
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      sessionStorage.removeItem("username");
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    setCurrentUser,
    setUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}