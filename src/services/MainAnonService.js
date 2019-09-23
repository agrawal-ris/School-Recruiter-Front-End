
class MainAnonService {

    constructor() {
        this.getUrl = "localhost:8080/schools/";
    }


    findAllFamousSchoolPosts = () =>
        fetch({
            url : this.getUrl,
            method : 'GET'
        }).then(response => response.json())

}

export default MainAnonService