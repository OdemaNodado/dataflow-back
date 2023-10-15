
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuario_exec_relatorio', table => {
        table.increments('id').primary()
        table.string('relatorio_nome').notNull()
        table.string('descricao', 200)
        table.string('parametros', 100)
        table.binary('favoritado').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('articleid').references('id')
            .inTable('articles').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuario_exec_relatorio')
};
