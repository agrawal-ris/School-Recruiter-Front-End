import React from 'react'
import LikeButtonComponent from '../Buttons/LikeButtonComponent'
import {Link} from 'react-router-dom'
import SchoolPhoto from "../../images/school.jpg"

export default class RecruiterContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiters : {},
            schoolapi : {}
        }
    }
    componentDidMount() {

        fetch("http://school-recruiter-java-server.herokuapp.com/api/school/" + this.props.school.id+ "/findRecruiter",{
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then (response => response.json()).then(
            t => {
                console.log(t)
                this.setState({
                    recruiters : t
                })
            }
        ).then(a => console.log(this.state))
    }

    render() {
    return (
        <div className='row'>
            <div className="col-md-2"></div>
            <div className="col-md-8">
                <div className="card mb-3">
                    <img className="card-img-top" src={SchoolPhoto} alt="Card cap"/>
                    <div className="card-body">
                        <h5 className="card-title">
                            {this.props.school.title}
                            <Link to={`/editSchool/${this.props.school.id}`}>
                                <span className="float-right text-black-50">
                                    <i className="fa fa-pencil"></i>
                                </span>
                            </Link>
                            <span onClick={() => this.props.deleteSchool(this.props.school.id)}>
                                <button className="float-right mr-1 text-black-50">
                                    <i className="fa fa-trash"></i>
                                </button>
                        </span>
                        </h5>
                        <p className="card-text">{this.props.school.post_content}</p>
                        <p className="card-text">
                            <Link to={`/details/${this.props.school.school_api_id}`}>
                                School Details
                            </Link>
                        </p>
                        <p className="card-text">
                            <small className="text-muted">
                                Written By <Link className="text-muted" to={`/profile/${this.state.recruiters.id}`}>
                                {this.state.recruiters.firstName}
                            </Link>
                            </small>
                            <LikeButtonComponent school={this.props.school}/>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-2"></div>
        </div>
    )
    }
}
