// src/routes/pages/standards.js
const Router = require('koa-router');
const logger = require('../../config/logger');

const router = new Router();

router.get('/standards', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || '';
    logger.info(`[standards.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('standards', {
        basePath: ctx.state.basePath
    });
    logger.info(`[standards.js] renderStandards: Standards page rendered successfully`); // 记录页面渲染的日志
});

module.exports = router;