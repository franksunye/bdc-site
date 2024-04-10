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

router.get('/standards', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || '';
    logger.info(`[standards.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('standards', {
        basePath: ctx.state.basePath
    });
    logger.info(`[standards.js] renderStandards: Standards page rendered successfully`); // 记录页面渲染的日志
});

router.get('/message', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || '';
    logger.info(`[message.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('message', {
        basePath: ctx.state.basePath
    });
    logger.info(`[message.js] renderMessage: Message page rendered successfully`); // 记录页面渲染的日志
});

router.get('/memberQuery', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || ''; 
    logger.info(`[memberQuery.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('memberQuery', {
        basePath: ctx.state.basePath
    });
    logger.info(`[memberQuery.js] renderMemberQuery: Member query page rendered successfully`); // 记录页面渲染的日志
});

router.get('/memberApply', async (ctx) => {
    ctx.state.basePath = process.env.BASE_PATH || '';
    logger.info(`[memberApply.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('memberApply', {
        basePath: ctx.state.basePath
    });
    logger.info(`[memberApply.js] renderMemberApply: Member apply page rendered successfully`); // 记录页面渲染的日志
});

router.get('/member/details/:id', async (ctx) => {
    const { id } = ctx.params;
    ctx.state.basePath = process.env.BASE_PATH || '';
    logger.info(`[pages.js] basePath: ${ctx.state.basePath}`);
    await ctx.render('memberDetails', {
        basePath: ctx.state.basePath,
        memberId: id // 传递会员ID到模板中
    });
    logger.info(`[pages.js] renderMemberDetails: Member details page rendered successfully, member ID: ${id}`);
});

module.exports = router;