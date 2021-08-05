document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()
    
    fetch("http://127.0.0.1:3000/api/v1/favorites/my-favorites" , {
        "method": "GET"
    })
        .then(response => {
           return response.json()
        }).then((data) => {
            cards.innerHTML = renderFavorites(data)
        })
        .catch(err => {
            console.error(err)
        })


function renderFavorites(favoritesArray) {
    let favoritesHtmlArray = favoritesArray.map((result) => {
        console.log(result)
        
        return `
        <div class="card-img-top" style="width: 18rem;">
        <div class="card-body mb-3">  
                        <h5 id="recipe-name"class="card-title">${result.title}</h5>
                        <button><a target="_blank" href="${result.instructions}">Recipe page</a></button>
                        
                    </div>
                </div>`
    })
    return favoritesHtmlArray.join('')
}
const cards = document.getElementById('recipes-container')

})