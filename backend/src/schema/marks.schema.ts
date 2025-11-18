import { z } from "zod";

export const MarkSubjectObj = z.object({
  subject: z.string().min(3, "Subject is required, at least 3 characters long."),
  score: z.number().min(0).max(100)
});

export const MarksZodSchema = z.object({
  student: z.string().length(24, "Invalid ObjectId"),
  class: z.string().min(3, "At least three characters required, must be in this format - 3rd, or 4th, or 10th, ..."),
  result_date: z.date(),
  marks: z.array(MarkSubjectObj).min(1, "At least one subject is required")
});

export type MarksInput = z.infer<typeof MarksZodSchema>;
