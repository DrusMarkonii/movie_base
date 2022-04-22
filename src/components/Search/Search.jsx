import "./Search.scss";

function Search({ onChange, placeholder }) {
  return (
    <div className="search">
      <span className="searchSpan">
        Search
      </span>
      <input
        className="searchInput"
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Search;
