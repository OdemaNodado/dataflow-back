
exports.up = function(knex, Promise) {
    return knex.schema.createTable('parametros', table => {
        table.increments('id').primary()
        table.string('NOME').notNull()        
        table.string('PARAMETRO')
        table.string('TIPO', 200)
        table.string('MASCARA', 100)
        table.integer('articleId').references('id')
            .inTable('articles').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('parametros')
};
