import React from "react"


function TodosViewForm ({ sortDirection, setSortDirection, sortField, setSortField }) {
    function preventRefresh(e) {
        e.preventDefault()
    }
return (
<form onSubmit={preventRefresh}>
    <div>
        <label htmlFor="sort-by">Sort by</label>
        <select onChange={(e) => {setSortField(e.target.value)}} id="sort-by" name="sort-by">
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
        </select>
        <label htmlFor="direction">Direction</label>
        <select id="direction" name="direction" onChange={(e) => {setSortDirection(e.target.value)}}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
        </select>
    </div>
</form >
)//end of return

}

export default TodosViewForm