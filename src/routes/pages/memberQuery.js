// src/routes/pages/memberQuery.js
const Router = require('koa-router');
const logger = require('../../config/logger'); 

const router = new Router();

router.get('/memberQuery', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || ''; 
    logger.info(`[memberQuery.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('memberQuery', {
        basePath: ctx.state.basePath
    });
    logger.info(`[memberQuery.js] renderMemberQuery: Member query page rendered successfully`); // 记录页面渲染的日志
});

module.exports = router;