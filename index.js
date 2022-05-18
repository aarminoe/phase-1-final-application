let h1 = document.getElementById('h1')
const question = document.getElementById('question')
const option1 = document.getElementById('option1')
const option2 = document.getElementById('option2')
const option3 = document.getElementById('option3')
const button = document.getElementById('submit')
const startButton = document.getElementById('h1-button')
const div3 = document.getElementById('div3')
const p = document.getElementById('p')
let errorMessage = document.getElementById('error')
let label1 = document.querySelector('label[for="input1"]')
let label2 = document.querySelector('label[for="input2"]')
let label3 = document.querySelector('label[for="input3"]')
const questionArray = ['Is it the weekend?', 'Do you have to get up early tomorrow?', 'Are you celebrating anything?', 'What are you in the mood to do?']
const option1Array = ['Yes', 'Yes', 'Yes', 'Relax']
const option2Array = ['No', 'No', 'No', 'Party!']
const option3Array = ['Not at all',]
const option4Array = ['Monday-Thursday',]
const radioButtons = document.querySelectorAll("input[name='q1']")
let userAnswers = []
console.log(radioButtons)



function randomCocktail() {
    fetch('https:www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    .then(resp => resp.json())
    .then(data => changeQuestion(data))
}

function changeQuestion(data) {
    let newIndex = -1
    let questionNumber = 1
    button.addEventListener('click', (e) => {
        e.preventDefault()
        radioCheck()
        if (radioCheck()) {
            errorMessage.hidden=true
            questionNumber++
            newIndex++
            question.innerHTML = `${questionNumber.toString()}. ${questionArray[newIndex]}`
            label1.innerHTML = `${option1Array[newIndex]}`
            label2.innerHTML = `${option2Array[newIndex]}`
            if (newIndex === 0) {
                option3.hidden=true
                
            }
            label3.innerHTML = `${option3Array[newIndex]}`
            for (const radio of radioButtons) {
                if (radio.checked) {
                    userAnswers.push(radio.value)
                    radio.checked = false
                    console.log(userAnswers)
                }
            }
            if (newIndex >= 4) {
                question.hidden=true
                option1.hidden=true
                option2.hidden=true
                option3.hidden=true
                button.hidden=true
                showResult(data, userAnswers)
            }
            }
        else {
            errorMessage.innerText = 'Please remember to pick an answer!'
            if (errorMessage.hidden === true) {
                errorMessage.hidden=false
            }
        }
    })
}

function radioCheck() {
    for (const radio of radioButtons) {
        if (radio.checked) {
            return true
        }
    }
}

function showResult(data, answersArray) {
    let drinkList = []
    let drinkArray = Object.values(data)
    for (const drink of drinkArray) {
        console.log(drink)
        for (const d of drink) {
            let drinkData = Object.values(d)
            drinkList.push(drinkData)
        }
    }
    let newDrinkList = [...new Set(drinkList)]
    let finalDrinkList = newDrinkList.slice(76)
    console.log(finalDrinkList)
    for (const drink of finalDrinkList) {
    }
    console.log(answersArray)
    let drinkImage = document.createElement('img')
    if (answersArray[4] === '2') {
        div3.innerText = finalDrinkList[21][0]
        drinkImage.src = finalDrinkList[21][1]
    }
    else if (answersArray[3] === '2' && answersArray[4] === '1') {
        div3.innerText = finalDrinkList[19][0]
        drinkImage.src = finalDrinkList[19][1]
    }
    else {
        let randomDrink = Math.floor(Math.random()*finalDrinkList.length)
        div3.innerText = finalDrinkList[randomDrink][0]
        drinkImage.src = finalDrinkList[randomDrink][1]
    }
    p.appendChild(drinkImage)
}



function startQuiz() {
    startButton.addEventListener('click', () => {
        question.hidden=false
        option1.hidden=false
        option2.hidden=false
        option3.hidden=false
        button.hidden=false
        startButton.hidden=true
    })
}


// function userData(array) {
//     console.log(array)
//     let first = array[0]
//     let second = array[1]
//     let third = array[2]
//     let fourth = array[3]
//     let fifth = array[4]
//     console.log(first)
// }

randomCocktail()
startQuiz()
