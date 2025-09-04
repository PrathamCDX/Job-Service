'use strict';

import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        const timeStamp = new Date();

        const industries = [
            'Information Technology & Services',
            'Software Development',
            'Internet / E-Commerce',
            'Telecommunications',
            'Financial Services',
            'Banking',
            'Insurance',
            'Healthcare & Life Sciences',
            'Pharmaceuticals',
            'Biotechnology',
            'Education & Training',
            'E-Learning / EdTech',
            'Government & Public Sector',
            'Non-Profit / NGO',
            'Consulting & Professional Services',
            'Legal Services',
            'Real Estate & Property',
            'Construction & Infrastructure',
            'Manufacturing',
            'Automotive',
            'Aerospace & Defense',
            'Retail & Wholesale',
            'Consumer Goods (FMCG)',
            'Hospitality & Tourism',
            'Food & Beverages',
            'Transportation & Logistics',
            'Supply Chain & Warehousing',
            'Media & Entertainment',
            'Sports & Recreation',
            'Energy & Utilities',
            'Oil, Gas & Mining',
            'Renewables & Environment',
            'Agriculture',
            'Textiles & Apparel',
            'Design / Creative Services',
            'Human Resources / Staffing',
            'Research & Development',
            'Music',
        ];

        await queryInterface.bulkInsert(
            'industries',
            industries.map((name) => ({
                name,
                created_at: timeStamp,
                updated_at: timeStamp,
            }))
        );
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('industries', {});
    },
};
