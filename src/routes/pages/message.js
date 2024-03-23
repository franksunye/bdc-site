// src/routes/pages/message.js
const Router = require('koa-router');
const logger = require('../../config/logger');

const router = new Router();

router.get('/message', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || '';
    logger.info(`[message.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('message', {
        basePath: ctx.state.basePath
    });
    logger.info(`[message.js] renderMessage: Message page rendered successfully`); // 记录页面渲染的日志
});

module.exports = router;