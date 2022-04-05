const db = require('../../data/dbConfig')

function getRecipes() {
    return db('recipes')
}

async function getRecipeById(recipe_id) {
    const recipeRows = await db('recipes as r')
        .where('recipe_id', recipe_id)
    return recipeRows
}

async function getIngredientByName(name) {
    const ingredientRows = await db('ingredients as i')
        .select('i.ingredient_id')
        .where('i.ingredient_name', name)
    return ingredientRows
}

// async function getStepById()

async function insert(userInput, location) {
    const [id] = await db(location).insert(userInput);

    if (location === 'recipes') {
        return getRecipeById(id);
    } else {
        return userInput
    }
  }

module.exports = { getRecipeById, insert, getRecipes, getIngredientByName };
