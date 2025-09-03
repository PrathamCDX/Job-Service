'use strict';

import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          ALTER TABLE companies
          ADD CONSTRAINT fk_industry
          FOREIGN KEY (industry_id)
          REFERENCES industries(id)
          ON DELETE CASCADE;
        `);
    },


    down: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          ALTER TABLE companies
          DROP FOREIGN KEY fk_industry;
        `);
    }
};
