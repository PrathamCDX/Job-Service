import { z } from 'zod';

export const createApplicationSchema= z.object({
    jobId: z.number({message: 'Required' })
});