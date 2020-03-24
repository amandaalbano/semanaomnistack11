
exports.up = function(knex) {
    return knex.schema.createTable('casos', function(table){
        //chave primária
        table.increments(); //id autoincremento
        
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();
        
        //relacionamentos
        table.string('ong_id').notNullable();

        //chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('casos');
};
