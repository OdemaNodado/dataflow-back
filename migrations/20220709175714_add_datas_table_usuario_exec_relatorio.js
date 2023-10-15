
exports.up = function(knex) {
    return knex.schema.alterTable('usuario_exec_relatorio', table => {
        table.timestamp('data_submissao')
        table.timestamp('data_execucao')
        table.timestamp('data_conclusao')
        table.timestamp('data_download')
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('usuario_exec_relatorio', table => {
        table.dropColumn('data_submissao')
        table.dropColumn('data_execucao')
        table.dropColumn('data_conclusao')
        table.dropColumn('data_download') 
    }) 
};
