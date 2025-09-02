'use strict';

import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          CREATE TABLE company_sizes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            min_employees INT NOT NULL,
            max_employees INT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at DATETIME DEFAULT NULL
          );
        `);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query(`
          DROP TABLE company_sizes ;
        `);
    }
};
