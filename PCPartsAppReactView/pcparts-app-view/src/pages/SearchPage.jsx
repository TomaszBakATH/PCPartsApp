import React from "react";
import Searchbar from "../components/Searchbar/Searchbar";
import SearchResults from "../components/SearchResults/SearchResults";

const SearchPage = () => {

    return (
        <div>
            <Searchbar />
            <SearchResults />
        </div>
    );
}

export default SearchPage;