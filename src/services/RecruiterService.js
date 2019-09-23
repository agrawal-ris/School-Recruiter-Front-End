let _singleton = Symbol();

export default class RecruiterService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new RecruiterService(_singleton);
        return this[_singleton]
    }

// Create createRecruiter

    createRecruiter = recruiter =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/recruiter", {
            method: 'POST',
            body: JSON.stringify(recruiter),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

// Find All recruiter

    findAllRecruiter = () =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/recruiter")
            .then(response => response.json())

    findRecruiterById  = recruiterId =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/recruiter/${recruiterId}`)
            .then(response => response.json())


// Delete  recruiter

    deleteRecruiter = recruiterId =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/recruiter/${recruiterId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())

// Update recruiter
    updateRecruiter = (newrecruiter) =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/recruiter/${newrecruiter.id}`, {
            method: 'PUT',
            body: JSON.stringify(newrecruiter),
            headers: {
                'content-type': 'application/json'
            }
        })



}