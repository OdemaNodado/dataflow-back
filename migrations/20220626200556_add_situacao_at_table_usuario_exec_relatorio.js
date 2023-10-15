exports.up = function (knex, Promise) {
    return knex.schema.alterTable('usuario_exec_relatorio', table => {
        table.varchar('situacao')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('usuario_exec_relatorio', table => {
        table.dropColumn('SITUACAO')
    })
};