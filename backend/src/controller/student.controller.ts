import { Request, Response } from "express";
import { CatchError } from "../lib/error";
import { createStudent, editStudent, getStudent, getStudents, removeStudent } from "../services/student.service";
import { successResponse } from "../lib/response";

export const addStudent = async (req:Request, res: Response) => {
  try {
    const data = await createStudent(req.body)

    return res.status(201).json(successResponse("Student created successfully", data))
  } catch (err) {
    return CatchError(res, err, "Failed to create student.")
  }
}

export const updateStudent = async (req:Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await editStudent(id, req.body)

    return res.status(201).json(successResponse("Student updated successfully", data))
  } catch (err) {
    return CatchError(res, err, "Failed to create student.")
  }
}

export const deleteStudent = async (req:Request, res: Response) => {
  try {
    const { id } = req.params
    await removeStudent(id)

    return res.json(successResponse("Student deleted successfully"))
  } catch (err) {
    return CatchError(res, err, "Failed to create student.")
  }
}

export const fetchStudent = async (req:Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await getStudent(id)

    return res.json(successResponse("Success: Student fetch successful.", data))
  } catch (err) {
    return CatchError(res, err, "Failed to fetch students.")
  }
}

export const fetchStudents = async (req:Request, res: Response) => {
  try {
    const data = await getStudents(req.query)

    return res.json(successResponse("Success: Students list fetch successful.", data))
  } catch (err) {
    return CatchError(res, err, "Failed to fetch students.")
  }
}