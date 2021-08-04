
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
                        <a id="eventButton" data-id="${id}" data-name="${label}" href="${url}" target="_blank" class="btn btn-outline-dark eventButton">Recipe Page</a>
                        </form>
                    </div>
                </div>`
    })
    console.log(recipesHtmlArray.join(''))
    return recipesHtmlArray.join('')
}
const cards = document.getElementById('recipes-container')
