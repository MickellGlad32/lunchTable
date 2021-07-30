//const { createReadStream } = require("fs")

const searchBar = document.getElementById('input-search')
const searchForm = document. getElementById('search-form')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchInputHTML = encodeURIComponent(searchBar.value)
    fetch("https://edamam-recipe-search.p.rapidapi.com/search" + searchInputHTML, {
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
            cards.innerHTML = renderRecipes(data.data)
        })
        .catch(err => {
            console.error(err)
        })

    function renderRecipes(recipesArray) {
        let recipesHtmlArray = recipesArray.map((result) => {
            return `
            <div class="card-img-top" style="width: 18rem;">
                    <img src="${result.picture_medium}" class=" card-img-top border border-2 border-light shadow p-3  bg-body rounded" alt="...">
                    <div class="card-body mb-3">
                        <h5 id="recipe-name"class="card-title">${result.name}</h5>
                        <p id="recipe-info" class="card-text">${result.type}</p>
                        <a id="eventButton" data-id="${result.id}" data-name="${result.name}" href="./results.html" class="btn btn-outline-light eventButton">Recipe Page</a>
                    </div>
                </div>`
        })

        return recipesHtmlArray.join('')
    }
    const cards = document.getElementById('recipes-container')
})