import React , {useState} from "react";
import AdminLogin from "./AdminProfile"; 
import StudentLogin from "./StudentLogin";
import { useNavigate } from "react-router-dom"; // useHistory can also be used
import { Redirect } from "react-router-dom";
function Login(){

	const navigate = useNavigate();
	const questions = [];
    const ques = [ {id: '1',question:'Which is the capital of india?',op1 : 'New Delhi' , op2 : 'Mumbai' , ans : 'New Delhi'}, {id: '2',question:'Which is our national animal',op1 : 'Tiger' , op2 : 'Lion' , ans : 'Tiger'}];

	// convert to desired format
	for (let i=0;i < ques.length;i++){
		let qtext = ques[i].question;

		let options = [];
		let crctAnswer = ques[i].ans;
		let opt1 = {},opt2 = {};
		if( ques[i].op1 == crctAnswer)
			opt1 = { answerText: ques[i].op1 , isCorrect:true};
		else
		opt1 = { answerText: ques[i].op1 , isCorrect:false};


		if( ques[i].op2 == crctAnswer)
			opt2 = { answerText: ques[i].op2 , isCorrect:true};
		else
		opt2 = { answerText: ques[i].op2 , isCorrect:false};

		options.push(opt1);
		options.push(opt2);

		let innerQues = { questionText: qtext , answerOptions: options};
		questions.push(innerQues);

	}
	
	// const questions = [
	// 	{
	// 		questionText: 'What is the capital of France?',
	// 		answerOptions: [
	// 			{ answerText: 'New York', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Paris', isCorrect: true },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Who is CEO of Tesla?',
	// 		answerOptions: [
	// 			{ answerText: 'Jeff Bezos', isCorrect: false },
	// 			{ answerText: 'Elon Musk', isCorrect: true },
	// 			{ answerText: 'Bill Gates', isCorrect: false },
	// 			{ answerText: 'Tony Stark', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'The iPhone was created by which company?',
	// 		answerOptions: [
	// 			{ answerText: 'Apple', isCorrect: true },
	// 			{ answerText: 'Intel', isCorrect: false },
	// 			{ answerText: 'Amazon', isCorrect: false },
	// 			{ answerText: 'Microsoft', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'How many Harry Potter books are there?',
	// 		answerOptions: [
	// 			{ answerText: '1', isCorrect: false },
	// 			{ answerText: '4', isCorrect: false },
	// 			{ answerText: '6', isCorrect: false },
	// 			{ answerText: '7', isCorrect: true },
	// 		],
	// 	},
	// ];
	// console.log(questions);

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
					<br/>
					{<button onClick = { ()=> { navigate('/studentlogin') }}>Back</button>}	
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
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

export default Login;