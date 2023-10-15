
exports.up = function(knex) {
    return knex.schema.createTable('conjunto_aneel', table => {
        table.increments('id').primary()
        table.integer(`conjunto`).PRIMARY
        table.string(`tipo`, 2)
        table.string(`descricao`, 100)
        table.integer(`cod_aneel`)
        table.integer(`tpsist`)
        table.string(`areaint`, 100)
    })
};
exports.down = function(knex) {
    return knex.schema.dropTable('conjunto_aneel')
};
