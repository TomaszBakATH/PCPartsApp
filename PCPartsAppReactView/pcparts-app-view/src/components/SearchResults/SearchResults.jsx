import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './SearchResults.scss';
import axios from "axios";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import AnnouncementTile from "../AnnouncementTile/AnnouncementTile";

const SearchResults = () => {

    const initialData = {
        addDate: "20-20-2123",
        description: "",
        id: 0,
        imagePath: [],
        title:"sample titile"
    }

    const initialArray = [
        initialData,
        initialData,
        initialData,
        initialData,
    ]

    const [announcements, setAnnouncements] = useState(initialArray)

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let url = useQuery();
    useEffect( ()=>{

        let querry = url.get("querry")
        let city = url.get("city")
        let category = url.get("category")
        let maxPrice =  parseInt(url.get("maxPrice"), 10)?parseInt(url.get("maxPrice"), 10):0
        let minPrice =  parseInt(url.get("minPrice"), 10)?parseInt(url.get("minPrice"), 10):0
        let isSet = url.get("isSet")=="on"?true:false

        axios.post("https://localhost:44321/api/announcement/Search",
            {
                querry,
                isSet,
                category,
                maxPrice,
                minPrice,
                city
            })
            .then(function (response) {
                setAnnouncements(response.data.announcements);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    },[url])


    return (
        <div className='search-results'>
            <h2 className='search-results_text'>Wyniki wyszukiwania</h2>
            <div className='search-results_wrapper'>
                {announcements.length>0?announcements.map(({title,addDate,imagePath,id})=>{
                    return <AnnouncementTile search={true} title={title} addDate={addDate} imagePath={imagePath} id={id}/>
                })
                    :<h2>Brak wyników</h2>
                }
            </div>
        </div>
    )
}

export default SearchResults;