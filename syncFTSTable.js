const Knex = require('knex');
const knexConfig = require('./src/db/knexfile').development;
const knex = Knex(knexConfig);

async function syncFTSTables() {
  try {
    // 同步standards表
    const standards = await knex('standards').select('*');
    await knex.raw('DELETE FROM "standards_fts"');
    await knex.batchInsert('standards_fts', standards.map(({id, code, name, english_name, status, url}) => ({
      code, name, english_name, status, url
    })), 100);

    // 同步categories表
    const categories = await knex('categories').select('*');
    await knex.raw('DELETE FROM "categories_fts"');
    await knex.batchInsert('categories_fts', categories.map(({id, category_name, ics_code, cns_code}) => ({
      category_name, ics_code, cns_code
    })), 100);

    // 同步standard_details表
    const standardDetails = await knex('standard_details').select('*');
    await knex.raw('DELETE FROM "standard_details_fts"');
    await knex.batchInsert('standard_details_fts', standardDetails.map(detail => ({
      publication_date: detail.publication_date,
      implementation_date: detail.implementation_date,
      draft_person: detail.draft_person,
      reviewer: detail.reviewer,
      draft_organization: detail.draft_organization,
      publishing_organization: detail.publishing_organization,
      first_edition_organization: detail.first_edition_organization,
      chief_editor_organization: detail.chief_editor_organization,
      contributing_editor_organization: detail.contributing_editor_organization
    })), 100);

    console.log('所有FTS虚拟表同步完成');
  } catch (error) {
    console.error('同步FTS虚拟表时出错:', error);
  } finally {
    knex.destroy();
  }
}

syncFTSTables();
