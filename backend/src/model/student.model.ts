import { model, models, Schema } from "mongoose";

export interface StudentInterface {
  studentId: string
  fullname: string
  school: string
  class: string
  medium: "english" | "hindi" | "marathi" | "other"
  academic_year: string | Date
}

const studentSchema = new Schema<StudentInterface>({
  studentId: {
    type: String,
    unique: [true, "StudentId must be unique."],
    required: [true, "StudentId required"]
  },
  fullname: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "fullname required"],
  },
  school: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    enum: ["english", "marathi", "hindi", "other"],
    required: true,
  },
  academic_year: {
    type: String, 
    required: true
  },
}, {timestamps: true})

const StudentModel = models.Student || model("Student", studentSchema)

export default StudentModel