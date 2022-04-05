const db = require('../../data/dbConfig')

function getRecipes() {
    return db('recipes')
}

async function getRecipeById(recipe_id) {
    const recipeRows = await db('recipes as r')
        .where('recipe_id', recipe_id)
    return recipeRows
}

async function insert(userInput, location) {
    const [id] = await db(location).insert(userInput);
    
    if (location === 'recipes') {
        return getRecipeById(id);
    } else {
        return userInput
    }
  }

module.exports = { getRecipeById, insert, getRecipes }
