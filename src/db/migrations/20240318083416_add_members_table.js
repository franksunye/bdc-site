exports.up = function(knex) {
    return knex.schema
        .createTable('members', function(table) {
            table.increments('id').primary();
            table.string('company_name').notNullable();
            table.string('website');
            table.string('logo');
            table.string('contact_name').notNullable();
            table.string('contact_phone').notNullable();
            table.string('contact_position');
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            // 可以根据需要添加更多字段
        })
        .createTable('messages', function(table) {
            table.increments('id').primary();
            table.integer('member_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
            table.text('message').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.text('reply');
            table.timestamp('reply_at');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('messages')
        .dropTableIfExists('members');
};
