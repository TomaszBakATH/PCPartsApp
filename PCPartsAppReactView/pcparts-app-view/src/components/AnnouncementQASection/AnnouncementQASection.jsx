import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './AnnouncementQASection.scss';
import AnnouncementSpecs from "../AnnouncementSpecs/AnnouncementSpecs";
import axios from "axios";
import AnnouncementQATile from "../AnnouncementQATile/AnnouncementQATile";

const AnnouncementQASection = (props) => {

    let initialData = [
        {
            question: {
                id: 2,
                announcementId: 33,
                announcement: null,
                questionerId: 1,
                questioner: {},
                content: "dupa ??",
                createDate: "2022-01-07T18:53:12.0754014"
            },
            answer: {}
        },
        {
            question: {
                id: 3,
                announcementId: 33,
                announcement: null,
                questionerId: 1,
                questioner: {},
                content: "dupa ??",
                createDate: "2022-01-07T18:53:12.0754014"
            },
            answer: {}
        }
    ]

    const [qaData, setQaData] = useState(initialData)
    const [questionText, setQuestionText] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:44321/api/announcement/GetQuestions/' + props.announcementId.toString())
            .then((response) => {
                initialData = response.data.questions

                setQaData(initialData);
            })
            .catch(function (error) {
                console.log("err", error);
            })
    }, [props.announcementId])

    const x = () => {
        if(props.id>0) {
            axios.post('https://localhost:44321/api/announcement/AddQuestion/',
                {
                    announcementId: props.announcementId,
                    questionerId: props.id,
                    content: questionText
                }
            )
                .then((response) => {
                    setQaData([...qaData,
                        {
                            question: response.data.question,
                            answer:null
                        }])
                })
                .catch(function (error) {
                    console.log("err", error);
                })
        }else {
            navigate('/login');
        }
    }

    return (
        <div className='announcement-qa-section'>

            {qaData.map(({question, answer}) => {
                return (
                    <AnnouncementQATile question={question} answer={answer} id={props.id} ownerId={props.ownerId}/>
                )
            })}
            <hr/>
            <h2>Zadaj pytanie</h2>
            <input type='text' placeholder='Zapytaj...' onChange={(e) => setQuestionText(e.target.value)}/>
            <button className='btn btn-dark' onClick={x}>Zatwierdź</button>
        </div>
    )
}

export default AnnouncementQASection;