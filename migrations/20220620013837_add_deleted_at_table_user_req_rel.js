exports.up = function (knex, Promise) {
    return knex.schema.alterTable('usuario_exec_relatorio', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('usuario_exec_relatorio', table => {
        table.dropColumn('deletedAt')
    })
};
