import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { isTokenValid, getToken } from "../../utils/jwtUtil";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
      authService.logout();
      navigate("/login"); // Redirect to login if token is invalid or expired
    } else {
      const tokenExpirationTime =
        JSON.parse(atob(token.split(".")[1])).exp * 1000 - Date.now();
      const timeoutId = setTimeout(() => {
        authService.logout();
        navigate("/login");
      }, tokenExpirationTime);

      return () => clearTimeout(timeoutId); // Cleanup on unmount
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
