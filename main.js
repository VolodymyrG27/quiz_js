/* All answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/*All options */
const optionsElements = document.querySelectorAll('.option');
/*QUESTION*/
const question = document.querySelector('#question'),
      numberOfQuestion = document.querySelector('#number-of-question'),
      numberAllOfQuestion = document.querySelector('#number-of-all-questions');

/*index question,index page*/
let indexOfPage = 0;
let indexOfQuestion;

/*obertka, krujky answers-tracker*/
const answersTracker = document.querySelector('#answers-tracker');
/*knopka NEXT */
const btnNext = document.querySelector('#btn-next');
/*Knopka train again*/
const btnTryAgain = document.querySelector('#btn-try-again');

/*result viktorina*/
let score = 0;

/*Kilkist pravylnych vidpovidey, */
const correctAnswer = document.querySelector('#correct-answer'),
      numberOfAllQuestion2 = document.querySelector('#number-of-all-questions-2'); //v modalnomu vikni

const questions = [
    {
        question: 'Як в JavaScript вичислити відcоток від числа',
        options: [
            'Так в JavaScript не можна робити',
            'Оператор : %',
            'Помножити на кількість відcотків і поділити на 100',
            'Запустити метод FindPrecent()'
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат прикладу: "13" + 7',
        options: [
            '20',
            '137',
            'undefined',
            'error'
        ],
        rightAnswer: 1
    },
    {
        question: 'На JavaScript неможна писати: ',
        options: [
            'Ігри',
            'Скрипти для веб програм',
            'Мобільні програми',
            'Погано писати скрипти'
        ],
        rightAnswer: 3
    }
];

questions[0].question = "Сколько разных ключевых слов для описания циклов доступно в javascript?";
questions[0].options[0] = "for";
questions[0].options[1] = "for и while";
questions[0].options[2] = "for,while и do...while";
questions[0].options[3] = "for,while,do...while и forEach";
questions[0].rightAnswer = 3;
console.log(questions[0].rightAnswer);

numberAllOfQuestion.innerHTML = questions.length; //виводимо кількість запитань

/*Збирає всі наші питання і відповіді в одному мусці*/
const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;  //виводимо питання

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера конкретної сторінки
    indexOfPage++; //збільшення індекса
};
/*сюди буде відправлятись те питання яке вже було, щоб воно вже не повторялось*/
let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hideDublicate = false; // якір для перевірки одинакових питань

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hideDublicate = true;
                }
            });
            if (hideDublicate == true) {
                randomQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length = 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (element) => {
    if(element.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        element.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        element.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionsElements) {
    option.addEventListener('click', (e) => {
        checkAnswer(e);
    })
}

const disabledOptions = () => {
    optionsElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
} 
//видалення всіх класів з відповідей
const enabledOptions = () => {
    optionsElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(item => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = (status) => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionsElements[0].classList.contains('disabled')) {
      alert('Вам нужно выбрать один из вариантов ответа')
    } else {
        randomQuestion();
        enabledOptions();
  }
}

btnNext.addEventListener('click', () => {
    validate();
});

randomQuestion();

const quizOver = () => {
    const quizOverModal = document.querySelector('.quiz-over-modal');
    quizOverModal.classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});