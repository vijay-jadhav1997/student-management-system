import { Schema, Document, Types, models, model } from "mongoose"

export interface SubjectInterface {
  subject: string
  score: number
}

export interface MarksInterface extends Document {
  student: Types.ObjectId
  class: string
  result_date: Date
  marks: SubjectInterface[]
}

const SubjectSchema = new Schema<SubjectInterface>({
  subject: { type: String, required: true },
  score: { type: Number, required: true }
})

const MarksSchema = new Schema<MarksInterface>({
  student: { 
    type: Schema.Types.ObjectId, 
    ref: "Student", 
    required: [true, "StudentId is required."] 
  },
  class: { 
    type: String, 
    required: [true, "Class is required."] 
  },
  result_date: { 
    type: Date, 
    required: true 
  },
  marks: { 
    type: [SubjectSchema], 
    required: true 
  }
}, { timestamps: true })

export const MarksModel = models.Mark ||  model<MarksInterface>("Mark", MarksSchema)
