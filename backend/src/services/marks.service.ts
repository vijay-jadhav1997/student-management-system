import mongoose from "mongoose"
import { MarksModel } from "../model/marks.model"
import { MarksInput } from "../schema/marks.schema"

export const fetchMarks=  async(studentId: string, queryParams:QueryInterface) => {
  const student = new mongoose.Types.ObjectId(studentId)

  const limit = Math.max( parseInt(queryParams?.limit || '10'), 10)
  const page = Math.max( parseInt(queryParams?.page || '1'), 1)
  const order = queryParams?.order === 'asc' ? 1 : -1
  const skip = (page - 1) * limit

  const [students, total] = await Promise.all([
    MarksModel.find({student})
      .sort({createdAt: order})
      .skip(skip)
      .limit(limit),
    MarksModel.countDocuments()
  ])

 const data = {
    data: students,
    meta: {
      total,                
      page,                 
      limit,               
      totalPages: Math.ceil(total / limit), 
      hasNextPage: (page * limit) < total,
      hasPrevPage: page > 1
    }
  }
  
  return data
}

export const addMarks=  async( data: MarksInput) => {
  const marks = new MarksModel({
    ...data,
    student: new mongoose.Types.ObjectId(data.student),
    result_date: new Date(data.result_date)
  })

  return await marks.save()
}

export const updateMarks=  async(id: string, data: MarksInput) => {
  return await MarksModel.updateOne(
    {_id: id},
    {
      ...data,
      student: new mongoose.Types.ObjectId(data.student),
      result_date: new Date(data.result_date)
    }
  )
}

export const deleteMarks=  async(id: string) => {
  await MarksModel.deleteOne({_id: id})
  return 
}
