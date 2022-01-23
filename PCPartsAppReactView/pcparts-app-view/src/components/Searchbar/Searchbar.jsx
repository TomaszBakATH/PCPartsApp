import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Searchbar.scss';
import axios from "axios";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

const Searchbar = () => {


    const options = [];

    const [category,setCategory] = useState('')
    const [querry,setQuerry] = useState('');
    const [city,setCity] = useState('');
    const [maxPrice,setMaxPrice] = useState(0);
    const [minPrice,setMinPrice] = useState(0);
    const [isSet,setIsSet] = useState(false);
    let navigate = useNavigate();


    useEffect( ()=>{
        axios.get('https://localhost:44321/api/announcement/GetCategories')
            .then((response)=> {
                response.data.categories.forEach(({id,name})=>{
                    options.push({value:id,label:name});
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    },[options])

    const x = () => {
        navigate("/search?querry="+querry+"&city="+city+"&isSet="+isSet.toString()+"&category="+category.toString()+"&minPrice="+minPrice.toString()+"&maxPrice="+maxPrice.toString());
    }

    return (
        <div className='searchbar'>
            <h2>Wyszukaj</h2>
            <div className='searchbar_top'>
                <input type="search" placeholder="Wyszukaj..." onChange={(e)=>{setQuerry(e.target.value)}}/>
                <input type="search" placeholder="Miasto..." onChange={(e)=>{setCity(e.target.value)}}/>
                <label>cena</label>
                <input type="number" placeholder="od" onChange={(e)=>{setMinPrice(e.target.value)}}/>
                <input type="number" placeholder="do" onChange={(e)=>{setMaxPrice(e.target.value)}}/>
            </div>
            <div className='searchbar_top'>
                <label>Czy to zestaw</label>
                <input type="checkbox" placeholder="" className='searchbar_checkbox' onChange={(e)=>{setIsSet(e.target.value)}}/>
                <div className="form-floating">
                    <Dropdown options={options} onChange={(e)=>setCategory(e.label)} value={options[0]} placeholder="Kategoria" />
                </div>
                <button onClick={x} className='btn btn-dark'>Szukaj</button>
            </div>
        </div>
    )
}

export default Searchbar;