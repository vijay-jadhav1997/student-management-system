// src/middlewares/validation.middleware.ts
import { Request, Response, NextFunction } from "express"
import { ZodObject } from "zod"

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: result.error.issues,
      })
    }
    req.body = result.data
    next()
  }
