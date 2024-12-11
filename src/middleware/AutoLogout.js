import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000;
      const remainingTime = expirationTime - Date.now();

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("rol");
          navigate("/");
        }, remainingTime);

        return () => clearTimeout(timer);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        navigate("/");
      }
    }
  }, [navigate]);

  return null;
};

export default AutoLogout;
