'use strict';

import { QueryInterface } from 'sequelize';


export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
        CREATE TABLE company_cities (
          id INT AUTO_INCREMENT PRIMARY KEY,
          company_id INT NOT NULL,
          city_id INT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `);

    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
          DROP TABLE IF EXISTS company_cities;
        `);
    }
};
