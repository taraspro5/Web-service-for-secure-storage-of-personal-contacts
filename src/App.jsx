import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import { refreshUser } from "./redux/auth/authOperations";
import { WelcomePage } from "./pages/WelcomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute redirectTo="/signin" component={<DashboardPage />} />
        }
      />
      <Route
        path="/signup"
        element={
          <RestrictedRoute redirectTo="/dashboard" component={<SignupPage />} />
        }
      />
      <Route
        path="/signin"
        element={
          <RestrictedRoute redirectTo="/dashboard" component={<SigninPage />} />
        }
      />
    </Routes>
  );
}

export default App;
