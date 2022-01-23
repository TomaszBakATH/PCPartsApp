import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './AnnouncementQATile.scss';
import AnnouncementSpecs from "../AnnouncementSpecs/AnnouncementSpecs";
import dateFormat from "dateformat";
import axios from "axios";

const AnnouncementQATile = (props) => {
    const {answer, question, id, ownerId} = props;
    const {id: questionId, announcementId, questioner, content, createDate} = question;

    const {id: questionerId, nickname, imagePath} = questioner

    const [answerText, setAnswerText] = useState('')
    const [questionClass, setQuestionClass] = useState('announcement-qa-tile')
    const [answerState, setAnswerState] = useState(answer)

    useEffect(() => {
        console.log("a",answer)
        console.log("q",question)
        console.log("s",answerState)
        setAnswerState(answer)
        console.log("effect",answer, answerState)
    }, [answer])

    const x = () => {
        console.log("answer", answer)
        console.log("question", question)
    }

    const addAnswer = () => {
        axios.post('https://localhost:44321/api/announcement/AddAnswer/',
            {
                questionId,
                content: answerText
            }
        )
            .then((response) => {
                setAnswerState(response.data.answer)
            })
            .catch(function (error) {
                console.log("err", error);
            })
    }

    const deleteAnswer = (answerId) => {
        console.log("deletingAnswer", answerId.toString())
      setAnswerState(null)
        axios.post('https://localhost:44321/api/announcement/DeleteAnswer/'+answerId.toString())
            .then((response) => {
            })
            .catch(function (error) {
                console.log("err", error);
            })
    }

    const deleteQuestion = () => {
      setQuestionClass('announcement-qa-tile--deleted')
        axios.post('https://localhost:44321/api/announcement/DeleteQuestion/'+questionId.toString())
            .then((response) => {
            })
            .catch(function (error) {
                console.log("err", error);
            })
    }

    const answerGet = () => {
        if (answerState && ownerId === id ) {
            const {id: answerId, content: answerContent, createDate: answerCreateDate} = answerState;
            console.log('state',answerState)
            return (<div>
                <h5>{answerContent}</h5>
                <h5>{dateFormat(answerCreateDate, "dd.mm.yyyy").toString()}</h5>
                <button className='btn btn-secondary' onClick={()=>{deleteAnswer(answerId)}}>Usuń</button>
            </div>)
        } else if (answerState ) {
            const {id: answerId, content: answerContent, createDate: answerCreateDate} = answerState;
            return (<div>
                <h5>{answerContent}</h5>
                <h5>{dateFormat(answerCreateDate, "dd.mm.yyyy").toString()}</h5>
            </div>)
        } else if (ownerId === id) {
            return (
                <div className='announcement-qa-tile_answer-form'>
                    <input type='text' placeholder='Odpowiedź...' onChange={(e) => setAnswerText(e.target.value)}/>
                    <button className='btn btn-dark' onClick={addAnswer}>Zatwierdź</button>
                </div>
            )
        } else {
            return <h5>Brak Odpowiedzi</h5>
        }
    }

    return (
        <div className={questionClass}>
            <div className='announcement-qa-tile_question'>
                <div className='announcement-qa-tile_questioner'>

                    <div>
                        {
                            imagePath
                                ?
                                <img className='header_user-image' src={"https://localhost:44321/images/" + imagePath}/>
                                :
                                <img className='header_user-image' src={process.env.PUBLIC_URL + '/user-unknown.png'}/>
                        }
                        <h4 onClick={x}>{nickname}</h4>
                    </div>
                    <div>
                        <h5>{dateFormat(createDate, "dd.mm.yyyy").toString()}</h5>
                        {
                            questionerId === id || ownerId === id
                                ? <button className='btn btn-dark' onClick={deleteQuestion}>Usuń</button>
                                : <></>
                        }
                    </div>
                </div>
                <div className='announcement-qa-tile_question-content'>
                    <h5>{content}</h5>
                </div>
                <hr/>
            </div>
            <div className='announcement-qa-tile_answer'>
                {
                    answerGet()
                }
            </div>
            <hr className='announcement-qa-tile_divider'/>
        </div>
    )
}

export default AnnouncementQATile;