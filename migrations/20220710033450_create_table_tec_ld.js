
exports.up = function(knex) {
    return knex.schema.createTable('indger_tec_ld', table => { 
        table.increments('id').primary()
        table.integer('TECLD_001')
        table.integer('TECLD_002')
        table.integer('TECLD_003')
        table.integer('TECLD_004')
        table.string('TECLD_005', 20)
        table.integer('TECLD_006')
        table.integer('TECLD_007')
        table.integer('TECLD_008')
        table.integer('TECLD_009')
        table.integer('TECLD_010')
        table.integer('TECLD_011')
        table.integer('TECLD_012')
        table.integer('TECLD_013')
        table.integer('TECLD_014')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('indger_tec_ld')  
};
