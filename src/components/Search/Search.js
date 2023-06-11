import "./Search.css";
import { BsSearch } from "react-icons/bs";

const Search = ({ freeSearch, setFreeSearch }) => {
  const changeInpute = (e) => {
    setFreeSearch(e.target.value);
  };

  return (
    <div className="search">
      <span className="icon">
        <BsSearch />
      </span>
      <input
        autoFocus
        value={freeSearch}
        onChange={changeInpute}
        className="search_input "
        placeholder="Free Search"
      />
    </div>
  );
};

export default Search;
