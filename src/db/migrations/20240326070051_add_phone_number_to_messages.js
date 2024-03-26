exports.up = function(knex) {
    return knex.schema.table('messages', function(table) {
       table.text('phone_number').nullable(); // 添加手机号字段，允许为空
    });
   };
   
   exports.down = function(knex) {
    return knex.schema.table('messages', function(table) {
       table.dropColumn('phone_number'); // 删除手机号字段
    });
   };