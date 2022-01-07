import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './AnnouncementSpecs.scss';

const AnnouncementSpecs = (props) => {

    const {name,value} = props;

    return (
        <div className='announcement-specs'>
            <div className='announcement-specs_wrapper'>
                <div className='announcement-specs_spec'>
                    <p>{name}</p>
                </div>
                <div className='announcement-specs_spec'>
                    <p>{value}</p>
                </div>
            </div>
           <hr/>
        </div>
    )
}

export default AnnouncementSpecs;