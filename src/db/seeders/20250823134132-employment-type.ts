import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        const timestamp = new Date();

        await queryInterface.bulkInsert('employment_types', [
            {
                name: 'Internship',
                description: 'Internship employment type',
                created_at: timestamp,
                updated_at: timestamp,
            },
            {
                name: 'Part time',
                description: 'Part-time employment type',
                created_at: timestamp,
                updated_at: timestamp,
            },
            {
                name: 'Full time',
                description: 'Full-time employment type',
                created_at: timestamp,
                updated_at: timestamp,
            },
        ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('employment_types', {
            name: ['Internship', 'Part time', 'Full time'],
        });
    },
};
