const recipes = [
    {recipe_name: 'tacos', source: 'granpda john', category: 'mexican'},
    {recipe_name: 'spaghetti', source: 'aunt betty', category: 'pasta'},
    {recipe_name: 'burgers', source: 'gordon ramsay', category: 'fast'},
]

const ingredients = [
    {ingredient_name: 'beef', ingredient_unit: 'lbs'},
    {ingredient_name: 'pasta', ingredient_unit: 'lbs'},
    {ingredient_name: 'buns', ingredient_unit: 'slices'},
    {ingredient_name: 'tortilla', ingredient_unit: 'shells'},
    {ingredient_name: 'sauce', ingredient_unit: 'oz'}
]

const step_ingredients = [
    { step_id: 1, ingredient_id:1, quantity: 1},

    { step_id: 2, ingredient_id:5, quantity: 1},

    { step_id: 2, ingredient_id:3, quantity: 2}
]

const steps = [
    {step_text: 'heat beef', step_number: 1, recipe_id: 1},
    {step_text: 'warm tortillas', step_number: 2, recipe_id: 1},
    {step_text: 'make taco', step_number: 3, recipe_id: 1},

    {step_text: 'heat pan', step_number: 1, recipe_id: 2},
    {step_text: 'add sauce', step_number: 2, recipe_id: 2},
    {step_text: 'add pasta', step_number: 3, recipe_id: 2},

    {step_text: 'heat grill', step_number: 1, recipe_id: 3},
    {step_text: 'put on bun', step_number: 2, recipe_id: 3},
]

exports.seed = async function (knex) {
    await knex('recipes').insert(recipes)
    await knex('ingredients').insert(ingredients)
    await knex('steps').insert(steps)
    await knex('step_ingredients').insert(step_ingredients)
}