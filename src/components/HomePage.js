import React from 'react'
import StudentHomeComponent from "./Student/StudentHomeComponent";
import AnonymousHomeComponent from './Anonymous/AnonymousHomeComponent';
import RecruiterHomePage from './Recruiter/RecruiterHomePage'

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'LoggedInStatus' : this.props.LoggedInStatus,
            'school' : []
        }


    }

    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/CheckLogin/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.text())
            .then(txt => this.setState(
                {'LoggedInStatus': txt}
            )).then(t =>   fetch('http://school-recruiter-java-server.herokuapp.com/api/school/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState(
                    {'school': txt}
                )

            }))

    }

    updateSchools () {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/CheckLogin/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.text())
            .then(txt => this.setState(
                {'LoggedInStatus': txt}
            )).then(t =>   fetch('http://school-recruiter-java-server.herokuapp.com/api/school/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState(
                    {'school': txt}
                )

            }))
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-1 d-md-block d-none">
                </div>

                <div className="col-md-10 col-12">
                    {this.props.LoggedInStatus === "Recruiter" &&
                    <RecruiterHomePage school={this.props.profile.schools}/>}

                    {this.props.LoggedInStatus === "Anonymous" &&
                    <div className="row">
                        <AnonymousHomeComponent school={this.state.school}/>
                    </div>}

                    {this.props.LoggedInStatus === "Student" &&
                    <div className="row">
                        <StudentHomeComponent school={this.state.school}/>
                    </div>}

                </div>

                <div className="col-md-1 d-md-block d-none">
                </div>

            </div>
        )
    }
}
