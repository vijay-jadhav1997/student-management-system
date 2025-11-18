import { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import Swal from "sweetalert2"
import "bootstrap/dist/css/bootstrap.min.css"
import { FaEdit, FaTrash } from "react-icons/fa"
import MarksForm from "./MarksForm"
import HttpInterceptor from "../../lib/httpInceptor"
import CatchError from "../../lib/catchError"
import Fetcher from "../../lib/fetcher"
import { useParams } from "react-router-dom"
import { Empty, Skeleton } from "antd"

interface MetaInterface {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}


const StudentMarks = () => {
  const [studentInfo, setStudentInfo] = useState<Student | null>(null)
  const [meta, setMeta] = useState<MetaInterface>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editRecord, setEditRecord] = useState<MarksInterface | null>(null)

  const { id : studentId} = useParams()

  // Build URL for SWR
  const url = `/student/marks/${studentId}?page=${meta.page}&limit=${meta.limit}&search=${search}`

  const { data, error, isLoading } = useSWR(url, Fetcher)

  // console.log(data)

  // create / Update student
  const handleSave = async(marksData: MarksInterface) => {
    try {
      let message
      if (editRecord) {
        const { data } = await HttpInterceptor.put(`student/marks/${marksData._id}`, marksData)
        message = data.message
        setEditRecord(null)
      } else {
        const obj = JSON.parse(JSON.stringify(marksData))
        delete obj._id
        const { data } = await HttpInterceptor.post(`student/marks`, obj)
        message = data.message
      }
      mutate(`/student/marks/${studentId}?page=${meta.page}&limit=${meta.limit}&search=${search}`)
      Swal.fire({
        icon: "success",
        title: !editRecord ? "Marks Record Added" : "Marks Record Updated",
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

  // Handle delete
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      await HttpInterceptor.delete(`/student/marks/${id}`)
      await mutate(url)
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Record has been deleted.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      })
    }
  }

  // Handle page change
  const changePage = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }))
    mutate(`/student/marks/${studentId}?page=${newPage}&limit=${meta.limit}&search=${search}`)
  }

  useEffect(()=>{
    const getStudentInfo = async()=>{
      try {
        const { data } = await HttpInterceptor.get(`/student/${studentId}`)
        setStudentInfo(data.data)
      } catch (err: unknown) {
        return CatchError(err)
      }
    }

    getStudentInfo()
  },[studentId])

  useEffect(()=>{
    if(data?.data.meta)
      setMeta(data.data.meta)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  

  return (
    <div className="container-fluid p-4 bg-dark text-light min-vh-100 max-w-7xl">
      {/*  Student Info  */}
      <div className="card bg-dark rounded-4 md:p-4 p-2 mb-4 dark-shadow max-w-5xl">
        {
          studentInfo ?
          // studentInfo &&
          <div className="d-flex flex-column flex-md-row items-center md:items-start gap-4 ">
            <div className="w-[100px] h-[100px] rounded-full text-2xl font-bold bg-pink-600 text-gray-100 flex justify-center items-center">
              {studentInfo.fullname.split(' ').join('').slice(0,2).toUpperCase()}
            </div>
            <div className="text-light">
              <h3 className="fw-bold capitalize">{studentInfo.fullname}</h3>
              <p className="mb-1">ID: {studentInfo.studentId}</p>
              <p className="mb-1">Class: {studentInfo.class}</p>
              <p className="mb-1 capitalize">Medium: {studentInfo.medium}</p>
              <p className="mb-0 capitalize">School: {studentInfo.school}</p>
            </div>
          </div>
          :
          <Skeleton active className="bg-gray-100!" />
        }
      </div>

      {/*  Table Header: Search and Add Button  */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">
        <input
          type="text"
          placeholder="Search by Class or Subject"
          className="form-control w-100 w-md-50"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            // setMeta((prev) => ({ ...prev, page: 1 }))
          }}
        />
        <button
          className="btn btn-primary text-nowrap"
          style={{width: 'max-content'}}
          onClick={() => {
            setEditRecord(null)
            setShowForm(true)
          }}
        >
          Add New Marks
        </button>
      </div>


      {/*  Marks Table  */}
      <div className="table-responsive">
        {isLoading ? (
          <p className="text-light">Loading...</p>
        ) : error ? (
          <p className="text-danger">Error fetching data</p>
        ) : (
          <table className="table table-dark table-striped table-hover align-middle text-center table-striped  table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>Class</th>
                <th>Marks</th>
                <th>Result Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.data.data.map((record: MarksInterface) => (
                  <tr key={record._id}>
                    <td>{record.class}</td>
                    <td>
                      {/* {record.marks
                        .map((mark) => `${mark.subject}: ${mark.score}`)
                        .join(", ")} */}
                      {record.marks.map((sub, idx) => (
                        <div key={idx} style={{ borderBottom: "1px solid #767676e0", textAlign: 'left', paddingBlock: '4px'}}>
                          {sub.subject}: {sub.score}
                        </div>
                      ))}
                    </td>
                    <td>{new Date(record.result_date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => {
                          setEditRecord(record )
                          setShowForm(true)
                        }}
                      >
                        <FaEdit className="text-gray-100" />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(record._id!)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
        {
          !error && data?.data?.data.length === 0 &&
          <Empty className="text-gray-100!" description={<span className="text-gray-100!">No marks' record available!</span>}/>
        }
      </div>

      {/*  Pagination Footer  */}
      {data?.data?.data && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
          {/* Limit input */}
          <div className="d-flex align-items-center gap-2">
            <span>Show</span>
            <input
              type="number"
              className="form-control"
              style={{ width: "80px" }}
              min={1}
              max={50}
              value={meta.limit}
              onChange={(e) => {
                const val = Math.max(1, Math.min(50, Number(e.target.value)))
                setMeta({ ...meta, limit: val, page: 1 })
              }}
            />
            <span>entries</span>
          </div>

          {/* Pagination buttons */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-secondary"
              disabled={!meta.hasPrevPage}
              onClick={() => changePage(1)}
            >
              First
            </button>
            <button
              className="btn btn-secondary"
              disabled={!meta.hasPrevPage}
              onClick={() => changePage(meta.page - 1)}
            >
              Previous
            </button>
            <span className="fw-bold">{meta.page}</span>
            <button
              className="btn btn-secondary"
              disabled={!meta.hasNextPage}
              onClick={() => changePage(meta.page + 1)}
            >
              Next
            </button>
            <button
              className="btn btn-secondary"
              disabled={!meta.hasNextPage}
              onClick={() =>
                changePage(Math.ceil(meta.total / meta.limit))
              }
            >
              Last
            </button>
          </div>
        </div>
      )}

      {/*  Marks Form Modal  */}
      {showForm && (
        <MarksForm
          onClose={() => setShowForm(false)}
          initialData={editRecord}
          studentId={`${studentId}`}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default StudentMarks
