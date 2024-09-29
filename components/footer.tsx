import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "3px",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
      }}
    >
      <p className="text-sm">&copy; 2024 naoya. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
