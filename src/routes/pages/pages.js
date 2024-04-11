// src/routes/pages/home.js
const Router = require('koa-router');
const logger = require('../../config/logger');
const { getMemberDetails } = require('../../controllers/memberController');

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

    try {
        const memberDetails = await getMemberDetails(id); // 使用 controller 中的函数获取会员详情

        await ctx.render('memberDetails', {
            basePath: ctx.state.basePath,
            memberDetails: memberDetails // 传递会员详情到模板中
        });
        logger.info(`[pages.js] renderMemberDetails: Member details page rendered successfully, member ID: ${id}`);
    } catch (error) {
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[pages.js] renderMemberDetailsFailed: Failed to render member details page, error: ${error.message}`);
    }

});

module.exports = router;