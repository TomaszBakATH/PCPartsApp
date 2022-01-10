import React,{useEffect, useState} from "react";
import { useNavigate } from "@reach/router"
import 'draft-js/dist/Draft.css';
import axios from "axios";
import UserInfo from "../components/UserInfo/UserInfo";
import UserAnnouncements from "../components/UserAnnouncements/UserAnnouncements";

const UserPage = (props) => {

    let initialData = {
        city:'',
        email:'',
        imagePath:'',
        joinDate:'',
        nickname:'',
        announcements:[],
    }

    const [userData, setUserData] = useState(initialData)
    useEffect( ()=>{
        axios.get('https://localhost:44321/api/announcement/GetUser/'+props.id.toString())
            .then((response)=> {
                initialData = response.data.user

                setUserData(initialData);
            })
            .catch(function (error) {
                console.log("err",error);
            })
    },[props.id])

    return (
        <div>
            <UserInfo city={userData.city} email={userData.email} imagePath={userData.imagePath} joinDate={userData.joinDate} nickname={userData.nickname} />
            <UserAnnouncements announcements={userData.announcements}/>
        </div>
    )

}

export default UserPage;