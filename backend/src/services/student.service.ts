import StudentModel, { StudentInterface } from "../model/student.model";

export const createStudent = async (data:StudentInterface) => {
  console.log(data)
  const student = await StudentModel.create(data)
  return student
}

export const editStudent = async (id: string, data:StudentInterface) => {
  await StudentModel.updateOne({_id: id}, {$set: data})
}

export const removeStudent = async (id: string) => {
  await StudentModel.findOneAndDelete({_id: id})
  return 
}

export const getStudents = async (queryParams:QueryInterface) => {
  const limit = Math.max( parseInt(queryParams?.limit || '10'), 10)
  const page = Math.max( parseInt(queryParams?.page || '1'), 1)
  const order = queryParams?.order === 'asc' ? 1 : -1
  const skip = (page - 1) * limit

  const [students, total] = await Promise.all([
    StudentModel.find()
      .sort({createdAt: order})
      .skip(skip)
      .limit(limit),
    StudentModel.countDocuments()
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


export const getStudent = async (id:string) => {
  return await StudentModel.findById(id)
}