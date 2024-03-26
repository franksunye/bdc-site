// src/routes/api/messages.js
const Router = require('koa-router');
const knex = require('knex')(require('../../db/knexfile').development);
const logger = require('../../config/logger');

const router = new Router({
    prefix: '/api/messages'
});

// 创建消息接口
router.post('/', async (ctx) => {
    const messageData = ctx.request.body;

    try {
        const newMessage = await knex('messages').insert(messageData).returning('*');

        ctx.status = 201; // Created
        ctx.body = newMessage;
        logger.info(`[messages.js] addNewMessage: New message added: ${JSON.stringify(newMessage)}`);
    } catch (error) {
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[messages.js] addNewMessageFailed: Failed to add new message, error: ${error.message}`);
    }
});

// 读取所有消息接口
router.get('/', async (ctx) => {
    try {
        const messages = await knex('messages').select('*');

        ctx.status = 200; // OK
        ctx.body = messages;
        logger.info(`[messages.js] queryAllMessages: All messages queried successfully, total messages: ${messages.length}`);
    } catch (error) {
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[messages.js] queryAllMessagesFailed: Failed to query all messages, error: ${error.message}`);
    }
});

// 读取单个消息接口
router.get('/:id', async (ctx) => {
    const { id } = ctx.params;

    try {
        const message = await knex('messages').where('id', id).first();

        if (!message) {
            ctx.status = 404; // Not Found
            ctx.body = { error: '消息不存在' };
            logger.error(`[messages.js] queryMessageFailed: Failed to query message with ID: ${id}`);
            return;
        }

        ctx.status = 200; // OK
        ctx.body = message;
        logger.info(`[messages.js] queryMessage: Message queried successfully, message details: ${JSON.stringify(message)}`);
    } catch (error) {
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[messages.js] queryMessageFailed: Failed to query message, error: ${error.message}`);
    }
});

// 更新消息接口
router.put('/:id', async (ctx) => {
    const { id } = ctx.params;
    const { message, reply } = ctx.request.body;

    try {
        const updatedMessage = await knex('messages').where('id', id).update({
            message,
            reply
        }).returning('*');

        if (!updatedMessage) {
            ctx.status = 404; // Not Found
            ctx.body = { error: '消息不存在' };
            logger.error(`[messages.js] updateMessageFailed: Failed to update message with ID: ${id}`);
            return;
        }

        ctx.status = 200; // OK
        ctx.body = updatedMessage;
        logger.info(`[messages.js] updateMessage: Message updated successfully, message details: ${JSON.stringify(updatedMessage)}`);
    } catch (error) {
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[messages.js] updateMessageFailed: Failed to update message, error: ${error.message}`);
    }
});

// 删除消息接口
router.delete('/:id', async (ctx) => {
    const { id } = ctx.params;

    try {
        const deletedMessage = await knex('messages').where('id', id).del();

        if (!deletedMessage) {
            ctx.status = 404; // Not Found
            ctx.body = { error: '消息不存在' };
            logger.error(`[messages.js] deleteMessageFailed: Failed to delete message with ID: ${id}`);
            return;
        }

        ctx.status = 200; // OK
        ctx.body = { message: '消息已删除' };
        logger.info(`[messages.js] deleteMessage: Message deleted successfully, message ID: ${id}`);
    } catch (error) {
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: '服务器错误' };
        logger.error(`[messages.js] deleteMessageFailed: Failed to delete message, error: ${error.message}`);
    }
});

module.exports = router;