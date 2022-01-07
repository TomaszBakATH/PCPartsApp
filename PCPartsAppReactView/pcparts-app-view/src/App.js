import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import { Router, Link } from "@reach/router";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import {useEffect, useState} from "react";
import AddAnnouncementPage from "./pages/AddAnnouncementPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import SearchPage from "./pages/SearchPage";
import UserPage from "./pages/UserPage";
import Footer from "./components/Footer/Footer";

function App() {
    const [name,setName] = useState(-1);
    const [nickname,setNickname] = useState('');
    const [image,setImage] = useState('');

    useEffect( ()=>{
        const checkUser = async () => {
            const response = await fetch('https://localhost:44321/api/auth/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });

            return response.json()
        }
          checkUser().then(r => {
             setName(r.id);
             setNickname(r.nickname)
              setImage(r.imagePath)
         });
    },[name])

    return (

            <div className="App">

                <Header name={name} setName={setName} nickname={nickname} image={image}/>
                <main >
                    <Router >
                        <HomePage name={name} path="/"/>
                        <Login setName={setName} path="/login" />
                        <Register path="/register"/>
                        <AddAnnouncementPage name={name} path="/new-announcement"/>
                        <AnnouncementPage path="/announcement/:id" name={name}/>
                        <UserPage path="/user/:id" name={name}/>
                        <SearchPage path="/search"/>
                    </Router >
                </main>
                <Footer/>
            </div>

    );

}

export default App;
