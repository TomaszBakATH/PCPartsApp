import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CategoryTile.scss';
import axios from "axios";

const CategoryTile = (props) => {

    const {name, reversed,image} = props;

    let navigate = useNavigate();
    const x = () => {
      navigate("/search?querry=&city=&isSet=false&category="+name+"&minPrice=0&maxPrice=0")
    }

    return (
        <div className={reversed} onClick={x}>
            {
                image
                    ?<img className='category-tile_image' src={"https://localhost:44321/images/"+image}/>
                    :<img className='category-tile_image' src={process.env.PUBLIC_URL + '/homepage-background.png'}/>
            }
            <h3>{name}</h3>
        </div>
    )
}

export default CategoryTile;