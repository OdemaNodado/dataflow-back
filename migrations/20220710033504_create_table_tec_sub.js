
exports.up = function(knex) {
    return knex.schema.createTable('indger_tec_sub', table => {     
        table.increments('id').primary()
        table.integer('TECSUB_001')
        table.integer('TECSUB_002')
        table.integer('TECSUB_003')
        table.integer('TECSUB_004')
        table.string('TECSUB_005',20)
        table.integer('TECSUB_006')
        table.integer('TECSUB_007')
        table.integer('TECSUB_008')
        table.integer('TECSUB_009')
        table.integer('TECSUB_010')
        table.integer('TECSUB_011')
        table.integer('TECSUB_012')
        table.integer('TECSUB_013')
        table.integer('TECSUB_014')
        table.integer('TECSUB_015')
        table.integer('TECSUB_016')
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('indger_tec_sub')   
};
