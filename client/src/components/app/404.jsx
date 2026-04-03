import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../../assets/notfound.svg"; // keep your original image import

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={NotFoundImage} alt="Page Not Found" style={{ maxWidth: 400, marginBottom: 20 }} />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/home">Go Home</Link>
    </div>
  );
};

export default NotFound;
