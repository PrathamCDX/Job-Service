import { z } from 'zod';

export const deleteCompanySchema = z.object({
    id: z.number({
        required_error: 'Company ID is required',
        invalid_type_error: 'Company ID must be a number',
    }),
});

export const updateCompanySchema = z.object({
    id: z.number({
        required_error: 'Company ID is required',
        invalid_type_error: 'Company ID must be a number',
    }),

    name: z
        .string({ invalid_type_error: 'Name must be a string' })
        .min(1, { message: 'Name cannot be empty' })
        .optional(),

    logo: z
        .string({ invalid_type_error: 'Logo must be a string' })
        .url({ message: 'Logo must be a valid URL' })
        .optional(),

    website: z
        .string({ invalid_type_error: 'Website must be a string' })
        .url({ message: 'Website must be a valid URL' })
        .optional(),

    description: z
        .string({ invalid_type_error: 'Description must be a string' })
        .optional(),
});

export const createCompanySchema = z.object({
    name: z
        .string({
            required_error: 'Company name is required',
            invalid_type_error: 'Company name must be a string',
        })
        .min(1, { message: 'Company name cannot be empty' }),

    logo: z
        .string({
            required_error: 'Logo URL is required',
            invalid_type_error: 'Logo must be a string',
        })
        .url({ message: 'Logo must be a valid URL' }),
    website: z
        .union([
            z.string().url({ message: 'Website must be a valid URL' }),
            z.literal(''),
        ])
        .optional(),
    description: z.string({}).optional(),
});
