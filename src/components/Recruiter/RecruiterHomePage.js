import React from 'react'
import RecruiterContent from "./RecruiterContent";
import RecruiterFollowersContent from "./RecruiterFollowersContent";

export default class RecruiterHomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            "Recruiter" : {
                "schools" : []
            },
            schoolApiContent : []
        }

    }

    componentDidMount() {
        console.log('R')

        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                console.log(txt)
                this.setState(
                    {'Recruiter': txt}
                )

            })

    }

    deleteSchool(id) {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/school/' + id, {
            method : 'DELETE',
            credentials: 'include',
        }).then(t => fetch('http://school-recruiter-java-server.herokuapp.com/api/profile/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState(
                    {'Recruiter': txt}
                )

            }))
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-12 alert alert-primary display-4 center-block text-center m-2">
                            Your Schools
                        </div>
                    </div>
                    {this.state.Recruiter.schools.map((school, index )=>
                        <RecruiterContent
                            key = {index}
                            deleteSchool={() => this.deleteSchool(school.id)}
                            school={school}/>)}
                </div>
                <div className="col-md-6">
                    <div className="col-12 alert alert-primary display-4 center-block text-center m-2">
                        Your Recent Followers
                    </div>

                    <RecruiterFollowersContent/>
                </div>
            </div>
        )
    }
}