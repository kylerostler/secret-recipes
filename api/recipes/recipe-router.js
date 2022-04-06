const router = require('express').Router()
const Recipe = require('./recipes-model')
const { restricted, checkRecipePayload, checkIngredientPayload, checkStepPayload, checkRecipeId } = require('../middleware/recipes-middleware')

router.get('/', restricted, (req, res, next) => {
    Recipe.getRecipes()
        .then(recipes => {
            res.status(200).json(recipes)
        })
        .catch(next)
})

router.get('/:recipe_id', restricted, checkRecipeId, (req, res, next) => {
    Recipe.getRecipeById(req.params.recipe_id)
        .then(recipe => {
            res.status(200).json(recipe)
        })
        .catch(next)
})

router.post('/', restricted, checkRecipePayload, (req, res, next) => {
    const { recipe_name, source, category } = req.body
    
    Recipe.insert({ recipe_name, source, category }, 'recipes')
      .then(newRecipe => {
        res.status(201).json(newRecipe)
      })
      .catch(next)
  });

router.put('/:recipe_id', restricted, checkRecipeId, checkRecipePayload, (req, res, next) => {
    Recipe.updateRecipe( req.params.recipe_id , req.body )
      .then(recipe => {
        res.status(200).json({recipe, message: `recipe at ${req.params.recipe_id} was changed`})
      })
      .catch(next)
})

router.post('/ingredients', restricted, checkIngredientPayload, (req, res, next) => {
    const { ingredient_name, ingredient_unit } = req.body

    Recipe.insert({ ingredient_name, ingredient_unit }, 'ingredients')
      .then(newIngredient => {
        res.status(201).json(newIngredient)
      })
      .catch(next)
})

router.put('/ingredients/:ingredient_id', restricted, checkIngredientPayload, (req, res, next) => {
    Recipe.updateIngredient( req.params.ingredient_id , req.body )
      .then(ingredient => {
        res.status(200).json({ingredient, message: `ingredient at ${req.params.ingredient_id} was changed`})
      })
      .catch(next)
})

router.post('/steps', restricted, checkStepPayload, (req, res, next) => {
    const { step_text, step_number, recipe_id } = req.body

    Recipe.insert({ step_text, step_number, recipe_id }, 'steps')
      .then(newStep => {
        res.status(201).json(newStep)
      })
      .catch(next)
}) // need to fix so that the step_ingredients table updates when a step is submitted

router.put('/steps/:step_id', restricted, checkStepPayload, (req, res, next) => {
    Recipe.updateStep( req.params.step_id , req.body )
      .then(step => {
        res.status(200).json({step, message: `step #${req.body.step_number} on recipe #${req.body.recipe_id} was changed`})
      })
      .catch(next)
}) // need to fix so that the step_ingredients table updates when a step is submitted
  
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        custom: 'something went wrong inside recipes-router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router