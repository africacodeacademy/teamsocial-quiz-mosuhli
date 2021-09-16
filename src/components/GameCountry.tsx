import {useState} from "react";
import '../App.css'
import NewGame from './NewGame';
import { questions } from "./AboutLesotho";

 function GameCountry() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [noQuestions, setNoQuestions] = useState(0);
    const [random, setRandom] = useState(questions);
    const [showQuestions, setShowQuestions] = useState(false);
    const [finalResults, setFinalResults] = useState("");
    const total = noQuestions * 5;
    const pass = total / 2;

    const data = JSON.stringify(localStorage.getItem("nickname"));
    const name = data.replace('"', '');
    const x = name.replace('"', '');


      function shuffleArray(array:any[]){
          var num = array.length,
          temp,
          index;

        while(num > 0){
            index = Math.floor(Math.random() * num);
            num--;

            temp = array[num];
            array[num] = array[index];
            array[index] = temp;
        }
        return array;
      }


    function handleChange(event: any){
        const { value } = event.target;
        setNoQuestions(value);

        if(value === 5){
            shuffleArray(questions);
            let temp = questions;
            setRandom(temp);
            setShowQuestions(true);
            console.log(random);
        }
        else{ 
            shuffleArray(questions);
            let temp = questions;
            setRandom(temp);
            setShowQuestions(true);
            console.log(random);
        }
    }
    
    const handleAnswerOptionClick = (isCorrect:any) => {
        if(isCorrect){
            setScore(score + 5);
        }
        const nextQuestion = currentQuestion + 1;   
        if(nextQuestion < noQuestions){
            setCurrentQuestion(nextQuestion);
        }
        else{
            if(score >= pass ){
                setFinalResults("Passed")
            }else{
                setFinalResults("Failed")
            }
            setShowScore(true);
        }
    };
    
    return(
        
        <div className="App">
            <div>
                <div>
                    <span key="{token}">Start About Lesotho Quiz {x}</span>
                </div>
                <div>
                    <input id="five-questions" value={5} name="options" type="radio" onChange={handleChange}/> Five Question
                    <input id="seven-questions" value={7} name="options" type="radio" onChange={handleChange}/> Seven Question
                </div>
            </div>
             
            {showScore ? (
                <div className='score-section'>

                <div>
                   Hey! {x} You {finalResults}, Score: {score}/{total}, Note: each question its valued 5 points  <br/>
                 
                </div>
                   <div>
                      
                   </div>
                   <div>
                        <NewGame/>
                    </div>  
                </div>
            ) : showQuestions ? (                
                <>
               
                    <div className='question-section'>
                    
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>
                        </div>
                        
                        <div className='question-text'>
                            {random[currentQuestion].questionText}
                        </div>
                    </div>
                    <div className='answer-section'>
						{random[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
                    
					</div>  
                </>
            ) : null}
        </div>
    )
}
export default GameCountry;