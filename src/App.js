import React, { useState, useEffect } from 'react';


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


	const questions = [
		{
			questionText: tQuestions.length > 0 ? tQuestions[0].question : 'What is the capital of France?',
			answerOptions: [
				{ answerText: tQuestions.length > 0 ? tQuestions[0].incorrect_answers[0] :'New York', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[0].incorrect_answers[1] :'London', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[0].correct_answer :'Paris', isCorrect: true },
				{ answerText: tQuestions.length > 0 ? tQuestions[0].incorrect_answers[2] :'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: tQuestions.length > 0 ? tQuestions[1].incorrect_answers[0] :'Jeff Bezos', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[1].correct_answer :'Elon Musk', isCorrect: true },
				{ answerText: tQuestions.length > 0 ? tQuestions[1].incorrect_answers[1] :'Bill Gates', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[1].incorrect_answers[2] :'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: tQuestions.length > 0 ? tQuestions[2].correct_answer :'Apple', isCorrect: true },
				{ answerText: tQuestions.length > 0 ? tQuestions[2].incorrect_answers[0] :'Intel', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[2].incorrect_answers[1] :'Amazon', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[2].incorrect_answers[2] :'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: tQuestions.length > 0 ? tQuestions[3].incorrect_answers[0] :'1', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[3].incorrect_answers[1] :'4', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[3].incorrect_answers[2] :'6', isCorrect: false },
				{ answerText: tQuestions.length > 0 ? tQuestions[3].correct_answer :'7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

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
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{/**/ tQuestions.length>0 ?( tQuestions[currentQuestion].question):(questions[currentQuestion].questionText)}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
