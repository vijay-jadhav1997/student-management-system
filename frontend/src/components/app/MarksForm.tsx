import { useState, type FC } from "react"
import { RiCloseLine } from "react-icons/ri"

interface MarksFormInterface {
  studentId: string                 
  initialData: MarksInterface | null    
  onSave: (formData: MarksInterface)=> void  
  onClose: () => void
}

const MarksForm: FC<MarksFormInterface> = ({studentId, initialData, onSave, onClose }) => {

  const [formData, setFormData] = useState<MarksInterface>(
    initialData || {
      _id: '',
    student: studentId,
    class: "",
    result_date: "",
    marks: [{ subject: "", score: 0 }],
  })


  // Add new subject
  const addSubjectRow = () => {
    setFormData({
      ...formData,
      marks: [...formData.marks, { subject: "", score: 0 }],
    })
  }

  // Handle basic input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle marks array
  const handleMarkChange = (
    index: number,
    field: keyof SubjectMark,
    value: string
  ) => {
    const updatedMarks = [...formData.marks]

    updatedMarks[index] = {
      ...updatedMarks[index],
      [field]: field === "score" ? Number(value) : value,
    }

    setFormData({ ...formData, marks: updatedMarks })
  }


  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({...formData, _id: initialData?._id ||""})
  }

  return (
    <div className="modal fade show d-block bg-dark-blur">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content bg-dark text-light py-2 sh dark-shadow dark-inset-shadow max-w-xl">

          <div className="modal-header text-light flex justify-between items-center">
            <h5 className="modal-title fw-bold">
              {!initialData ? "Add New Marks" : "Edit Marks"}
            </h5>
            <button  className="flex justify-center items-center" onClick={onClose}><RiCloseLine className="text-gray-100 text-2xl hover:text-gray-300"/></button>
          </div>

          <div className="modal-body row g-3 text-light">
            <form className="" onSubmit={handleSubmit}>
                
              {/* Student ID */}
              <div className="mb-3">
                <label className="form-label">Student ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="student"
                  value={studentId}
                  disabled  
                  required
                />
              </div>

              {/* Class */}
              <div className="mb-3">
                <label className="form-label">Class</label>
                <input
                  type="text"
                  className="form-control"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date */}
              <div className="mb-3">
                <label className="form-label">Result Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="result_date"
                  value={ formData.result_date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Marks */}
              <h5 className="mt-3">Marks</h5>

              {formData.marks.map((mark, index) => (
                <div key={index} className="row mb-2">

                  {/* Subject */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Subject"
                      className="form-control"
                      value={mark.subject}
                      onChange={(e) =>
                        handleMarkChange(index, "subject", e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Score */}
                  <div className="col-md-4">
                    <input
                      type="number"
                      placeholder="Score"
                      className="form-control"
                      value={mark.score}
                      onChange={(e) =>
                        handleMarkChange(index, "score", e.target.value)
                      }
                      required
                    />
                  </div>

                </div>
              ))}


              {/* Add subject */}
              <button
                type="button"
                className="btn btn-secondary max-w-sm mt-2"
                onClick={addSubjectRow}
              >
                + Add Subject
              </button>
              
              <br />
              {/* Submit */}
              <button type="submit" className="btn btn-primary mt-4 w-full">
                { !initialData ? "Add new Marks" : "Update"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MarksForm
