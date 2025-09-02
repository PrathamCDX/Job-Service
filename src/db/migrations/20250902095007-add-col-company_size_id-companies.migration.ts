'use strict';

import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          ALTER TABLE companies
          ADD COLUMN company_size_id INT NULL;
        `);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          ALTER TABLE companies
          DROP COLUMN company_size_id;
        `);
    }
};
