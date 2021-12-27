import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Register from "./pages/Register";
import {useEffect, useState} from "react";

function App() {
    const [name,setName] = useState('');

    useEffect( ()=>{
        const checkUser = async () => {
            const response = await fetch('https://localhost:44321/api/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });

            return response.json()
        }
          checkUser().then(r => {
             setName(r.name);
         });
    },[name])

    return (
        <Router>
            <div className="App">

                <Navigation name={name} setName={setName}/>
                <main className="form-signin">
                    <Routes >
                        <Route path="/" element={<Home name={name}/>}/>
                        <Route path="/login" element={<Login setName={setName}/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes >
                </main>

            </div>
        </Router>
    );

}

export default App;
