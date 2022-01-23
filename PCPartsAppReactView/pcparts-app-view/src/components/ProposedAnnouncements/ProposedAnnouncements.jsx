import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ProposedAnnouncements.scss';
import axios from "axios";
import AnnouncementTile from "../AnnouncementTile/AnnouncementTile";

const ProposedAnnouncements = () => {

    const initialData = {
        addDate: "20-20-2123",
        description: "",
        id: 0,
        imagePath: [],
        title:"sample titile",
        price:''
    }

    const initialArray = [
        initialData,
        initialData,
        initialData,
        initialData,
    ]

    const [announcements, setAnnouncements] = useState(initialArray)

    useEffect( ()=>{
        axios.get('https://localhost:44321/api/announcement/get/'+10)
            .then((response)=> {

                setAnnouncements(response.data.announcements);
            })
            .catch(function (error) {
                console.log("err",error);
            })
    },[])

    const x = () => {

    }

    return (
        <div className='proposed-announcements' onClick={x}>
            <h2>Proponawanie dla ciebie</h2>
            <div className='proposed-announcements_wrapper'>
                {announcements.map(({title,addDate,imagePath,id,price})=>{
                    return <AnnouncementTile title={title} addDate={addDate} imagePath={imagePath} id={id} price={price}/>
                })}
            </div>
        </div>

    )
}

export default ProposedAnnouncements;