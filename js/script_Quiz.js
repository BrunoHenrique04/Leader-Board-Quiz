
const questions = [
    {
        question: "Quem foi a primeira programadora",
        answears: [
            { text: "Luigi Manabrea", correct: false},
            { text: "Ada Lovelace", correct: true},
            { text: "Margaret Hamilton", correct: false},
            { text: "Ana Maria Braga", correct: false},
        ]
    
    
    },
    {
        question: "Para que era usada a Máquina Diferencial",
        answears: [
            { text: "Fazer Bolos", correct: false},
            { text: "Fazer Planilhas", correct: false},
            { text: "Somente Contabilizar dados", correct: false},
            { text: "Cálculos com Polinômios", correct: true},
        ]
    
    
    },
    {
        question: "O que aprendemos no curso de D.S",
        answears: [
            { text: "Fazer Engrenagems", correct: false},
            { text: "Programação e Alogoritimo", correct: true},
            { text: "Abrir o Google Chorme", correct: false},
            { text: "Culinária", correct: false},
        ]
    
    
    },
    {
        question: "Quais desses empregos são Relacionados a área de D.S",
        answears: [
            { text: "Engenheiro Civil", correct: false},
            { text: "Consultor Imobiliário", correct: false},
            { text: "Dançarino", correct: false},
            { text: "Analista de Dados", correct: true},
        ]
    
    
    },
    {
        question: "O que é HD, GPU",
        answears: [
            { text: "Placa de Video Integrada e RAM", correct: false},
            { text: "Processador e Placa Mãe", correct: false},
            { text: "Disco Rigido e Placa de Video", correct: true},
            { text: "Memória RAM e Bios", correct: false},
        ]
    
    
    },
    {
        question: "Oque é hardware",
        answears: [
            { text: "Parte fisica do PC", correct: true},
            { text: "Parte Lógica", correct: false},
            { text: "Gabinete", correct: false},
            { text: "Monitor", correct: false},
        ]
    
    
    },
];

const questionElement = document.getElementById("question");
const answearbutton = document.getElementById("answears-buttons");
const nextbutton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

let startTime = Date

function startQuiz()
{

    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

        currentQuestion.answears.forEach(answears => {
        const button = document.createElement("button");
        button.innerHTML = answears.text;
        button. classList.add("btn");
        answearbutton.appendChild(button);
        if(answears.correct){
            button.dataset.correct = answears.correct
        }
        button.addEventListener("click", selectAnswears);
    });
}

function resetState()
    {
        nextbutton.style.display = "none";
    while(answearbutton.firstChild){
        answearbutton.removeChild(answearbutton.firstChild);
    }
}

function selectAnswears(e){
    if (currentQuestionIndex === 0) {
        startTime = performance.now();
        console.log(startTime);
    }
    const selectedBtn = e.target;
    const  iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
        else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answearbutton.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextbutton.style.display = "block";
    
    
}

function showScore(){
    resetState();
    let i = 0;
    let endTime = performance.now();
    console.log(endTime);



    let timeElapsed = endTime - startTime;
    console.log(timeElapsed)
    let diference = (timeElapsed / 1000)
    diference = diference.toFixed(0)
    console.log(diference)
    questionElement.innerHTML = `Sua pontuação ${score} de ${questions.length} você fez o quiz em ${diference} segundos`;

    let quiz = document.getElementById('quiz')

    let nameButtonElement = document.createElement("input")
    let answearbutton = document.getElementById("answears-buttons")
    nameButtonElement.setAttribute('id', 'nameButton');
    nameButtonElement.setAttribute('type', 'text');
    nameButtonElement.setAttribute('placeholder', 'ESCREVA SEU NOME AQUI');
    nameButtonElement.classList.add("btn")
    nameButtonElement.classList.add("nameButton")
    answearbutton.appendChild(nameButtonElement);
    nextbutton.style.display = "none";
    let Scorebutton = document.createElement("button")
    Scorebutton.classList.add("next-btn")
    Scorebutton.setAttribute('id', 'scoreButton')
    Scorebutton.innerHTML = "REINICIAR";
    Scorebutton.style.display = "block";
    quiz.appendChild(Scorebutton);
    Scorebutton.addEventListener("click", function (){
        if(nameButtonElement.value === '' || nameButtonElement.value === null){
            alert('INSIRA UM NOME: ')
            return
        }
        //VERIFICAR SE O NOME JA EXISTE
        const backupData = localStorage.getItem('backupKey');
        const backupArray = JSON.parse(backupData);
        if (backupArray) {
            console.log("Nomes carregados com sucesso");
            let nomeInLower = nameButtonElement.value.toLowerCase()
            for (i = 0; i < backupArray.length; i++) {
                if (backupArray[i].nome.toLowerCase() === nomeInLower ) {
                    alert("ESTE NOME JA EXISTE");
                    return
                }
            }
        } else {
            console.log("Não existe um backup");
        }

        localStorage.setItem('playerScore', score);
        localStorage.setItem('playerName', nameButtonElement.value)
        localStorage.setItem('playerTime', diference)
        startQuiz()
        Scorebutton.style.display = "none"
        //window.location='leaderboard.html';
    })




}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextbutton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();




