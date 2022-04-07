This is an express routed api built for using to construct a secret-recipes website.

There are endpoints to register, login, and logout in users-router.
And there are various endpoints inside the recipe-router to get recipes, ingredients, steps and also to edit delete and post new recipes, ingredients and steps.

All endpoints except register are restricted endpoints checking for a token

[POST]/api/auth/register expects a payload of {username: 'string', password: 'string'} and adds a new user to the db
[POST]/api/auth/login expects a legitimate payload of {username: 'string', password: 'string'}
[GET]/api/auth/logout will logout the current user/timeout the current token

[GET]/api/recipes will send back all the recipes
[GET]/api/recipes/:recipe_id will send back the recipe with that id
[POST]/api/recipes expects a payload of {recipe_name: 'string', source: 'string', category: 'string'} and adds a new recipe to the db
[PUT]/api/recipes/:recipe_id expects a payload of {recipe_name: 'string', source: 'string', category: 'string'} and changes the recipe at that id
[DELETE]/api/recipes/:recipe_id deletes the recipe at that id

[GET]/api/recipes/ingredients will send ingredients
[POST]/api/recipes/ingredients expects a payload of { ingredient_name: 'string', ingredient_unit: 'string'} and adds an ingredient with it's corresponding unit of measurement to db
[DELETE]/api/recipes/ingredients/:ingredient_id deletes the ingredient at that id

[GET]/api/recipes/steps will send steps
[POST]/api/recipes/steps expects a payload of {step_text: 'string', step_number: number, recipe_id: 'string'} and posts a new step to db
[PUT]/api/recipes/steps/:step_id expects a payload of {step_text: 'string', step_number: number, recipe_id: 'string'} and edits the step at that id
[DELETE]/api/recipes/steps/:step_id deletes the step at that id
