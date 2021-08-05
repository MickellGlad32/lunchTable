//const { createReadStream } = require("fs")

const searchBar = document.getElementById('input-search')
const searchForm = document.getElementById('search-form')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchInputHTML = encodeURIComponent(searchBar.value)
    fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=" + searchInputHTML, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c1c27efd16msh8450b0115d8c953p19ee43jsn4e451dea3a66",
            "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com"
        }
    })
        .then(response => {
           
            return response.json()
        })
        .then((data) => {
            
            cards.innerHTML = renderRecipes(data.hits)
        })
        .catch(err => {
            console.error(err)
        })

    function renderRecipes(recipesArray) {
        console.log(recipesArray[0])
        let recipesHtmlArray = recipesArray.map((result, index) => {
        
            const {image, label, source, url,ingredients,id, dietLabels} = result.recipe
            const ingredientsList = ingredients.map((ingredient, index) =>{
                return `<input type="hidden" value="${ingredient.text}" name="ingredients">`
            })
            console.log(ingredientsList)
            return `
            <div class="card-img-top" style="width: 18rem;">
                    <img src="${image}" class=" card-img-top border border-2 border-light shadow p-3  bg-body rounded" alt="...">
                    <div class="card-body mb-3">
                        <h5 id="recipe-name"class="card-title">${label}</h5>
                        
                        <form method="post" action="/api/v1/favorites">
                        <input type="hidden" value="${label}" name="title">
                        <input type="hidden" value="${dietLabels[0]} name="category">
                        <input type="hidden" value="${url}" name="instructions">
                        ${ingredientsList}
                        
                        <button type="submit" class="btn btn-outline-dark eventButton">Add favorite recipe</button>
                        <a id="eventButton" data-id="${id}" data-name="${label}" href="${url}" target="_blank" class="btn btn-outline-dark eventButton">Recipe Page</a>
                        </form>
                        
                    </div>
                </div>`
        })
        console.log(recipesHtmlArray.join(''))
        return recipesHtmlArray.join('')
    }
    const cards = document.getElementById('recipes-container')
})

{/* */}