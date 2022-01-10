import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './AnnouncementTile.scss';

const AnnouncementTile = (props) => {

    const {addDate, description, id, imagePath, title,search} = props;
    let navigate = useNavigate();
    const [path,setPath] = useState("/announcement/#")

    useEffect( ()=>{
        if(id){
            setPath("/announcement/"+id.toString());
        }

    },[id])

    const x = () => {
      if(search){
          return 'announcement-tile announcement-tile--search'
      }else
      {
          return 'announcement-tile'
      }
    }

    const price = '100zł'
    return (
        <div className={x()} onClick={()=>{navigate(path)}}>
            {imagePath.length>0
                ?<img src={"https://localhost:44321/images/"+imagePath[0].path} className='announcement-tile_image'/>
                :<img src={process.env.PUBLIC_URL + '/no-img.png'} className='announcement-tile_no-image'/>}

            <div className='announcement-tile_content'>
                <h3>{title}</h3>
                <div className='announcement-tile_date-wrapper'>
                    <h5>{addDate.substr(0,10)}</h5>
                    <p>{price}</p>
                </div>
            </div>
        </div>
    )
}

export default AnnouncementTile;