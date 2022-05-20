let h1 = document.getElementById('h1')
const question = document.getElementById('question')
const option1 = document.getElementById('option1')
const option2 = document.getElementById('option2')
const option3 = document.getElementById('option3')
const nextButton = document.getElementById('submit')
const startButton = document.getElementById('h1-button')
const div1 = document.getElementById('div1')
const div3 = document.getElementById('div3')
const restartButton = document.getElementById('restart')
const p = document.getElementById('p')
let errorMessage = document.getElementById('error')
let label1 = document.querySelector('label[for="input1"]')
let label2 = document.querySelector('label[for="input2"]')
let label3 = document.querySelector('label[for="input3"]')
const questionArray = ['Is it the weekend?', 'Do you have to get up early tomorrow?', 'Are you celebrating anything?', 'What are you in the mood to do?']
const option1Array = ['Yes', 'Yes', 'Yes', 'Relax']
const option2Array = ['No', 'No', 'No', 'Party!']
//const option3Array = ['Not at all',]
//const option4Array = ['Monday-Thursday',]
const radioButtons = document.querySelectorAll("input[name='q1']")
let userAnswers = []
let newIndex
let questionNumber

function randomCocktail() {
    fetch('https:www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    .then(resp => resp.json())
    .then(data => changeQuestion(data))
}

function changeQuestion(data) {
    newIndex = -1
    questionNumber = 1
    nextButton.addEventListener('click', (e) => {
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
                nextButton.hidden=true
                div1.innerText='Comin\' right up!'
                restartButton.hidden=false
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
        //----drink is an array full of objects using the object.values function to make it an array
        console.log((drink))
        //-----d is each individual object of that array
        for (const d of drink) {
            console.log(d)
            let drinkData = Object.values(d)
            drinkList.push(drinkData)
        }
    }
    //----------- Here I could slice the list in order to make a smaller list to choose from
    //----------- I would do this depending on the amount of questions asked, in order to match the 
    //----------- answer combinations with the resulting drink
    let finalDrinkList = drinkList.slice(1)
    let drinkImage = document.createElement('img')
    //----------- Drinks are picked at random as of now
    let randomDrink = Math.floor(Math.random()*finalDrinkList.length)
    div3.innerText = finalDrinkList[randomDrink][0]
    drinkImage.src = finalDrinkList[randomDrink][1]
    drinkInstructions(finalDrinkList,div3)
    p.appendChild(drinkImage)
}


function drinkInstructions (finalDrinkList, div3) {
    for (const drink of finalDrinkList) {
        fetch(`https:www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink[2]}`)
        .then(resp => resp.json())
        .then((details) => {
            //------detail is an object within an array, iterating through that will give you 'd' which is the object we can use
            for (const detail of Object.values(details)){
                console.log(detail)
                for (const d of detail) {
                    console.log(d)
                    if (d.strDrink === div3.innerText) {
                        let description = document.createElement('p')
                        description.innerText = d.strInstructions
                        p.appendChild(description)
                    }
                }

            }
        })
    }
}

function restart() {
    restartButton.addEventListener('click', () => {
    })
}

function startQuiz() {
    startButton.addEventListener('click', () => {
        question.hidden=false
        option1.hidden=false
        option2.hidden=false
        option3.hidden=false
        nextButton.hidden=false
        startButton.hidden=true
    })
}


randomCocktail()
startQuiz()
restart()