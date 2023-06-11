import React from "react";
import "./Card.css";

function Card({ children, style }) {
  return (
    <div style={style} className="card">
      {children}
    </div>
  );
}

export default Card;
