
exports.up = function(knex) {
    return knex.schema.alterTable('usuario_exec_relatorio', table => {
        table.string('nome_arquivo', 300)
    })  
};

exports.down = function(knex) {
    return knex.schema.alterTable('usuario_exec_relatorio', table => {
        table.dropColumn('nome_arquivo')
    })   
};
