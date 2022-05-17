let h1 = document.getElementById('h1')
const question = document.getElementById('question')
const option1 = document.getElementById('option1')
const option2 = document.getElementById('option2')
const option3 = document.getElementById('option3')
const option4 = document.getElementById('option4')
const button = document.getElementById('submit')

const questionArray = ['What day is it?',]
const option1Array = ['Friday',]
const option2Array = ['Saturday',]
const option3Array = ['Sunday',]
const option4Array = ['Monday-Thursday',]

function randomCocktail() {
    fetch('https:www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    .then(resp => resp.json())
    .then(data => randomDrink(data))
}

function changeQuestion() {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        let newIndex = -1
        question.innerHTML = `2. ${questionArray[newIndex +=1]}`
    })
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