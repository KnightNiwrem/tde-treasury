exports.up = async function(knex, Promise) {
  const hasTable = await knex.schema.hasTable('items');
  if (hasTable) {
    return;
  }

  const createTable = await knex.schema.createTable('items', (table) => {
    table.increments();
    table.string('itemCode');
    table.string('itemName');
    table.integer('quantity');
    table.integer('telegramId');
  });
  return createTable;
};

exports.down = async function(knex, Promise) {
  return knex.schema.dropTable('items');
};