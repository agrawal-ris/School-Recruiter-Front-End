let _singleton = Symbol();

export default class SchoolService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new SchoolService(_singleton);
        return this[_singleton]
    }

// Create school

    createSchool = school =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/school", {
            method: 'POST',
            body: JSON.stringify(school),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

// Find All school

    findAllSchool = () =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/school")
            .then(response => response.json())

    findSchoolById  = schoolId =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/school/${schoolId}`)
            .then(response => response.json())


// Delete  school

    deleteSchool = schoolId =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/school/${schoolId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())

// Update school
    updateSchool = (newschool) =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/school/${newschool.id}`, {
            method: 'PUT',
            body: JSON.stringify(newschool),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())


}