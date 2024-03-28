// src/routes/pages/home.js
const Router = require('koa-router');
const logger = require('../../config/logger');

const router = new Router();

// router.get('/', async (ctx) => {
//     await ctx.render('index');
//     logger.info(`[home.js] renderIndex: Index page rendered successfully`); // 记录页面渲染的日志
// });

// router.get('/', async (ctx) => {
//     ctx.redirect('/standards');
//     logger.info(`[home.js] redirectToStandards: Redirected to standards page`); 
// });

router.get('/', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || '';
    logger.info(`[home.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('standards', {
        basePath: ctx.state.basePath
    });
    logger.info(`[home.js] renderStandards: Standards page rendered successfully`); // 记录页面渲染的日志
});


module.exports = router;