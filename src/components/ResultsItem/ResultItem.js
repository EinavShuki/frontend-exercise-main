import React from "react";
import "./ResultItem.css";
import { formatTime } from "../utils";
import { BsClock, BsFlag, BsInfinity } from "react-icons/bs";
import Chip from "../Chip/Chip";

function ResultItem({ item, isSelected }) {
  return (
    <div className={`resultItem ${isSelected && "selected"}`}>
      <h5>{item.title}</h5>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "gray",
          fontSize: "11px",
        }}
        className="resultItemTime"
      >
        <span>
          <BsClock />
        </span>
        Detecred: {formatTime(item.detectedAt)}
      </div>
      <Chip
        chipText={item.severity}
        chipColor={item.severity}
        chipIcon={<BsFlag />}
      />
      <Chip chipText={item.issueType} chipIcon={<BsInfinity />} />
    </div>
  );
}

export default ResultItem;
