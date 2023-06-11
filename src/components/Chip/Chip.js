import React from "react";
import "./Chip.css";
import _ from "lodash";

const COLORS_PALLETE = {
  Low: "#f1f1f1",
  Medium: "#ffa500b0",
  High: "#ff00009c",
  Critical: "#ff0101",
};

function Chip({ chipText, chipColor, chipIcon }) {
  const color = COLORS_PALLETE[_.capitalize(chipColor)] || "#f1f1f1";

  return (
    <div
      className="chip"
      style={{
        backgroundColor: color,
      }}
    >
      <span className="chipIcon">{chipIcon}</span>
      {chipText}
    </div>
  );
}

export default Chip;
