import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './AnnouncementProduct.scss';
import AnnouncementSpecs from "../AnnouncementSpecs/AnnouncementSpecs";

const AnnouncementProduct = (props) => {

    const {name,category,params} = props;
    const{name:categoryName} = category;
    return (
        <div className='announcement-product'>
            <h2>{name}</h2>
            <h5>{categoryName}</h5>

            <hr/>
            {params.map(({name,value})=>{
                return (
                    <AnnouncementSpecs name={name} value={value}/>
                )
            })}
        </div>
    )
}

export default AnnouncementProduct;