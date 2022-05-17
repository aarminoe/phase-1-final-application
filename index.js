let h1 = document.getElementById('h1')
const question = document.getElementById('question')
const option1 = document.getElementById('option1')
const option2 = document.getElementById('option2')
const option3 = document.getElementById('option3')
const option4 = document.getElementById('option4')
const button = document.getElementById('submit')
let userAnswers = []

const questionArray = ['What day is it?',]
const option1Array = ['Friday',]
const option2Array = ['Saturday',]
const option3Array = ['Sunday',]
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
        console.log(button.value)
        questionNumber++
        question.innerHTML = `${questionNumber.toString()} ${questionArray[newIndex +=1]}`
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
        }
        showResult()
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


randomCocktail()
changeQuestion()