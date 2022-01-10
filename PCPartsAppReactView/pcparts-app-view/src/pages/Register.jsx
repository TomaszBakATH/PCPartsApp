import React, {useState} from "react";
import dateFormat, { masks } from "dateformat";
import { useNavigate } from "@reach/router"
import axios from "axios";

const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [nickname,setNickname] = useState('');
    const [password,setPassword] = useState('');
    const [lastName,setLastname] = useState('');
    const [image,setImage] = useState(null);
    const [city,setCity] = useState('');
    const [birthdate,setBirthdate] = useState(Date.now());
    const [isConfirmed,setConfirmed] = useState(false);
    const [isRegistered,setRegistered] = useState(false);
    let navigate  = useNavigate();
    
    const submit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name',name)
        formData.append('email',email)
        formData.append('nickname',nickname)
        formData.append('password',password)
        formData.append('lastName',lastName)
        formData.append('image',image)
        formData.append('city',city)
        formData.append('birthdate',dateFormat(birthdate, "yyyy-mm-dd")+"T00:00:00")


        axios
            .post("https://localhost:44321/api/auth/register", formData)
            .then((res) => {
            }).catch((err) => alert("File Upload Error"));

        navigate('/login');
    }

    return (
        <form className='announcement-form'>
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
            <br/>
            <div className="form-floating">
                <input type="file" accept="image/*" className="form-control-file" onChange={e=> setImage(e.target.files[0])}/>
                <label htmlFor="floatingInput">Avatar</label>
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