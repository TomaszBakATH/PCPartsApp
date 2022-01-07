import React,{useEffect, useState} from "react";
import { useNavigate } from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './AnnouncementPhoto.scss';

const AnnouncementPhoto = (props) => {

    const {images,mobile} = props;

    const x = () => {
        if(mobile){
            return 'announcement-photo announcement-photo--mobile'
        }else{
            return 'announcement-photo announcement-photo--desktop'
        }
    }

    return (
        <div className={x()}>
            <div className='announcement-photo_wrapper'>
                <Carousel  infiniteLoop={true} thumbWidth={50} swipeable={true} >
                    {images.length>0?
                        images.map(({path})=>{
                            console.log(path)
                            return(
                                <div className='announcement-photo_image-wrapper'>
                                    <img className='announcement-photo_image' src={"https://localhost:44321/images/"+path}/>
                                </div>
                            )
                        }):<div className='announcement-photo_image'>
                            <img src={process.env.PUBLIC_URL + '/no-img.png'}/>
                        </div>
                    }
                </Carousel>
            </div>

        </div>
    )
}

export default AnnouncementPhoto;