// src/db/migrations/<timestamp>_alter_members_password_nullable.js
exports.up = function(knex) {
    return knex.schema.alterTable('members', function(table) {
        table.string('password').nullable().alter();
        table.dropUnique('email');

    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('members', function(table) {
        table.string('password').notNullable().alter();
        table.string('email').unique().alter();

    });
};