import { useState, type ChangeEvent, type FC, type FormEvent } from "react"
import { RiCloseLine } from "react-icons/ri"

interface StudentFormInterface {
  onClose: () => void
  onSave: (student: Student) => void
  editData: Student | null
}


const StudentForm: FC<StudentFormInterface> = ({ onClose, onSave, editData }) => {
  const [form, setForm] = useState<StudentForm>(
    editData || {
      studentId: "",
      fullname: "",
      class: "",
      medium: "english",
      school: "",
      academic_year: "",
    }
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave({...form, _id: editData?._id || ""})
  }

  return (
    <div className="modal fade show d-block bg-dark-blur">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable ">
        <div className="modal-content bg-dark text-light py-2 sh dark-shadow dark-inset-shadow">

          <div className="modal-header text-light flex justify-between items-center">
            <h5 className="modal-title fw-bold">
              {editData ? "Update Student Record" : "Add New Student Record"}
            </h5>
            <button  className="flex justify-center items-center" onClick={onClose}><RiCloseLine className="text-gray-100 text-2xl hover:text-gray-300"/></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body row g-3 text-light">

              <div className="col-md-6">
                <label className="form-label">Student ID</label>
                <input
                  name="studentId"
                  className="form-control bg-secondary text-light border-light border-light"
                  value={form.studentId}
                  onChange={handleChange}
                  placeholder="STU001"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Fullname</label>
                <input
                  name="fullname"
                  className="form-control bg-secondary text-light border-light border-light"
                  value={form.fullname}
                  onChange={handleChange}
                  placeholder="Shyam  Bhosale"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Class</label>
                <input
                  name="class"
                  className="form-control bg-secondary text-light border-light border-light"
                  value={form.class}
                  onChange={handleChange}
                  placeholder="9th"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Medium</label>
                <select
                  name="medium"
                  className="form-control bg-secondary text-light border-light border-light"
                  value={form.medium}
                  onChange={handleChange}
                >
                  <option value={'english'}>English</option>
                  <option value={'hindi'}>Hindi</option>
                  <option defaultValue={'marathi'} value={'marathi'}>Marathi</option>
                  <option value={'other'}>Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">School</label>
                <input
                  name="school"
                  className="form-control bg-secondary text-light border-light border-light"
                  value={form.school}
                  onChange={handleChange}
                  placeholder="Podar International School, Pune"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Academic Year</label>
                <input
                  name="academic_year"
                  className="form-control bg-secondary text-light border-light border-light"
                  value={form.academic_year}
                  onChange={handleChange}
                  placeholder="2025-2026"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" onClick={onClose}>
                Cancel
              </button>

              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default StudentForm