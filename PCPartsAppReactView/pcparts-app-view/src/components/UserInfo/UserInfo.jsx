import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './UserInfo.scss';
import AnnouncementSpecs from "../AnnouncementSpecs/AnnouncementSpecs";
import dateFormat from "dateformat";

const UserInfo = (props) => {

    const [showEmail,setShowEmail] = useState(false);
    const [showNumber,setShowNumber] = useState(false);

    const {city,email,imagePath,joinDate, nickname,number} = props;
    //const number = 213321;

    return (
        <div className='user-info'>
            {
                imagePath
                    ?<img className='user-info_image' src={"https://localhost:44321/images/"+imagePath} />
                    :<img className='user-info_image' src={process.env.PUBLIC_URL + '/user-unknown.png'} />
            }
            <h1>{nickname}</h1>
            <h3>Dołączył: {dateFormat(joinDate, "dd.mm.yyyy").toString()}</h3>
            <h3>Miejscowość: {city}</h3>
            <div className='announcement-owner-info_button' onClick={()=>{setShowNumber(!showNumber)}}>{showNumber?number.toString():"Pokaż numer"}</div>
            <div className='announcement-owner-info_button' onClick={()=>{setShowEmail(!showEmail)}}>{showEmail?email:"Pokaż E-mail"}</div>
        </div>
    )
}

export default UserInfo;