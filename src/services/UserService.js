let _singleton = Symbol();

export default class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

// Create User

    createUser = user =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/users", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

// Find All Users

    findAllCourses = () =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/users")
            .then(response => response.json())

    findUserById  = id =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/users/${id}`)
            .then(response => response.json())


// Delete  User

    deleteUser = id =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/users/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())

// Update User
    updateUser = (newUser) =>
        fetch(`http://school-recruiter-java-server.herokuapp.com/api/users/${newUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
			
			
// login user
	loginUsers =(loginDetails) =>
		fetch(`http://school-recruiter-java-server.herokuapp.com/api/login`,{
			method: 'POST',
            body: JSON.stringify(loginDetails),
            headers: {
                'content-type': 'application/json'
            }
		})

// get profile 	
	findProfile = () =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/profile")
            .then(response => response.json())
			
// logout /api/logout
	logoutUser =(loginSession) =>
		fetch(`http://school-recruiter-java-server.herokuapp.com/api/logout`,{
			method: 'POST',
            body: JSON.stringify(loginSession),
            headers: {
                'content-type': 'application/json'
            }
		})

// /api/register
    registerUsers1 =(newUser) =>
		fetch(`http://school-recruiter-java-server.herokuapp.com/api/register`,{
			method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            }
		})

    CheckLogins = () =>
        fetch("http://school-recruiter-java-server.herokuapp.com/api/CheckLogin")
            .then(response => response.json())


}