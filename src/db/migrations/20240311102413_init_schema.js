/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // 创建标准基本信息表
    return knex.schema.createTable('standards', function(table) {
      table.increments('id').primary(); // 主键
      table.string('code').notNullable().unique(); // 标准编号，唯一
      table.string('name').notNullable(); // 标准名称
      table.string('english_name'); // 英文名称
      table.string('status'); // 标准状态
      table.string('url'); // 查看地址
    })
    .then(function() {
      // 创建标准分类表
      return knex.schema.createTable('categories', function(table) {
        table.increments('id').primary(); // 主键
        table.string('category_name').notNullable(); // 分类名称
        table.string('ics_code').unique(); // ICS号，唯一
        table.string('cns_code').unique(); // 中标分类号，唯一
      });
    })
    .then(function() {
      // 创建标准详情表
      return knex.schema.createTable('standard_details', function(table) {
        table.increments('id').primary(); // 主键
        table.integer('standard_id').unsigned().references('id').inTable('standards').onDelete('CASCADE'); // 外键，引用标准基本信息表
        table.date('publication_date'); // 发布日期
        table.date('implementation_date'); // 实施日期
        table.string('draft_person'); // 起草人
        table.string('reviewer'); // 审核人
        table.string('draft_organization'); // 起草单位
        table.string('publishing_organization'); // 发布单位
        table.string('first_edition_organization'); // 初版单位
        table.string('chief_editor_organization'); // 主编单位
        table.string('contributing_editor_organization'); // 参编单位
      });
    })
    .then(function() {
      // 创建标准与分类关联表
      return knex.schema.createTable('standard_categories', function(table) {
        table.increments('id').primary(); // 主键
        table.integer('standard_id').unsigned().references('id').inTable('standards').onDelete('CASCADE'); // 外键，引用标准基本信息表
        table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE'); // 外键，引用标准分类表
      });
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
