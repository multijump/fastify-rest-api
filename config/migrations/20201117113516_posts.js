
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function (table) {
     table.increments('id')
     table.string('text', 255).notNullable()
     table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .notNullable()
      .index()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts")
}
