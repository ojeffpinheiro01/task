
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tarefas', table => {
      table.increments('id').primary()
      table.string('desc').notNull()
      table.string('dataEstimada')
      table.string('dataConclucao')
      table.integer('userId').references('id')
        .inTable('users').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tarefas')
};
