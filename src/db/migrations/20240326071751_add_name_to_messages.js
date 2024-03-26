exports.up = function(knex) {
    return knex.schema.table('messages', function(table) {
      table.text('name').nullable(); // 添加名为name的新列，允许为空
    });
  };

  exports.down = function(knex) {
    return knex.schema.table('messages', function(table) {
      table.dropColumn('name'); // 删除名为name的列
    });
  };