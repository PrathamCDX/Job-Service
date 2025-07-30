import { z } from 'zod';

export const DeleteJobTitleSchema = z.object({
    id: z.number(),
});

export const UpdateJobTitleSchema= z.object({
    id: z.number(),
    title: z.string(),
});

export const CreateJobTitleSchema= z.object({
    title: z.string(),
});