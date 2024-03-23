// src/routes/pages/home.js
const Router = require('koa-router');
const logger = require('../../config/logger');

const router = new Router();

router.get('/', async (ctx) => {
    await ctx.render('index');
    logger.info(`[home.js] renderIndex: Index page rendered successfully`); // 记录页面渲染的日志
});

module.exports = router;