let h1 = document.getElementById('h1')
const question = document.getElementById('question')
const option1 = document.getElementById('option1')
const option2 = document.getElementById('option2')
const option3 = document.getElementById('option3')
const option4 = document.getElementById('option4')


function randomCocktail() {
    fetch('https:www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    .then(resp => resp.json())
    .then(data => randomDrink(data))
}

function randomDrink(objArray) {
    drinkArray = Object.values(objArray)
    console.log(drinkArray)
    for (const drink of drinkArray) {
        console.log(drink)

    }
}



randomCocktail()