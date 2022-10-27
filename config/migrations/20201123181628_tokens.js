
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tokens', function (table) {
    table.increments('id')
    table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()

    table.boolean('is_revoked').index().defaultTo(false)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tokens")
}
