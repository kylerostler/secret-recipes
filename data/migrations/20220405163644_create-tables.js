/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
    .createTable('users', users => {
        users.increments();
        users.string('username', 255).notNullable().unique();
        users.string('password', 255).notNullable();
        users.integer('logged_out_time')
      })
      .createTable('recipes', tbl => {
        tbl.increments('recipe_id');
        tbl.string('recipe_name', 100).notNullable().unique()
        tbl.string('source', 100).notNullable()
        tbl.string('category', 100).notNullable()
    })
    .createTable('ingredients', tbl => {
        tbl.increments('ingredient_id');
        tbl.string('ingredient_name', 200).notNullable().unique();
        tbl.string('ingredient_unit', 50)
    })
    .createTable('steps', tbl => {
        tbl.increments('step_id');
        tbl.string('step_text', 200).notNullable();
        tbl.integer('step_number').notNullable()
        tbl.integer('recipe_id')
          .unsigned()
          .notNullable()
          .references('recipe_id')
          .inTable('recipes')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
    })
    .createTable('step_ingredients', tbl => {
        tbl.increments('step_ingredient_id')
        tbl.float('quantity').notNullable()
        tbl.integer('step_id')
        .unsigned()
        .notNullable()
        .references('step_id')
        .inTable('steps')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
        tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')
};
