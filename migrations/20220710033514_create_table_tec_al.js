
exports.up = function(knex) {
    return knex.schema.createTable('indger_tec_al', table => {    
        table.increments('id').primary()
        table.integer('TECAL_001')
        table.integer('TECAL_002')
        table.integer('TECAL_003')
        table.integer('TECAL_004')
        table.string('TECAL_005',20)
        table.integer('TECAL_006')
        table.integer('TECAL_007')
        table.integer('TECAL_008')
        table.integer('TECAL_009')
        table.integer('TECAL_010')
        table.integer('TECAL_011')
        table.integer('TECAL_012')
        table.integer('TECAL_013')
        table.integer('TECAL_014')
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('indger_tec_al')   
};
