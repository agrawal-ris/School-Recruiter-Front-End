import React from "react"
import SchoolPhoto from "../../images/school.jpg"
import {Redirect} from "react-router-dom";

export default class ProfileSpecificComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                id: 0
            },
            redirect: 0,
            currentId: 0,
            'LoggedInStatus' : "Anonymous",
        }
    }
    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/CheckLogin/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.text())
            .then(txt => {
                this.setState(
                    {'LoggedInStatus': txt}
                )
            })

        fetch('http://school-recruiter-java-server.herokuapp.com/api/users/' + this.props.match.params.profileId, {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => this.setState(
                {'profile': txt}
            ))

        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {

                this.setState(
                {'currentId': txt.id}
            )}).then (t => {
            console.log(this.props.match.params.profileId + this.state.currentId)
            if (parseInt(this.props.match.params.profileId) === this.state.currentId) {
                this.setState({
                    redirect: 1
                })
            }
        })



    }


    render() {

        if (this.state.redirect) {
            return <Redirect
                to={{
                    pathname: "/profile",
                    state: { msgReg: "You are Registered" }
                }}/>;
        }


        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="bg-light">
                        <dl className="row p-2">
                            <dt className="col-md-2">
                                Name
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.firstName} {this.state.profile.lastName}
                            </dl>
                        </dl>
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Address
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.address}
                            </dl>
                        </dl>
                        <dl className="row p-2">
                            <dt className="col-md-2  ">
                                Email
                            </dt>
                            <dl className="col-md-10">
                                {this.state.LoggedInStatus !== "Anonymous" && <span>{this.state.profile.email}</span>}
                                {this.state.LoggedInStatus === "Anonymous" && <span className="text-danger">Login to See Sensitive Information</span>}

                            </dl>
                        </dl>
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Phone Number
                            </dt>
                            <dl className="col-md-10">
                                {this.state.LoggedInStatus !== "Anonymous" && <span>{this.state.profile.contactNum}</span>}
                                {this.state.LoggedInStatus === "Anonymous" && <span className="text-danger">Login to See Sensitive Information</span>}
                            </dl>
                        </dl>
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Type of User
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.dtype}
                            </dl>
                        </dl>

                        {this.state.profile.dtype === "Student" && this.state.profile.skills &&
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Skills
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.skills}
                            </dl>
                        </dl>}

                        {this.state.profile.dtype === "Student" && this.state.profile.joiningYear &&
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Joining Year
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.joiningYear}
                            </dl>
                        </dl>}

                        {this.state.profile.dtype === "Recruiter" && this.state.profile.domain &&
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Domain
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.domain}
                            </dl>
                        </dl>}

                        {this.state.profile.dtype === "Recruiter" && this.state.profile.yearsOfExp &&
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Years of Exp
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.yearsOfExp}
                            </dl>
                        </dl>}

                        {this.state.profile.dtype === "Recruiter" && this.state.profile.schools &&
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Recruiting For :
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.schools.length} schools
                            </dl>
                        </dl>}

                        {this.state.profile.dtype === "Recruiter" && this.state.profile.followedStudents &&
                        <dl className="row p-2">
                            <dt className="col-md-2 ">
                                Followers
                            </dt>
                            <dl className="col-md-10">
                                {this.state.profile.followedStudents.length}
                            </dl>
                        </dl>}
                    </div>
                </div>
                <div className="col-md-10"></div>
            </div>
            </div>
        )
    }
}