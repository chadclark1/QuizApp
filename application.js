$(document).ready(function() {
	// Following variables are global to the functions within 
	
	var curQuestion = 0
	var nrCorrect = 0
	var questions = [{question: "How much did the Dutch pay the Native Americans for Manhattan Island?", 
	 		choices: ["$1", "$1,000", "$10,000","$1,000,000"], correct:1},
	 	{question: "Which US president was inaugurated in NYC?", 
	 		choices: ["George Washington", "James Madison", "Arthur Garfield","John F. Kennedy"], correct:0},
	 	{question: "How many works of art are contained in the Metropolitan Museum?", 
	 		choices: ["10,000", "20,000", "50,000","1,000,000"], correct:3},
	 	{question: "How many acres is Central Park?", 
	 		choices: ["110 acres", "263 acres", "573 acres","840 acres"], correct:3},
	 	{question: "How long did it take to build the Empire State Building?", 
	 		choices: ["1 year and 1 month", "1.5 years", "3 years","20 years"], correct:0}];
	 
	//var userChoice = $(".list input[type=radio]:checked").val(); //KR this should not be here
	//	needs to be checked each time the user answers a question


	 function displayQuestion () {
	 	var question = questions[curQuestion].question;
	 	var choices = questions[curQuestion].choices;
	 	var $question
	 	$("#sentence").text(question);
	 	//$(".list input[type=radio]:checked" + "+ label").css("background-color","rgba(00, 100, 220, 0.7)");

	 	for (var i=0; i<choices.length; i++) {
	 		$question = $("#radio" + i + "+ label").text(choices[i])
	 		$question.removeClass("correctAnswer wrongAnswer").prop("checked", false); //KR had .correctAnswer
	 		console.log("display");
	 	}
	 	$("#number").text(curQuestion + 1); //KR added	
	 	// curQuestion++ this routine should not advance question
	 };


	 function correctAnswer (answer) {
	 	//KR - logic for what to do if answer is correct
	 	console.log("Yeh - got it right")
	 	//var answer = questions[curQuestion].correct;
	 	console.log("answer =" + answer)
	 	$(".list input[type=radio]:checked+label").addClass("correctAnswer");
	 };

	 function wrongAnswer (answer) {
	 	//var answer = questions[curQuestion].correct;
	 	//var userAnswer = $(".list input[type=radio]:checked").val();
	 	$(".list input[type=radio]:checked+label").addClass("wrongAnswer");
	 };

	 /*
	 function compare (userChoice, correctAnswer) {
	 	var number = 0 //KR this is local and will be reset everytime you call it, it should be global
	 	if (userChoice == correctAnswer) {
	 		$("#numberCorrect").text(number + 1);
	 	};
	 	curQuestion++
	 };
	 */


	$("#start").click(function() {
		initializeQuiz(); //KR now you have a way to restart the program at any point
	});

	function initializeQuiz() {
		$("#begin").css("display","none");
		$('#questionNumber, #curQuestion, #correct, #sentence, input[type=radio] + label, #submit, #next').css("display","block");
		console.log("question");
		curQuestion = 0; // start at beginning
		numberCorrect = 0
		$("#numberCorrect").text(numberCorrect);
		displayQuestion();
	}

	$("#submit").click(function() {
		// KR logic to determine whether correct answer was chosen
		var selectedAnswer = $(".list input[type=radio]:checked").val();
		selectedAnswer = parseInt(selectedAnswer); // convert string to number
		if (selectedAnswer == questions[curQuestion].correct){
			correctAnswer(selectedAnswer);
			numberCorrect++;
			$("#numberCorrect").text(numberCorrect);
		} else {
			wrongAnswer(selectedAnswer);
			
		}
		// compare(); // KR you defined this function with parameters, but you are not using any
		console.log("submit")
	});

	$("#next").click(function() {
		// Move on to next question
		console.log("next")
		nextQuestion();
	});

	function nextQuestion() {
		curQuestion++; 	// advance to next question
		if (curQuestion < questions.length) {
			displayQuestion(); 	// display question
			$("#number").val(questionNumber + 1); // update question nr 1..n
		} else {
			//TODO - waht to do when reaching end of question?
			initializeQuiz();
		}
		
	}

	$("#restart").click(function() {
		initializeQuiz();
	});


});
