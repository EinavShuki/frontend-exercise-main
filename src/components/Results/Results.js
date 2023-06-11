import React from "react";
import _ from "lodash";
import "./Results.css";
import ResultItem from "../ResultsItem/ResultItem";
function Results({ items, setSelectedItem, selectedItem, page, itemsPerPage }) {
  const offsetPage = page * itemsPerPage;
  const currentItems = items.slice(
    offsetPage,
    Math.min(offsetPage + itemsPerPage, _.size(items))
  );
  return (
    <div>
      {currentItems && (
        <div>
          <div style={{ padding: " 0.5rem" }}>{_.size(items)} Results</div>
          <div className="resultGrid">
            <div>
              {_.map(currentItems, (item) => {
                const isSelected = item.id === selectedItem?.id;
                return (
                  <div key={item?.id} onClick={() => setSelectedItem(item)}>
                    <ResultItem item={item} isSelected={isSelected} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
