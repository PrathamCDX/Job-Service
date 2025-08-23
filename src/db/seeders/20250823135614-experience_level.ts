import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        const timestamp = new Date();

        await queryInterface.bulkInsert('experience_levels', [
            {
                name: 'Freshers',
                min_years: 0,
                max_years: 2,
                created_at: timestamp,
                updated_at: timestamp,
            },
            {
                name: 'Mid senior',
                min_years: 2,
                max_years: 5,
                created_at: timestamp,
                updated_at: timestamp,
            },
        ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('experience_levels', {
            name: ['Freshers', 'Mid senior'],
        });
    },
};
