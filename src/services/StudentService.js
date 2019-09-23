let _singleton = Symbol();

export default class StudentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new StudentService(_singleton);
        return this[_singleton]
    }

// Create newStudent

    createStudent = student =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/student", {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

// Find All newStudent

    findAllStudent = () =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/student")
            .then(response => response.json())

    findStudentById  = studentId =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/student/${studentId}`)
            .then(response => response.json())


// Delete  newStudent
    deleteStudent = studentId =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/student/${studentId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())

// Update newStudent
    updateStudent = (newStudent) =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/student/${newStudent.id}`, {
            method: 'PUT',
            body: JSON.stringify(newStudent),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json()).then(t => console.log(newStudent))


}