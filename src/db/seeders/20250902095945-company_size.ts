'use strict';

import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        const timeStamp = new Date();

        await queryInterface.bulkInsert('company_sizes', [
            { min_employees: 1, max_employees: 10, created_at: timeStamp, updated_at: timeStamp },
            { min_employees: 11, max_employees: 50, created_at: timeStamp, updated_at: timeStamp },
            { min_employees: 51, max_employees: 200, created_at: timeStamp, updated_at: timeStamp },
            { min_employees: 201, max_employees: 500, created_at: timeStamp, updated_at: timeStamp },
            { min_employees: 501, max_employees: 1000, created_at: timeStamp, updated_at: timeStamp },
            { min_employees: 1001, max_employees: 5000, created_at: timeStamp, updated_at: timeStamp },
            { min_employees: 5001, max_employees: 10000, created_at: timeStamp, updated_at: timeStamp },
            { min_employees: 10001, max_employees: 2147483647, created_at: timeStamp, updated_at: timeStamp },
        ]);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('company_sizes', {});
    }
};
