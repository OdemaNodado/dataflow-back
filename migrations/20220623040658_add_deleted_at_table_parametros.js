exports.up = function (knex, Promise) {
    return knex.schema.alterTable('parametros', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('parametros', table => {
        table.dropColumn('deletedAt')
    })
};
