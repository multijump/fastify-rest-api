
exports.up = function(knex, Promise) {
  return knex.schema.createTable('audits', function (table) {
    table.increments('id')
    table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()

    table.integer('object_id').notNullable().index()
    table.string('type', 255).notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("audits")
}
