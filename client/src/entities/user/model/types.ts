import { userSchema } from "./schemas";
import type z from 'zod'

export type UserT = z.infer<typeof userSchema>

