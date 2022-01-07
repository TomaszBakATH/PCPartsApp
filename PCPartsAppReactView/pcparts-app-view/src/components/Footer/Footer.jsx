import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Footer.scss';
import AnnouncementSpecs from "../AnnouncementSpecs/AnnouncementSpecs";

const Footer = () => {

    return (
        <div className='footer'>
            <p>©Tomasz Bąk</p>
        </div>
    )
}

export default Footer;