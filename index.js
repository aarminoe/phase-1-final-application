let h1 = document.getElementById('h1')
const question = document.getElementById('question')
const option1 = document.getElementById('option1')
const option2 = document.getElementById('option2')
const option3 = document.getElementById('option3')
const option4 = document.getElementById('option4')
const button = document.getElementById('submit')
const startButton = document.getElementById('h1-button')
let label1 = document.querySelector('label[for="input1"]')
let label2 = document.querySelector('label[for="input2"]')
let label3 = document.querySelector('label[for="input3"]')
let label4 = document.querySelector('label[for="input4"]')

let userAnswers = []

const questionArray = ['How stressful was your day?', 'Do you have to get up early tomorrow?', 'Are you celebrating anything?', 'What are you in the mood to do?']
const option1Array = ['Very', 'Yes', 'Yes', 'Relax']
const option2Array = ['Somewhat', 'No', 'No', 'Party!']
const option3Array = ['Not at all',]
const option4Array = ['Monday-Thursday',]
const radioButtons = document.querySelectorAll("input[name='q1']")
console.log(radioButtons)



function randomCocktail() {
    fetch('https:www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    .then(resp => resp.json())
    .then(data => randomDrink(data))
}

function changeQuestion() {
    let newIndex = -1
    let questionNumber = 1
    button.addEventListener('click', (e) => {
        e.preventDefault()
        questionNumber++
        newIndex++
        question.innerHTML = `${questionNumber.toString()}. ${questionArray[newIndex]}`
        label1.innerHTML = `${option1Array[newIndex]}`
        label2.innerHTML = `${option2Array[newIndex]}`
        if (newIndex === 0) {
            option4.hidden=true
            console.log('hi')
        }
        if (newIndex === 1) {
            option3.hidden=true
        }
        label3.innerHTML = `${option3Array[newIndex]}`
        label4.innerHTML = `${option4Array[newIndex]}`
        console.log(label1)
        for (const radio of radioButtons) {
            if (radio.checked) {
                userAnswers.push(radio.value)
                radio.checked = false
                console.log(userAnswers)
            }
        }
        if (newIndex === 4) {
            question.hidden=true
            option1.hidden=true
            option2.hidden=true
            option3.hidden=true
            option4.hidden=true
            button.hidden=true
            showResult()
        }
    })
}

function showResult() {
    //This will show the Drink depending on the answers along with a description
}


function randomDrink(objArray) {
    drinkArray = Object.values(objArray)
    console.log(drinkArray)
    for (const drink of drinkArray) {
        console.log(drink)
        
    }
}


function startQuiz() {
    startButton.addEventListener('click', () => {
        question.hidden=false
        option1.hidden=false
        option2.hidden=false
        option3.hidden=false
        option4.hidden=false
        button.hidden=false
        startButton.hidden=true
    })
}



randomCocktail()
changeQuestion()
startQuiz()