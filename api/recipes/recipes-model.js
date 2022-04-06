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

function updateRecipe( recipe_id, changes) {
    return db('recipes')
        .where({ recipe_id })
        .update(changes, '*')
}

function updateIngredient( ingredient_id, changes) {
    return db('ingredients')
        .where({ ingredient_id })
        .update(changes, '*')
}

function updateStep( step_id, changes) {
    return db('steps')
        .where({ step_id })
        .update(changes, '*')
}

async function insert(userInput, location) {
    const [id] = await db(location).insert(userInput);

    if (location === 'recipes') {
        return getRecipeById(id);
    } else {
        return userInput
    }
  }

function removeRecipe(recipe_id) {
    return db('recipes')
        .where({ recipe_id })
        .del()
}

function removeIngredient(ingredient_id) {
    return db('ingredients')
        .where({ ingredient_id })
        .del()
}

function removeStep(step_id) {
    return db('steps')
        .where({ step_id })
        .del()
}

module.exports = { 
    getRecipeById, 
    insert, 
    getRecipes,
     getIngredientByName, 
     updateRecipe, 
     updateIngredient,
    updateStep,
    removeRecipe,
    removeIngredient,
    removeStep };
