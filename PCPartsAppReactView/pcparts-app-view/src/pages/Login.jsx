import React, {useState} from "react";
import { useNavigate } from "@reach/router"
import dateFormat from "dateformat";

const Login = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [validated,setValidated] = useState(false);

    const {setName} = props;
    let navigate  = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const submit = await fetch('https://localhost:44321/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {

            return res.json();
        })
        .then(data => {
            setName(data.name);
            if(data.message === "success"){
                navigate('/');
            }else{
                setValidated(true);
            }
        })
    }

    return (
        <form className='announcement-form'>
            <h1 className="h3 mb-3 fw-normal">Please login</h1>

            {validated? <p>invalid credentials</p>:<></>}
            <div className="form-floating">
                <input type="email" className="form-control"  onChange={e=> setEmail(e.target.value)} required/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control"  onChange={e=> setPassword(e.target.value)} required/>
                <label htmlFor="floatingInput">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submit}>Submit</button>

        </form>
    )
}

export default Login;