const db = require('../../data/dbConfig')

 function getDb(location) {
    return db(location)
}

async function getRecipeById(recipe_id) {
    const recipeRows = await db('recipes as r')
        .where('recipe_id', recipe_id)
    return recipeRows
}

async function getById(location, idType, id) {
    const recipeRows = await db(location)
        .where(idType, id)
    return recipeRows
}

async function getIngredientByName(name) {
    const ingredientRows = await db('ingredients as i')
        .select('i.ingredient_id')
        .where('i.ingredient_name', name)
    return ingredientRows
}

function update(location, idType, id, changes) {
    return db(location)
        .where(idType, id)
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

function remove(location, idType, id) {
    return db(location)
        .where(idType, id)
        .del()
}


module.exports = { 
    getRecipeById, 
    insert, 
    getDb,
    getById,
    update,
     getIngredientByName,
     remove };
