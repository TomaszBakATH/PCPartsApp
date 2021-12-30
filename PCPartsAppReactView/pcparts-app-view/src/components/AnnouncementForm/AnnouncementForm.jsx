import React,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import 'draft-js/dist/Draft.css';

const AnnouncementForm = (props) => {
    let navigate  = useNavigate();
    const {name} = props;

    const [images,setImages] = useState([])
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    useEffect( ()=>{
        if(!name){
            navigate('/login');
        }
    })

    const submit = () => {
    }

    return (
        <div>
            <form>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" onChange={e=> setTitle(e.target.value)} required/>
                    <label htmlFor="floatingInput">Title</label>
                </div>

                <div className="form-floating">
                    <input type="text" className="form-control" onChange={e=> setDescription(e.target.value)} required/>
                    <label htmlFor="floatingInput">description</label>
                </div>

                <div className="form-floating">
                    <input type="file" accept="image/*" className="form-control-file" onChange={e=> setImages(e.target.files)}/>
                </div>


                <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submit}>Submit</button>

            </form>
        </div>
    )

}

export default AnnouncementForm;