import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CategoryList.scss';
import axios from "axios";
import CategoryTile from "../CategoryTile/CategoryTile";

const CategoryList = () => {

    const options = [];

    const [categories,setCategories] = useState([]);

    useEffect( ()=>{
        axios.get('https://localhost:44321/api/announcement/GetCategories')
            .then((response)=> {
                setCategories(response.data.categories);
            })
            .catch(function (error) {
                console.log(error);
            })
    },[])

    const x = (index) => {
      if(index % 2 === 0){
          return "category-tile";
      }else{
          return "category-tile";
      }
    }

    return (
        <div className='category-list'>
            <h2>Kategorie</h2>
            <div className='category-list_wrapper'>
                {categories.map(({name,imagePath}, index)=>{
                   return <CategoryTile name={name} reversed={x(index)} image={imagePath}/>
                })}
            </div>
        </div>
    )
}

export default CategoryList;