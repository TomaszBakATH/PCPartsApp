import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './UserAnnouncements.scss';
import AnnouncementSpecs from "../AnnouncementSpecs/AnnouncementSpecs";
import AnnouncementTile from "../AnnouncementTile/AnnouncementTile";

const UserAnnouncements = (props) => {

    const [showClosed,setShowClosed] = useState(false);

    const {announcements} = props;
    return (
        <div className='user-announcements'>
            <h2>Ogłoszenia użytownika</h2>
            <label>Pokaż zakończone</label>
            <input type='checkbox' onClick={()=>{setShowClosed(!showClosed)}}/>
            <div className='user-announcements_wrapper'>
            {announcements.map(({addDate, description, id, imagePath, title, statusId})=>{

                    if(showClosed){
                        return (
                            statusId==2
                                ?<AnnouncementTile addDate={addDate} description={description} id={id} imagePath={imagePath} title={title} search={true}/>
                                :<></>
                        )
                    }else {
                        return (
                            <AnnouncementTile addDate={addDate} description={description} id={id} imagePath={imagePath} title={title} search={true}/>
                        )
                    }
            })}
            </div>
        </div>
    )
}

export default UserAnnouncements;