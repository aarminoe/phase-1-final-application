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
        //-----d is each individual object of that array
        for (const d of drink) {
            let drinkData = Object.values(d)
            drinkList.push(drinkData)
        }
    }
    let drinkImage = document.createElement('img')
    if (answersArray[0] === '1' && answersArray[4] === '1') {
        console.log(drinkList[75])
        let relaxDrinks = [drinkList[21], drinkList[31], drinkList[37], drinkList[49], drinkList[54], drinkList[55], drinkList[70], drinkList[75], drinkList[78], drinkList[84], drinkList[89], drinkList[94], drinkList[95],drinkList[97], drinkList[98]]
        let randomRelax = Math.floor(Math.random()*relaxDrinks.length)
        div3.innerText = relaxDrinks[randomRelax][0]
        drinkImage.src = relaxDrinks[randomRelax][1]
    }
    else if (answersArray[0] === '3' && answersArray[4] === '2') {
        let partyDrinks = [drinkList[5], drinkList[9], drinkList[17], drinkList[22], drinkList[26], drinkList[35], drinkList[36], drinkList[43], drinkList[46], drinkList[50], drinkList[51], drinkList[63], drinkList[83], drinkList[87], drinkList[91]]
        let randomParty = Math.floor(Math.random()*partyDrinks.length)
        div3.innerText = partyDrinks[randomParty][0]
        drinkImage.src = partyDrinks[randomParty][1]
    }
    else {
        let randomDrink = Math.floor(Math.random()*drinkList.length)
        div3.innerText = drinkList[randomDrink][0]
        drinkImage.src = drinkList[randomDrink][1]
    }
    drinkInstructions(drinkList,div3)
    p.appendChild(drinkImage)
}


function drinkInstructions (finalDrinkList, div3) {
    for (const drink of finalDrinkList) {
        fetch(`https:www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink[2]}`)
        .then(resp => resp.json())
        .then((details) => {
            //------detail is an object within an array, iterating through that will give you 'd' which is the object we can use
            for (const detail of Object.values(details)){
                for (const d of detail) {
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