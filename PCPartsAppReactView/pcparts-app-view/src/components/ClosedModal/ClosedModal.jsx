import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ClosedModal.scss';
import AnnouncementSpecs from "../AnnouncementSpecs/AnnouncementSpecs";

const ClosedModal = (props) => {


    return (
        <div className='closed-modal'>
            <h1>Ogloszenie zakończone</h1>
        </div>
    )
}

export default ClosedModal;