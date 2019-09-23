import React from 'react'
import LikeButtonComponent from "../Buttons/LikeButtonComponent";
import SchoolPhoto from '../../images/school.jpg'
import {Link} from "react-router-dom";

export default class SchoolSingleComponent extends React.Component {
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
                                <LikeButtonComponent currentId={this.props.currentId} school={this.props.school}/>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        )
    }
}
