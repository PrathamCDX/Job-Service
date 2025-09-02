'use strict';

import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          ALTER TABLE companies
          ADD CONSTRAINT fk_company_size
          FOREIGN KEY (company_size_id)
          REFERENCES company_sizes(id)
          ON DELETE CASCADE;
        `);
    },


    down: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          ALTER TABLE companies
          DROP FOREIGN KEY fk_company_size;
        `);
    }
};
