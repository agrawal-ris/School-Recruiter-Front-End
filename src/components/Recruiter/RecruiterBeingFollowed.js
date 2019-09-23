import React from 'react'
import {Link} from "react-router-dom";
import UserPhoto from '../../images/user.png'

export default class RecruiterBeingFollowed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentFollows: 0
        }
    }

    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/student/follows/' + this.props.student.id, {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => this.setState(
                {'studentFollows': txt.length}
            ))
    }


    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={UserPhoto} alt="Card cap"/>
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/profile/${this.props.student.id}`}>
                            {this.props.student.firstName} {this.props.student.lastName}
                        </Link>
                    </h5>
                    <p className="card-text">Email : {this.props.student.email}</p>
                    {this.props.student.contactNum &&
                    <p className="card-text">Contact No : {this.props.student.contactNum}</p>}
                    {this.props.student.skills &&
                    <p className="card-text">Skills: {this.props.student.skills}</p>}
                    {this.props.student.joiningYear &&
                    <p className="card-text">Joining Year: {this.props.student.joiningYear}</p>}
                </div>
                <div className="card-footer">
                    <small className="text-muted">Follows {this.state.studentFollows} recruiters</small>
                </div>
            </div>
        )
    }

}




