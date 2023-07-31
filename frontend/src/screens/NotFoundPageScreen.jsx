import React from "react";
import { Link } from "react-router-dom";

const NotFoundPageScreen = () => {
  return (
    <div style={{ color: "#e7eff6", textAlign: "center" }}>
      <h1>404 Not Found!</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-light my-3">
        Home Page
      </Link>
    </div>
  );
};

export default NotFoundPageScreen;
