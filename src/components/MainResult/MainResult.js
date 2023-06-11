import React from "react";
import Chip from "../Chip/Chip";
import _ from "lodash";

import { formatTime } from "../utils";
import { BsClock, BsFlag, BsInfinity } from "react-icons/bs";
import { BiCube } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import "./MainResult.css";

function MainResult({ item }) {
  return (
    <div className="mainResult">
      <div className="mainResultSection">
        <h4>{item.title}</h4>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Chip
            chipText={item.severity}
            chipColor={item.severity}
            chipIcon={<BsFlag />}
          />
          <Chip chipText={item.issueType} chipIcon={<BsInfinity />} />
          <div className="iconLabel">
            <span>
              <BsClock />
            </span>
            Detecred: {formatTime(item.detectedAt)}
          </div>
        </div>
      </div>
      <div className="mainResultSection">
        {!_.isEmpty(item.products) && (
          <div className="iconLabel">
            <span>
              <BiCube />
            </span>
            <div>
              Product Unit:
              {_.map(item.products, (product, index) => (
                <span key={index}> {index > 0 ? `,${product}` : product}</span>
              ))}
            </div>
          </div>
        )}
        {item.owner && (
          <div className="iconLabel">
            <span>
              <GoPerson />
            </span>
            <div>Owner:{item.owner}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainResult;
