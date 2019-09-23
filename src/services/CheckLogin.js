
var CheckLogin = new Request('http://school-recruiter-java-server.herokuapp.com/api/CheckLogin/', {
            method : 'GET',
            credentials: 'include',
        });

export default CheckLogin;