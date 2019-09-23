import React from 'react'
import RecruiterBeingFollowed from "./RecruiterBeingFollowed";

export default class RecruiterFollowersContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile : {
                followedStudents : []
            }
        }
    }

    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => this.setState(
                {'profile': txt}
            ))
    }

    render() {
        return (
            <div className="card-columns m-2 align-items-center text-center">
                {this.state.profile.followedStudents.length > 0 &&
                this.state.profile.followedStudents.map(fs =>
                        <RecruiterBeingFollowed key = {fs.id} student={fs}/>
                )}


            </div>
        )
    }
}