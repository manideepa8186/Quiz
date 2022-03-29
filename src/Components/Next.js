import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
function Next(props) {
    //console.log(props.dataToNext)
    const [questions, setquestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers,setanswers]=useState(Array(10).fill(0));
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setlevel] = useState(1);
    const getquestions = () => {
        useEffect(() => {
            axios.get("http://localhost:5001/questions/" + props.dataToNext + "/" + level).then((res) => {
                setquestions(...questions, res.data.questions);
                // console.log(res.data.questions);
            }
            )
        }, [])
    }
    getquestions();
    //console.log(questions);
    const NextQuestion = () => {
        if (currentQuestion + 1 < questions.length)
            setCurrentQuestion(currentQuestion + 1);
        else {
            setShowScore(true);
        }

    }
    const PrevQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
    }
    const setCurrentOption = index => e => {
      let newarr=[...answers]
      console.log(answers);
      newarr[currentQuestion]=index
      setanswers(newarr);
    }
    const validate=()=>
    {    console.log(answers);
        let cnt=0;
        for(let i=0;i<answers.length;i++)
        {   
            //console.log(questions[i].answers[0]["text"],questions[i].options[answers[i]]["text"],answers[i])
            if(questions[i].answers[0]["text"]===questions[i].options[answers[i]]["text"]){
                cnt++;
                // setScore(score+1);
            }
        }
        setScore(cnt)
        // console.log(cnt)
        const percentage = (cnt / questions.length) * 100
            console.log(cnt, percentage);
            if (percentage >= 60) {
                setlevel(2)   
            }
            setShowScore(true);
    }
    return (<>
        <div className='container'>
            {showScore ? (<div style={{marginTop:"10%",marginLeft:"35%",fontSize:"30px" }} >
                You scored {score} out of {questions.length}
                {level == 2 ?
                    (<>
                    <div >
                        <br></br>
                         <span className='result' style={{fontSize:"30px"}}>You are Qualified to Level 2 </span><br></br>
                         <br></br>
                        <div className='Image'><img src='https://i.gifer.com/Ju9P.gif' style={{height:"40%" , width:"40%"}}></img></div>
                       
                        <Link to="/display/level2"><button className='button1' style={{ fontSize: "16px",padding: "15px 32px", margin:"4px 2px", cursor: "pointer",marginTop:"4%",marginLeft:"10%",onClick:"animated"}}>Level 2</button></Link><br></br>
                    </div>
                    </>
                    ) :
                    (<>
                        <div className='mt-2' style={{display:"block",fontSize:"30px"}}>
                             You are Not Qualified for Level 2 Please Try Again !!
                             <br></br><br></br>
                             <div className='Image'><img src='https://www.sorryimages.love/images/quotes/english/general/cute-sorry-animated-image-gif-52650-304402.gif' style={{height:"40%" , width:"40%"}}></img></div>
                        <Link to="/" ><button className='button2' style={{ fontSize: "16px",padding: "15px 32px", margin:"4px 2px", cursor: "pointer",marginTop:"4%",marginLeft:"10%"}}>Level-1</button></Link>
                        </div>
                    </>)}
            </div>) : (
                <>  <div className='questions' style={{marginLeft:"30%",marginTop:"20%"}}>
                    <h2 >Welcome to {props.dataToNext} quiz Level {level}</h2>
                    {questions.map(function (d, idx) {
                        if (idx == currentQuestion) return (
                            <>
                                <div className='question-section'>
                                    <div className='question-count'>
                                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                                    </div>
                                    <div className='question-text'><h4>{d.question}</h4></div>
                                </div>
                                <div className='answer-section'>
                                {d["options"].map((o, index) => (
                                    <> <div className="form-check">
                                        <input className="form-check-input" onChange={setCurrentOption(index)} type="radio" name="radio" value={o.text}  checked = {index==answers[currentQuestion]} ></input>
                                        <label className="form-check-label" for={index} >{o.text}</label>
                                    </div>
                                    </>
                                ))}
                                </div>
                                <br></br>
                                <div className='d-flex'>
                                {
                                    currentQuestion!=0 ?(
                                    <button style={{marginLeft:"5%"}} type="button" className='btn btn-info mt-3' onClick={PrevQuestion}>Previous</button>):
                                    (<div></div>)
                                }
                                {
                                    currentQuestion!=(questions.length-1)?(
                                    <button style={{marginLeft:"45%"}} type="button" className='btn btn-info mt-3' onClick={NextQuestion}>Next</button>):
                                    (<button style={{marginLeft:"45%"}} type="button" className='btn btn-info mt-3' onClick={validate}>Submit</button>)
                                }
                                </div>
                            </>
                        )
                    })
                    }
                    
                </div>
                </>
            )
            }
        </div>
    </>
    )
}

export default Next