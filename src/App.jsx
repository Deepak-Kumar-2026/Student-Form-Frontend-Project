import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import { initialStudents } from "./data/studentsData";
import  "./App.css";
function App() {

  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents(initialStudents);
      setLoading(false);
    }, 1500);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const updateStudent = (updated) => {
    setStudents(
      students.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  if (loading) return <h2>Loading Students...</h2>;

  return (
    <div className="container">
      <h1>Students Management</h1>

      <StudentForm
        addStudent={addStudent}
        editStudent={editStudent}
        updateStudent={updateStudent}
      />

      <StudentTable
        students={students}
        setEditStudent={setEditStudent}
        deleteStudent={deleteStudent}
      />
    </div>
  );
}

export default App;