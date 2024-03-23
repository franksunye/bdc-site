exports.up = function(knex) {
    return knex.schema.table('members', function(table) {
        // 1. 允许email字段为空
        table.string('email').nullable().alter();

        // 2. 增加创建时间、更新时间，但不设置默认值
        table.timestamp('created_at');
        table.timestamp('updated_at');

        // 3. 增加创建人、更新人
        table.string('created_by').nullable();
        table.string('updated_by').nullable();

        // 4. 增加会员状态字段，默认为否
        table.boolean('is_active').defaultTo(false);
    })
    .then(() => {
        // 为新添加的列设置默认值
        return knex('members').update({
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        });
    });
};

exports.down = function(knex) {
    return knex.schema.table('members', function(table) {
        table.dropColumn('email');
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
        table.dropColumn('created_by');
        table.dropColumn('updated_by');
        table.dropColumn('is_active');
    });
};
