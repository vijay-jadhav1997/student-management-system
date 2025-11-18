import { z } from "zod"

export const StudentSchema = z.object({
  studentId: z.string(),
  fullname: z.string(),
  school: z.string(),
  class: z.string(),
  medium: z.enum(["english", "hindi", "marathi", "other"]),
  academic_year: z.union([z.string(), z.date()])
})

export type StudentInput = z.infer<typeof StudentSchema>
