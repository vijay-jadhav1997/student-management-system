import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import StudentForm from "./StudentForm"
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri"
import CatchError from "../../lib/catchError"
import HttpInterceptor from "../../lib/httpInceptor"
import { Empty } from "antd"
import { Link } from "react-router-dom"


const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editStudent, setEditStudent] = useState<Student | null>(null)

  const [meta, setMeta] = useState<MetaInterface>({
    total: 10,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  })


  // Search filter 
  const filtered = students.filter((student) => {
    const query = search.toLowerCase()
    return (
      student.studentId.toLowerCase().includes(query) ||
      student.fullname.toLowerCase().includes(query) ||
      student.medium.toLowerCase().includes(query) ||
      student.school.toLowerCase().includes(query)
    )
  })

  // delete
  const handleDelete = async(id: string) => {
    const result =  await Swal.fire({
      title: "Delete Record?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    })

    if (result.isConfirmed) {
      await HttpInterceptor.delete(`/student/${id}`)
      fetchStudents()
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Student record has been deleted.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      })
    }
  }

  // create / Update student
  const handleSave = async(studentData: Student) => {
    try {
      let message
      if (editStudent) {
        const { data } = await HttpInterceptor.put(`/student/${studentData._id}`, studentData)
        message = data.message
        setEditStudent(null)
      } else {

        const obj = JSON.parse(JSON.stringify(studentData))
        delete obj._id
        const { data } = await HttpInterceptor.post('/student', obj)
        message = data.message
      }
      fetchStudents()
      Swal.fire({
        icon: "success",
        title: !editStudent ? "Student Record Added" : "Student Record Updated",
        text: message || "Success!",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      })
    } catch (err) {
      CatchError(err)
    } finally {
      setShowForm(false)
    }
    
  }

  const fetchStudents = async() => {
    try {
      const { data } = await HttpInterceptor.get(`/student?limit=${meta.limit}&page=${meta.page}&order=desc`)
      setStudents(data.data.data)
      setMeta(data.data.meta)
    } catch (err) {
      CatchError(err)
    }
  }

  useEffect(()=>{
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[meta.page])

  useEffect(()=>{
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4 text-center">All Students Record</h2>

      {/* search bar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
        <input
          className="form-control w-100 w-md-50"
          placeholder="Search by name, id, medium or school"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn btn-primary text-nowrap"
          style={{width: 'max-content'}}
          onClick={() => {
            setEditStudent(null)
            setShowForm(true)
          }}
        >
          + Add New Student
        </button>
      </div>

      {/* Student List / Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped  table-hover table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Student ID</th>
              <th>Fullname</th>
              <th>Class</th>
              <th>Medium</th>
              <th>School</th>
              <th>Academic Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-dark">
            {
              filtered.length !== 0 &&
              filtered.map((student:Student) => (
                <tr key={student.studentId}>
                  <td className="capitalize">{student.studentId}</td>
                  <td className="capitalize text-start cursor-pointer"><Link to={`/app/marks/${student._id}`}>{student.fullname}</Link></td>
                  <td className="capitalize">{student.class}</td>
                  <td className="capitalize">{student.medium}</td>
                  <td className="capitalize text-start">{student.school}</td>
                  <td className="capitalize">{student.academic_year}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditStudent(student)
                        setShowForm(true)
                      }}
                    >
                      <RiEditLine />
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(student?._id)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          filtered.length === 0 &&
          <Empty className="" description="No students record"/>
        }
      </div>

      {/* Pagination */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
        {/* no. of students per page / Limit */}
        <div className="d-flex align-items-center gap-2">
          <span>Show</span>
          <input
            type="number"
            className="form-control"
            style={{ width: "80px" }}
            min={10}
            max={25}
            value={meta.limit}
            onChange={(e) => {
              setMeta( prev => {
                let value = Number(e.target.value)
                value = Math.max(10, Math.min(25, value))
                return ({...prev, limit: value, page: 1})
              })
            }}
          />
          <span>entries</span>
        </div>

        {/* footer - Pagination */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-secondary"
            disabled={!meta.hasPrevPage}
            onClick={() => {
              setMeta((prev) => ({...prev, page: 1}))
            }}
          >
            First
          </button>

          <button
            className="btn btn-secondary"
            disabled={!meta.hasPrevPage}
            onClick={() => {
              setMeta((prev) => ({...prev, page: prev.page - 1}))
            }}
          >
            Previous
          </button>

          <span className="fw-bold">{(meta.page <= meta.totalPages) ? meta.page : meta.totalPages}</span>

          <button
            className="btn btn-secondary"
            disabled={!meta.hasNextPage}
            onClick={() => {
              setMeta((prev) => ({...prev, page: prev.page + 1}))
            }}
          >
            Next
          </button>

          <button
            className="btn btn-secondary"
            disabled={!meta.hasNextPage}
            onClick={() => {
              setMeta((prev) => ({...prev, page: Math.ceil(prev.total/prev.limit)}))
            }}
          >
            Last
          </button>
        </div>
      </div>

      {/* Form Popup */}
      {showForm && (
        <StudentForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          editData={editStudent}
        />
      )}
    </div>
  )
}

export default Dashboard

