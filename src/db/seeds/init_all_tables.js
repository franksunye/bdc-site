/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('standard_categories').del();
  await knex('standard_details').del();
  await knex('standards').del();
  await knex('categories').del();

  // Inserts seed entries for categories
  const categories = [];
  for (let i = 1; i <= 10; i++) {
    categories.push({ category_name: `分类${i}`, ics_code: `ICS${i}`, cns_code: `CNS${i}` });
  }
  const insertedCategories = await knex('categories').insert(categories, ['id']);

  // Inserts seed entries for standards
  const standards = [];
  for (let i = 1; i <= 10000; i++) {
    standards.push({
      code: `GB ${i}00-${2010 + (i % 10)}`,
      name: `标准名称${i}`,
      english_name: `Standard Name ${i}`,
      status: i % 2 === 0 ? '现行' : '废止',
      url: `http://example.com/${i}`
    });
  }
  const insertedStandards = await knex.batchInsert('standards', standards, 500); // Using batch insert with a batch size of 500

  // Assuming for simplicity that the standard_details and standard_categories
  // relations are not strictly necessary for your immediate testing needs.
  // If needed, similar strategies as for `standards` can be applied.
};
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('standard_categories').del();
  await knex('standard_details').del();
  await knex('standards').del();
  await knex('categories').del();

  // Inserts seed entries for categories
  const categories = [];
  for (let i = 1; i <= 10; i++) {
    categories.push({ category_name: `分类${i}`, ics_code: `ICS${i}`, cns_code: `CNS${i}` });
  }
  const insertedCategories = await knex('categories').insert(categories, ['id']);

  // Inserts seed entries for standards
  const standards = [];
  for (let i = 1; i <= 10000; i++) {
    standards.push({
      code: `GB ${i}00-${2010 + (i % 10)}`,
      name: `标准名称${i}`,
      english_name: `Standard Name ${i}`,
      status: i % 2 === 0 ? '现行' : '废止',
      url: `http://example.com/${i}`
    });
  }
  const insertedStandards = await knex.batchInsert('standards', standards, 500); // Using batch insert with a batch size of 500

  // Assuming for simplicity that the standard_details and standard_categories
  // relations are not strictly necessary for your immediate testing needs.
  // If needed, similar strategies as for `standards` can be applied.
};
