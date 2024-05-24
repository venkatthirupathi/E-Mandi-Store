import React from "react";
import "../component.css/FooterComponent.css";
const FooterComponent: React.FC = () => {
  return (
    <>
      <footer className="footer sticky-bottom bg-dark text-white mt-auto py-3">
        <div className="container text-center">
          <span className="text-muted">
            © 2024 E-mandi.Co . All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default FooterComponent;
