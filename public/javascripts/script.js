document.addEventListener('click', (event) => {
    if (event.target.id == 'eventButton') {
        let clickedRecipeJSON = localStorage.getItem('clickedRecipe');
        let clickedRecipe = JSON.parse(clickedRecipeJSON);
        if (clickedRecipe == null) {
            clickedRecipe = []
        }
        clickedRecipe.splice(0, 1, event.target.dataset.name)
        clickedRecipeJSON = JSON.stringify(clickedRecipe)
        localStorage.setItem('clickedRecipe', clickedRecipeJSON)
    }
})