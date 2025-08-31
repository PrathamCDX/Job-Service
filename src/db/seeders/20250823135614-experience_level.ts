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
            {
                name: 'Senior',
                min_years: 5,
                max_years: 8,
                created_at: timestamp,
                updated_at: timestamp,
            },
            {
                name: 'Lead',
                min_years: 8,
                max_years: 12,
                created_at: timestamp,
                updated_at: timestamp,
            },
            {
                name: 'Principal / Architect',
                min_years: 12,
                max_years: 15,
                created_at: timestamp,
                updated_at: timestamp,
            },
            {
                name: 'Director',
                min_years: 15,
                max_years: 50, // capped upper limit
                created_at: timestamp,
                updated_at: timestamp,
            },
        ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('experience_levels', {
            name: [
                'Freshers',
                'Mid senior',
                'Senior',
                'Lead',
                'Principal / Architect',
                'Director+',
            ],
        });
    },
};