import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './AnnouncementOwnerInfo.scss';
import axios from "axios";
import dateFormat from "dateformat";
import AnnouncementPhoto from "../AnnouncementPhoto/AnnouncementPhoto";

const AnnouncementOwnerInfo = (props) => {

    const [showEmail,setShowEmail] = useState(false);
    const [showNumber,setShowNumber] = useState(false);

    const {owner,info,name,announcementId, images} = props;
    const {title,description} = info;
    const {city,email,imagePath,joinDate,nickname} = owner;
    const number = 213721377
    const price = "100zł";

    const x = () => {
      axios.post("https://localhost:44321/api/announcement/CloseAnnouncement/" + announcementId.toString())
          .then(function (response) {

          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
    }

    return (
        <div className='announcement-owner-info'>
            {
                name==owner.id
                    ?<button onClick={x} className='announcement-owner-info_close-button btn btn-dark'>Zakończ ogłoszenie</button>
                    :<></>
            }
            <Link to={'/user/'+owner.id}>
            <div className='announcement-owner-info_user-wrapper'>
                {
                    imagePath
                        ?<img className='announcement-owner-info_user-image' src={"https://localhost:44321/images/"+imagePath}/>
                        :<img className='announcement-owner-info_user-image' src={process.env.PUBLIC_URL + '/user-unknown.png'}/>
                }

                <div className='announcement-owner-info_user-name'>
                    <h3>{nickname}</h3>
                    <p>Dołączył: {dateFormat(joinDate, "dd.mm.yyyy").toString()}</p>
                </div>
            </div>
            </Link>
            <p className='announcement-owner-info_city'>Lokalizacja: {city}</p>
            <div className='announcement-owner-info_button' onClick={()=>{setShowNumber(!showNumber)}}>{showNumber?number.toString():"Pokaż numer"}</div>
            <div className='announcement-owner-info_button' onClick={()=>{setShowEmail(!showEmail)}}>{showEmail?email:"Pokaż E-mail"}</div>
            <AnnouncementPhoto images={images} mobile={true}/>
            <div className='announcement-owner-info_product-wrapper'>
                <h1>{title}</h1>
                <h2>{price}</h2>
                <h5>{description}</h5>
            </div>
        </div>
    )
}

export default AnnouncementOwnerInfo;