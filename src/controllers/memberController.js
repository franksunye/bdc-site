// src/controllers/memberController.js
const knex = require('knex')(require('../db/knexfile').development);
const logger = require('../config/logger');

async function getMemberDetails(id) {
    try {
        const member = await knex('members').where('id', id).first();
        if (!member) {
            throw new Error('Member not found');
        }
        return member;
    } catch (error) {
        logger.error(`[memberController.js] getMemberDetailsFailed: Failed to get member details for ID: ${id}, error: ${error.message}`);
        throw error;
    }
}

module.exports = {
    getMemberDetails
};