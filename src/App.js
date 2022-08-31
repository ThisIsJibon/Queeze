import React, { useEffect, useState } from 'react';


const API_URL = "https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple";

export default function App() {
	
	const [tQuestions,setTQuestions] = useState([]);

	useEffect(()=>{
		fetch(API_URL)
		.then((res)=>res.json())
		.then((data)=>{
			setTQuestions(data.results);
		})
	},[]);
	
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array
	}

	const questions = [
		{
			questionText: tQuestions.length > 0 ? tQuestions[0].question : 'Loading...',
			answerOptions: shuffleArray([
				{ answerText: tQuestions.length > 0 ? tQuestions[0].incorrect_answers[0] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[0].incorrect_answers[1] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[0].correct_answer :'Loading', isCorrect: true },
				{ answerText: tQuestions.length > 0 ? tQuestions[0].incorrect_answers[2] :'Loading', isCorrect: false },
			],)
		},
		{
			questionText: 'Loading...',
			answerOptions: shuffleArray([
				{ answerText: tQuestions.length > 0 ? tQuestions[1].incorrect_answers[0] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[1].correct_answer :'Loading', isCorrect: true },
				{ answerText: tQuestions.length > 0 ? tQuestions[1].incorrect_answers[1] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[1].incorrect_answers[2] :'Loading', isCorrect: false },
			]),
		},
		{
			questionText: 'Loading...',
			answerOptions: shuffleArray([
				{ answerText: tQuestions.length > 0 ? tQuestions[2].correct_answer :'Loading', isCorrect: true },
				{ answerText: tQuestions.length > 0 ? tQuestions[2].incorrect_answers[0] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[2].incorrect_answers[1] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[2].incorrect_answers[2] :'Loading', isCorrect: false },
			]),
		},
		{
			questionText: 'Loading...',
			answerOptions: shuffleArray([
				{ answerText: tQuestions.length > 0 ? tQuestions[3].incorrect_answers[0] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[3].incorrect_answers[1] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[3].incorrect_answers[2] :'Loading', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[3].correct_answer :'Loading', isCorrect: true },
			]),
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const reloadQuiz = () =>{
		window.location.reload(false);
	}


	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		} 
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					<div >
						You scored {score} out of {questions.length}
					</div>
					<button className='reload-quiz-button' onClick={() => reloadQuiz()}><span>want to play again?</span></button>
				</div>
				
				
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text' dangerouslySetInnerHTML={{__html : tQuestions.length>0 ?( tQuestions[currentQuestion].question):(questions[currentQuestion].questionText)}}/>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} dangerouslySetInnerHTML={{__html : answerOption.answerText}} />
						))}
					</div>
				</>
			)}
		</div>
	);
}
