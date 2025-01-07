import { z } from "zod"

const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })
    
    // Parse and validate the request body
    // await createUserZodSchema.parseAsync({ body: req.body })

    export const UserValidation = {
        createUserZodSchema
    }