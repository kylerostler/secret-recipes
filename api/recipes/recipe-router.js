const router = require('express').Router()
const Recipe = require('./recipes-model')
const { restricted } = require('../middleware/recipes-middleware')

router.get('/', (req, res, next) => {
    Recipe.getRecipes()
        .then(recipes => {
            res.status(200).json(recipes)
        })
        .catch(next)
})

router.get('/:recipe_id', (req, res, next) => {
    Recipe.getRecipeById(req.params.recipe_id)
        .then(recipe => {
            res.status(200).json(recipe)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const { recipe_name, source, category } = req.body
    
    Recipe.insert({ recipe_name, source, category }, 'recipes')
      .then(newRecipe => {
        res.status(201).json(newRecipe)
      })
      .catch(next)
  });

router.post('/ingredients', (req, res, next) => {
    const { ingredient_name, ingredient_unit } = req.body

    Recipe.insert({ ingredient_name, ingredient_unit }, 'ingredients')
      .then(newIngredient => {
        res.status(201).json(newIngredient)
      })
      .catch(next)
})

router.post('/steps', (req, res, next) => {
    const { step_text, step_number, recipe_id } = req.body

    Recipe.insert({ step_text, step_number, recipe_id }, 'steps')
      .then(newStep => {
        res.status(201).json(newStep)
      })
      .catch(next)
})
  
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        custom: 'something went wrong inside recipes-router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router