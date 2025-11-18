interface StudentForm {
  // _id?: string;
  studentId: string;
  avatar?: string;
  fullname: string;
  class: string;
  medium: string;
  school: string;
  academic_year: string;
}


interface Student extends StudentForm{
  _id: string;
}


interface SubjectMark {
  subject: string
  score: number
}


interface MarksInterface {
  _id: string
  student: string
  class: string
  marks: SubjectMark[]
  result_date: string
}


interface MetaInterface {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}