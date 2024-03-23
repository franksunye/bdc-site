// src/routes/pages/memberApply.js
const Router = require('koa-router');
const logger = require('../../config/logger');

const router = new Router();

router.get('/memberApply', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || '';
    logger.info(`[memberApply.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('memberApply', {
        basePath: ctx.state.basePath
    });
    logger.info(`[memberApply.js] renderMemberApply: Member apply page rendered successfully`); // 记录页面渲染的日志
});

module.exports = router;