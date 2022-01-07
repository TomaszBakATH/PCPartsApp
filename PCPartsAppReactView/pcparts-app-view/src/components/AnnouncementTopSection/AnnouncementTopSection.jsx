import React,{useEffect, useState} from "react";
import { useNavigate } from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './AnnouncementTopSection.scss';
import AnnouncementPhoto from "../AnnouncementPhoto/AnnouncementPhoto";
import AnnouncementOwnerInfo from "../AnnouncementOwnerInfo/AnnouncementOwnerInfo";

const AnnouncementTopSection = (props) => {

    const {owner,images,info,name,announcementId} = props;

    return (
        <div className='announcement-top-section'>
            <AnnouncementPhoto images={images} mobile={false}/>
            <AnnouncementOwnerInfo images={images} owner={owner} info={info} name={name} announcementId={announcementId}/>
        </div>
    )
}

export default AnnouncementTopSection;