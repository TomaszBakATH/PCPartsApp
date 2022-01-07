import React,{useEffect, useState} from "react";
import { useNavigate } from "@reach/router"
import 'draft-js/dist/Draft.css';
import AnnouncementForm from "../components/AnnouncementForm/AnnouncementForm";

const AnnouncementPage = (props) => {
    let navigate  = useNavigate();
    const {name} = props;

    useEffect( ()=>{
        if(!name){
            navigate('/login');
        }
    })

    return (
        <AnnouncementForm id={name}/>
    )

}

export default AnnouncementPage;