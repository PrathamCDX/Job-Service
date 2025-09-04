'use strict';

import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          ALTER TABLE companies
          ADD COLUMN industry_id INT NULL;
        `);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          ALTER TABLE companies
          DROP COLUMN industry_id;
        `);
    }
};
