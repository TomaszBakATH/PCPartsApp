import React, {useEffect, useState} from "react";
import 'draft-js/dist/Draft.css';
import './AnnouncementForm.scss'
import axios, {Axios} from "axios";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import dateFormat from "dateformat";
import { useNavigate } from "@reach/router"

const AnnouncementForm = (props) => {
    const defaultPart = {
        name: '',
        params: [],
        category: {
            id:1,
            name:''
        }
    }

    const defaultParam = {
        name: '',
        value: ''
    }
    let navigate = useNavigate();
    const options = [];
    const defaultOption = options[0];

    const [categoryList, setCategoryList] = useState([])
    const [images, setImages] = useState([])
    const [parts, setParts] = useState([])
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(-1);
    const [announcementId, setAnnouncementId] = useState();
    const [description, setDescription] = useState('');
    const [inputValidated,setInputValidated] = useState('form-floating')
    const [alertText,setAlertText] = useState('alert-text--disabled')

    useEffect( ()=>{
        axios.get('https://localhost:44321/api/announcement/GetCategories')
            .then((response)=> {
                response.data.categories.forEach(({id,name})=>{
                    options.push({value:id,label:name});
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    },[options])

    const submit = async (e) => {
        e.preventDefault();

        if(title && description && price > -1) {


            let indexx = 0;
            await axios
                .post("https://localhost:44321/api/announcement/AddAnnouncement",
                    {
                        title,
                        description,
                        price,
                        ownerId: props.id,
                        product: parts,
                    })
                .then(function (response) {
                    // handle success

                    //setAnnouncementId(response.data.announcement.id)
                    indexx = response.data.announcement.product[0].announcementId;


                    let formData = new FormData();
                    formData.append('announcementId', indexx.toString())
                    for (let i = 0; i < images.length; i++) {
                        formData.append('imagePaths', images[i])
                    }

                    axios
                        .post("https://localhost:44321/api/announcement/AddPhotos", formData)
                        .then((res) => {
                            navigate("/announcement/" + indexx.toString())
                        }).catch((err) => alert("File Upload Error"));
                })
                .catch((err) => {
                    console.log("error", err)
                    alert("File Upload Error")
                });
        }else{
            validationAlert();
        }
    }

    const validationAlert = () => {
      setInputValidated("form-floating alert")
        setAlertText('alert-text')
    }

    const createPart = (e) => {
        e.preventDefault();
        setParts([...parts, defaultPart])
    }
    const createParam = (e,i) => {
        e.preventDefault();
        let newParams = parts.slice();
        newParams[i].params = [...newParams[i].params, defaultParam];
        setParts(newParams)
    }

    const addPart = (i, n, c) => {
        let newParts = parts.slice();
        newParts[i] = {
            ...newParts[i], name: n ?? newParts[i].name, category: c ?? newParts[i].category
        };
        setParts(newParts)
    }

    const addParam = (i, j, n, v) => {
        let newParts = parts.slice();
        let newParams = newParts[i].params.slice();
        newParams[j] = {
            ...newParams[j], name: n?? newParams[j].name, value: v?? newParams[j].value
        }
        newParts[i].params = newParams
        setParts(newParts)
    }
    const addCategory = (e,i) => {
        const c = {
            id: e.value,
            name: e.label
        }
        addPart(i,null,c)
    }

    return (
        <div className='announcement-form'>
            <h2 className={alertText}>wype??nij poprawnie wymagane pola</h2>
            <form>
                <h1 className="h3 mb-3 fw-normal">Dodaj og??oszenie</h1>

                <div className={inputValidated}>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)}/>
                    <label htmlFor="floatingInput">Tytu??</label>
                </div>

                <div className={inputValidated}>
                    <input type="text" className="form-control" onChange={e => setDescription(e.target.value)}/>
                    <label htmlFor="floatingInput">Opis og??oszenia</label>
                </div>

                <div className={inputValidated}>
                    <input type="text" className="form-control" onChange={e => setPrice(parseInt(e.target.value))}/>
                    <label htmlFor="floatingInput">Cena</label>
                </div>
                <div className='announcement-form_parts-wrapper'>
                    {
                        parts.map(({params}, index) => {
                            const partIndex = index;
                            return <div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" onChange={e => addPart(index,e.target.value,null)}/>
                                    <label htmlFor="floatingInput">nazwa cz????ci</label>
                                </div>
                                <div className="form-floating">
                                    <Dropdown options={options} onChange={(e)=>addCategory(e,index)} value={options[0]} placeholder="Kategoria" />
                                </div>
                                <div className='announcement-form_parts-wrapper'>
                                    {
                                        params.map((_,index)=>{
                                            return <div>
                                                <div className="form-floating">
                                                    <p >nazwa parametru</p>
                                                    <input type="text" className="form-control"
                                                           onChange={event => addParam(partIndex,index,event.target.value,null)}/>
                                                    <p>warto????</p>
                                                    <input type="text" className="form-control"
                                                           onChange={event => addParam(partIndex,index,null,event.target.value)}/>
                                                    <hr/>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <button className='btn btn-secondary' onClick={e=>createParam(e,index)}>dodaj parametr</button>
                                </div>
                                <hr/>
                            </div>
                        })
                    }
                    <button className='btn' onClick={createPart}>dodaj cz??????</button>
                </div>
                <div className="form-floating">
                    <br/>
                    <p>Zdj??cia</p>
                    <br/>
                    <input multiple type="file" accept="image/*" className="form-control-file"
                           onChange={e => {setImages(e.target.files);
                               }}/>
                </div>


                <button className="w-100 btn btn-lg btn-dark" type="submit" onClick={submit}>Zatwierd??</button>

            </form>
        </div>
    )

}

export default AnnouncementForm;