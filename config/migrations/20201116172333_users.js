exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('name', 255).notNullable().unique()
    table.string('role', 255).notNullable()
    table.text('password', 255).notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users")
}