exports.up = function(knex) {
    return knex.schema.alterTable('articles', table => {
        table.string('desc_resumida', 100)
        table.integer('agenteid')
    })  
};

exports.down = function(knex) {
    return knex.schema.alterTable('articles', table => {
        table.dropColumn('agenteid')
        table.dropColumn('desc_resumida')
    })   
};
