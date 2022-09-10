import React, {useState} from "react";


function SearchForm({searchFor}){
    const [searchTerm, setSearchTerm] = useState([]);

    function handleSubmit(e){
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined)
        setSearchTerm(searchTerm.trim());
    }

    function handleChange(e){
        setSearchTerm(e.target.value);
    }

    
    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                className="form-control flex-grow-1"
                placeholder="Enter Movie"
                value={searchTerm}
                onChange={handleChange}>
                </input>
                <button type="submit" className="btn btn-primary">Search Movie</button>
            </form>
        </div>
    )
}

export default SearchForm;