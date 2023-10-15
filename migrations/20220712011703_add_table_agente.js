
exports.up = function(knex) {
    return knex.schema.createTable('agente', table => {  
        table.increments('id').primary()
        table.string('nome_agente', 100)
        table.string('formato_arquivo', 100)
        table.integer('intervalo_execucao')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('agente')
};
