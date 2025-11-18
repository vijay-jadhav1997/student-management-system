import { Router } from "express"
import { addMarks, editMarks, deleteMarks, fetchMarks } from "../controller/marks.controller"

const MarksRouter = Router()

MarksRouter.get("/:studentId", fetchMarks)
MarksRouter.post("/", addMarks)
MarksRouter.put("/:id", editMarks)
MarksRouter.delete("/:id", deleteMarks)

export default MarksRouter
