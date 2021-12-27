import React, {useState} from "react";
import dateFormat, { masks } from "dateformat";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [nickname,setNickname] = useState('');
    const [password,setPassword] = useState('');
    const [lastName,setLastname] = useState('');
    const [city,setCity] = useState('');
    const [birthdate,setBirthdate] = useState(Date.now());
    const [isConfirmed,setConfirmed] = useState(false);
    const [isRegistered,setRegistered] = useState(false);
    let navigate  = useNavigate();
    
    const submit = async (e) => {
        e.preventDefault();
        await fetch('https://localhost:44321/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                nickname,
                lastName,
                city,
                birthdate: dateFormat(birthdate, "yyyy-mm-dd")+"T00:00:00",
                password
            })
        });
        navigate('/login');
    }

    return (
        <form>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating">
                <input type="text" className="form-control" onChange={e=> setNickname(e.target.value)} required/>
                <label htmlFor="floatingInput">Nickname</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control"  onChange={e=> setEmail(e.target.value)} required/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control"  onChange={e=> setPassword(e.target.value)} required/>
                <label htmlFor="floatingInput">Password</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control"  onChange={e=> ()=>{e.target.value===password?setConfirmed(true):setConfirmed(false)}} required/>
                <label htmlFor="floatingInput">Confirm password</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control"  onChange={e=> setName(e.target.value)} required/>
                <label htmlFor="floatingPassword">Name</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control"  onChange={e=> setLastname(e.target.value)} required/>
                <label htmlFor="floatingPassword">Last Name</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control"  onChange={e=> setCity(e.target.value)} required/>
                <label htmlFor="floatingPassword">City</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control"  onChange={e=> setName(e.target.value)} />
                <label htmlFor="floatingPassword">Birthdate</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submit}>Submit</button>

            {/*{*/}
            {/*    isConfirmed*/}
            {/*        ? <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>*/}
            {/*        : <button className="w-100 btn btn-lg btn-primary" type="submit" >Submit</button>*/}
            {/*}*/}
        </form>
    )
}

export default Register;