import React, { useEffect, useState } from "react";
import Chip from "../Chip/Chip";
import { BsFlag, BsInfinity } from "react-icons/bs";
import Select from "react-select";
import _ from "lodash";
import { getOptions, getFilteredResults } from "../utils";
import "./Filters.css";
import Search from "../Search/Search";
import useDebounce from "../../hooks/useDecounce";

const DELAY = 250;

const styles = {
  multiValue: (base, state) => {
    return { ...base, backgroundColor: "white" };
  },
  multiValueLabel: (base, state) => {
    return {
      ...base,
      fontFamily: "verdana",
      fontWeight: "bold",
      color: "black",
      paddingRight: 6,
    };
  },
  multiValueRemove: (base, state) => {
    return { ...base, display: "none" };
  },
};

function Filters({ data, setItems, resetState }) {
  const [issueTypeArray, setIssueTypeArray] = useState([]);
  const [issueSeverityArray, setIssueSeverityArray] = useState([]);
  const [issueStatusArray, setIssueStatusArray] = useState({
    value: "Open",
    label: "Open",
    key: "status",
  });
  const [freeSearch, setFreeSearch] = useState("");
  const debouncedValue = useDebounce(freeSearch, DELAY); //costume hook

  const issueTypes = _.uniq(_.map(data, "issueType"));
  const issueTypesOptions = getOptions(issueTypes, "issueType");

  const issueSeverity = _.uniq(_.map(data, "severity"));
  const issueSeverityOptions = getOptions(issueSeverity, "severity");

  const issueStatus = _.uniq(_.map(data, "status"));
  const issueStatusOptions = getOptions(issueStatus, "status");

  useEffect(() => {
    const newResults = getFilteredResults(
      data,
      [...issueTypeArray, ...issueSeverityArray, issueStatusArray],
      debouncedValue
    );
    setItems(newResults);
    resetState();
  }, [issueTypeArray, issueSeverityArray, issueStatusArray, debouncedValue]);

  const onIssueTypesChange = (filter) => {
    setIssueTypeArray(filter);
  };

  const onIssueSeverityChange = (filter) => {
    setIssueSeverityArray(filter);
  };

  const onIssueStatusChange = (filter) => {
    setIssueStatusArray(filter);
  };

  return (
    <div>
      <b>Filters</b>
      {_.map(issueTypeArray, (issueType, index) => {
        return (
          <Chip
            key={`${index}-issueType`}
            chipText={issueType.label}
            chipIcon={<BsInfinity />}
          />
        );
      })}
      {_.map(issueSeverityArray, (issueSeverity, index) => {
        return (
          <Chip
            key={`${index}-issueSeverity`}
            chipText={issueSeverity.label}
            chipIcon={<BsFlag />}
          />
        );
      })}

      <div className="selectFilters">
        <div style={{ display: "flex" }} className="selectFilter">
          <Search freeSearch={freeSearch} setFreeSearch={setFreeSearch} />
        </div>
        <div className="selectFilter">
          <p>Type</p>
          <Select
            value={issueTypeArray}
            isMulti
            styles={styles}
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onIssueTypesChange}
            options={issueTypesOptions}
          />
        </div>
        <div className="selectFilter">
          <p>Severity</p>
          <Select
            value={issueSeverityArray}
            isMulti
            styles={styles}
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onIssueSeverityChange}
            options={issueSeverityOptions}
          />
        </div>
        <div className="selectFilter">
          <p>Status</p>
          <Select
            value={issueStatusArray}
            isMulti={false}
            styles={styles}
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onIssueStatusChange}
            options={issueStatusOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
