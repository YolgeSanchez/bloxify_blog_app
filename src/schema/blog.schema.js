import { z } from 'zod'

export const createBlogSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(12, { message: 'Title is required' })
    .max(72),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(20, { message: 'Description is required' })
    .max(200),
})
