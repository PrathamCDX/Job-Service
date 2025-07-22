'use strict';

import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(
            `
            ALTER TABLE jobs
            ADD CONSTRAINT fk_jobs_title_id
            FOREIGN KEY (title_id)
            REFERENCES job_titles(id)
            ON DELETE CASCADE;
            `
        );
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(
            `
            ALTER TABLE jobs
            DROP FOREIGN KEY fk_jobs_title_id;
            `
        );
    }
};
