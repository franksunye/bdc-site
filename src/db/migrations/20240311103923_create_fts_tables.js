exports.up = function(knex) {
    return Promise.all([
      knex.schema.raw('CREATE VIRTUAL TABLE IF NOT EXISTS "standards_fts" USING fts5(code, name, english_name, status, url)'),
      knex.schema.raw('CREATE VIRTUAL TABLE IF NOT EXISTS "categories_fts" USING fts5(category_name, ics_code, cns_code)'),
      knex.schema.raw('CREATE VIRTUAL TABLE IF NOT EXISTS "standard_details_fts" USING fts5(publication_date, implementation_date, draft_person, reviewer, draft_organization, publishing_organization, first_edition_organization, chief_editor_organization, contributing_editor_organization)')
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.raw('DROP TABLE IF EXISTS "standards_fts"'),
      knex.schema.raw('DROP TABLE IF EXISTS "categories_fts"'),
      knex.schema.raw('DROP TABLE IF EXISTS "standard_details_fts"')
    ]);
  };
  
