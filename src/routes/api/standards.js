// src/routes/standards.js
const Router = require('koa-router');
const knex = require('knex')(require('../../db/knexfile').development);
const logger = require('../../config/logger');

const router = new Router({
  prefix: '/api/standards'
});

router.get('/', async (ctx) => {
    const keyword = ctx.query.keyword; // 从查询参数中获取keyword
    let standards;
  
    if (keyword) {
      standards = await knex('standards')
        .where('name', 'like', `%${keyword}%`)
        .select('*');
        logger.info(`[standards.js] searchStandardsWithKeyword: Standard search performed with keyword: ${keyword}`); // 记录info日志
    } else {
      standards = await knex('standards').select('*');
      logger.info(`[standards.js] searchStandardsWithoutKeyword: Standard search performed without keyword`); // 记录info日志
    }
  
    ctx.body = standards;
  });
  
router.post('/', async (ctx) => {
  const newStandard = await knex('standards').insert(ctx.request.body).returning('*');
  logger.info(`[standards.js] addNewStandard: New standard added: ${JSON.stringify(newStandard)}`); // 记录info日志
  ctx.body = newStandard;
});

module.exports = router;
