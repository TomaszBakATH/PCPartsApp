import React,{useEffect, useState} from "react";
import { useNavigate } from "@reach/router"
import 'draft-js/dist/Draft.css';
import AnnouncementForm from "../components/AnnouncementForm/AnnouncementForm";
import axios from "axios";
import AnnouncementPhoto from "../components/AnnouncementPhoto/AnnouncementPhoto";
import AnnouncementTopSection from "../components/AnnouncementTopSection/AnnouncementTopSection";
import AnnouncementSpecs from "../components/AnnouncementSpecs/AnnouncementSpecs";
import AnnouncementProduct from "../components/AnnouncementProduct/AnnouncementProduct";
import ProposedAnnouncements from "../components/ProposedAnnouncements/ProposedAnnouncements";
import ClosedModal from "../components/ClosedModal/ClosedModal";

const AnnouncementPage = (props) => {

    let initialData = {
        title: '',
        statusId:0,
        status:null,
        questions:[],
        product:[],
        ownerId:0,
        owner:{},
        imagePath:[],
        id:0,
        description:'',
        closeDate:null,
        addDate:''
    }

    const [announcementData, setAnnouncementData] = useState(initialData)

    useEffect( ()=>{
        axios.get('https://localhost:44321/api/announcement/announcement/'+props.id.toString())
            .then((response)=> {
                initialData = response.data.announcement
                console.log(initialData)
                setAnnouncementData(initialData);
            })
            .catch(function (error) {
                console.log("err",error);
            })
    },[props.id])

    return (
        <div>
            {announcementData.statusId==2?<ClosedModal />:<></>}
            <AnnouncementTopSection announcementId={props.id} name={props.name} images={announcementData.imagePath} owner={announcementData.owner} info={{title:announcementData.title ,description: announcementData.description }}/>
            {announcementData.product.map(({name,category,params})=>{
               return <AnnouncementProduct name={name} category={category} params={params} />
            })}
            <ProposedAnnouncements />
        </div>
    )

}

export default AnnouncementPage;