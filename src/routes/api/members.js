// src/routes/api/members.js
const Router = require('koa-router');
const knex = require('knex')(require('../../db/knexfile').development);
const logger = require('../../config/logger');

const router = new Router({
    prefix: '/api/members'
});

// 入会申请接口
router.post('/', async (ctx) => {
    const memberData = ctx.request.body;

    // 检查必填字段
    const requiredFields = ['company_name', 'contact_name', 'contact_phone'];
    for (const field of requiredFields) {
        if (!memberData[field]) {
            ctx.status = 400; // Bad Request
            ctx.body = { error: `字段 ${field} 是必填的` };
            logger.error(`[members.js] addNewMemberFailed: Failed to add new member due to missing required field: ${field}`);
            return;
        }
    }

    // 检查数据库中是否已经存在相同的公司名称和手机号
    const existingMember = await knex('members')
        .where({ company_name: memberData.company_name, contact_phone: memberData.contact_phone })
        .first();
    
    logger.info(`[members.js] checkExistingMember: Checked for existing member with company name: ${memberData.company_name} and contact phone: ${memberData.contact_phone}. Result: ${existingMember ? 'Member exists' : 'Member does not exist'}`);

    if (existingMember) {
        // 如果已经存在，返回错误信息给客户端
        ctx.status = 400; // Bad Request
        ctx.body = { error: '公司名称和手机号已经存在，请勿重复申请。' };
        logger.error(`[members.js] addNewMemberFailed: Failed to add new member due to duplicate company name or phone number.`);
        return;
    }

    // 插入新的成员记录
    try {
        const newMember = await knex('members').insert(memberData).returning('*');

        ctx.status = 201; // Created
        ctx.body = newMember;
        logger.info(`[members.js] addNewMember: New member added: ${JSON.stringify(newMember)}`);

    } catch (error) {
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[members.js] addNewMemberFailed: Failed to add new member, error: ${error.message}`);
    }
});


// 会员查询接口
router.get('/:id', async (ctx) => {
    const { id } = ctx.params;

    try {
        const member = await knex('members').where('id', id).first();

        if (!member) {
            ctx.status = 404; // Not Found
            ctx.body = { error: '成员不存在' };
            logger.error(`[members.js] queryMemberFailed: Failed to query member with ID: ${id}`);
            return;
        }

        ctx.status = 200; // OK
        ctx.body = member;
        logger.info(`[members.js] queryMember: Member queried successfully, member details: ${JSON.stringify(member)}`);
    } catch (error) {
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[members.js] queryMemberFailed: Failed to query member, error: ${error.message}`);
    }
});

// 查询所有会员接口
router.get('/', async (ctx) => {
    try {
        // 使用Knex查询所有会员记录
        const members = await knex('members').select('*');

        // 如果成功查询到会员记录，返回200状态码和会员记录
        ctx.status = 200; // OK
        ctx.body = members;
        logger.info(`[members.js] queryAllMembers: All members queried successfully, total members: ${members.length}`);
    } catch (error) {
        // 如果查询失败，返回500状态码和错误信息
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[members.js] queryAllMembersFailed: Failed to query all members, error: ${error.message}`);
    }
});

router.post('/query', async (ctx) => {
    const queryParams = ctx.request.body;

    try {
        // 构建查询条件
        let query = knex('members');
        for (const [key, value] of Object.entries(queryParams)) {
            query = query.where(key, value);
        }

        // 执行查询
        const members = await query.select('*');

        // 如果查询成功，返回查询结果
        ctx.status = 200; // OK
        ctx.body = { members };
        logger.info(`[members.js] queryMembersByCondition: Members queried by condition successfully, condition: ${JSON.stringify(queryParams)}`);
    } catch (error) {
        // 如果查询失败，返回错误消息
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[members.js] queryMembersByConditionFailed: Failed to query members by condition, error: ${error.message}`);
    }
});

module.exports = router;