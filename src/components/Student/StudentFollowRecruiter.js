import React from 'react'
import {Link} from 'react-router-dom'
import UserPhoto from '../../images/user.png'

export default class StudentFollowRecruiter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalFollowers : 0
        }
    }

    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/recruiter/follows/' + this.props.recruiter.id, {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    totalFollowers : txt.length
                })
            })

    }


    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={UserPhoto} alt="User"/>
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/profile/${this.props.recruiter.id}`}>
                        {this.props.recruiter.firstName} {this.props.recruiter.lastName}
                        </Link>
                    </h5>
                    <p className="card-text">Email : {this.props.recruiter.email}</p>
                    <p className="card-text">Recruiting For : {this.props.recruiter.schools.length} schools</p>
                    {this.props.recruiter.domain &&
                    <p className="card-text">Main Domain : {this.props.recruiter.domain}</p>}
                    {this.props.recruiter.yearsOfExp &&
                    <p className="card-text">Years of Experience : {this.props.recruiter.yearsOfExp}</p>}
                </div>
                <div className="card-footer">
                    <small className="text-muted">Followed By : {this.state.totalFollowers} users</small>
                </div>
            </div>
        )
    }

}