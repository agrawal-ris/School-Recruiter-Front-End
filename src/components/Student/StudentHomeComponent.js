import React from 'react'
import StudentFollowRecruiter from "./StudentFollowRecruiter";
import StudentLikedSchools from "./StudentLikedSchools";

export default class StudentHomeComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            likedSchools : [],
            currentId : 0,
            recruiters: []
        }
    }

    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    currentId : txt.id
                })
            }).then(t =>
        fetch('http://school-recruiter-java-server.herokuapp.com/api/student/likes/' + this.state.currentId, {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    likedSchools : txt
                })
            })).then(t =>
            fetch('http://school-recruiter-java-server.herokuapp.com/api/student/follows/' + this.state.currentId, {
                method : 'GET',
                credentials: 'include',
            }).then(response => response.json())
                .then(txt => {
                    this.setState({
                        recruiters : txt
                    })
                }))


    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6">

                    <div className="col-12 alert alert-primary display-4 text-center">
                        Schools You Like
                    </div>
                    {this.state.likedSchools.map(school =>
                        <StudentLikedSchools key={school.id} currentId = {this.state.currentId} school={school}/>
                    )}


                </div>
                <div className="col-md-6">
                    <div className="col-12 alert alert-primary display-4 text-center">
                        Recruiters You Follow
                    </div>
                    <div className="card-columns m-2  align-items-center text-center">
                        {this.state.recruiters.map(recruiter =>
                            <StudentFollowRecruiter key= {recruiter.id} recruiter={recruiter}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}