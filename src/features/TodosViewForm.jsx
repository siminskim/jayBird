import React, { useEffect, useState } from 'react';

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => setQueryString(localQueryString), 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  function preventRefresh(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label>Search Todos</label>
        <input
          type="text"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        ></input>
        <button type="button" onClick={() => setQueryString('')}>
          Clear
        </button>
      </div>

      <div>
        <label htmlFor="sort-by">Sort by</label>
        <select
          onChange={(e) => {
            setSortField(e.target.value);
          }}
          id="sort-by"
          name="sort-by"
        >
          <option value="title">Title</option>
          <option value="createdTime">Time Added</option>
        </select>
        <label htmlFor="direction">Direction</label>
        <select
          id="direction"
          name="direction"
          onChange={(e) => {
            setSortDirection(e.target.value);
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  ); //end of return
}

export default TodosViewForm;
