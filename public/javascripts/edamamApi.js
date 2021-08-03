//const { createReadStream } = require("fs")

const searchBar = document.getElementById('input-search')
const searchForm = document.getElementById('search-form')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchInputHTML = encodeURIComponent(searchBar.value)
    fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=" + searchInputHTML, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "bad60bbcd7msh2db02d2aad21ee5p12cc14jsna7cb23852138",
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
        let recipesHtmlArray = recipesArray.map((result) => {
            console.log(result)
        
            const {image, label, source, url,ingredients,id, dietLabels} = result.recipe
            return `
            <div class="card-img-top" style="width: 18rem;">
                    <img src="${image}" class=" card-img-top border border-2 border-light shadow p-3  bg-body rounded" alt="...">
                    <div class="card-body mb-3">
                        <h5 id="recipe-name"class="card-title">${label}</h5>
                        <p id="recipe-source" class="card-text">${source}</p>
                        <form method="post" action="/api/v1/recipes">
                        <input type="hidden" value="${label}" name="title">
                        <input type="hidden" value="${dietLabels[0]} name="category">
                        <input type="hidden" value="${url}" name="instructions">
                        <input type="hidden" value="${ingredients[0].text}" name="ingredients"> 
                        <button type="submit">Add favorite recipe</button>
                        </form>
                        <a id="eventButton" data-id="${id}" data-name="${label}" href="./results.html" class="btn btn-outline-light eventButton">Recipe Page</a>
                    </div>
                </div>`
        })
        console.log(recipesHtmlArray.join(''))
        return recipesHtmlArray.join('')
    }
    const cards = document.getElementById('recipes-container')
})

{/* */}