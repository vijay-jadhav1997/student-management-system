import { Router } from "express";
import { addStudent, deleteStudent, fetchStudent, fetchStudents, updateStudent } from "../controller/student.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const StudentRouter = Router()

StudentRouter.get('/', fetchStudents)
StudentRouter.post('/', addStudent)
StudentRouter.get('/:id', fetchStudent)
StudentRouter.put('/:id', updateStudent)
StudentRouter.delete('/:id', deleteStudent)

export default StudentRouter