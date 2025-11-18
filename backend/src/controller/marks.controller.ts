import { Request, Response } from "express"
import * as MarksService from "../services/marks.service"
import { successResponse } from "../lib/response"
import { CatchError } from "../lib/error"

export const fetchMarks = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const data = await MarksService.fetchMarks(studentId, req.query)

    return res.json({ success: true, data })
  } catch (err: unknown) {
    return CatchError(res, err, "Failed to fetch marks")
  }
}

export const addMarks = async (req: Request, res: Response) => {
  try {
    const data = await MarksService.addMarks(req.body)

    return res.status(201).json(successResponse("Marks record created successfully.", data))
  } catch (err: unknown) {
    return CatchError(res, err, "Failed to add marks")
  }
}

export const editMarks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await MarksService.updateMarks(id, req.body)

    return res.json(successResponse("Marks updated successfully", data))
  } catch (err: unknown) {
    return CatchError(res, err, "Failed to update marks")
  }
}

export const deleteMarks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await MarksService.deleteMarks(id)

    return res.json(successResponse("Marks deleted successfully"))
  } catch (err: unknown) {
    return CatchError(res, err, "Failed to delete Marks")
  }
}
