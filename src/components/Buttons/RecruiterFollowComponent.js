import React from 'react'

export default class RecruiterFollowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFollow : 0,
            LoggedInStatus : "Anonymous",
            currentId : 0,
            totalFollowers: this.props.recruiter.followedStudents.length

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
            }).then(t => {
            fetch('http://school-recruiter-java-server.herokuapp.com/api/profile', {
                method : 'GET',
                credentials: 'include',
            }).then(response => response.json())
                .then(txt => {
                    this.setState({
                        currentId : txt.id

                    })
                }).then(t => {
                fetch('http://school-recruiter-java-server.herokuapp.com/api/student/follows/' + this.state.currentId, {
                    method : 'GET',
                    credentials: 'include',
                }).then(response => response.json()).then(t =>
                    {
                        if (this.state.LoggedInStatus === "Student") {
                            t = t.filter(a => a.id === this.props.recruiter.id)
                            if (t.length > 0)
                            {
                                this.setState({
                                    totalFollowers: t[0].followedStudents.length
                                })
                            }
                        }
                    }
                )


                    if (this.state.LoggedInStatus === "Student") {

                        fetch('http://school-recruiter-java-server.herokuapp.com/api/recruiter/follows/' + this.props.recruiter.id, {
                            method : 'GET',
                            credentials: 'include',
                        }).then(response => response.json())
                            .then(txt => {
                                if (txt) {
                                    txt = txt.filter(a => a.id === this.state.currentId)

                                    if (txt.length > 0) {
                                        this.setState({
                                            currentFollow : 1
                                        })
                                    }
                                }
                            })
                    }
                }
            )
        })

    }

    deleteFollower() {

        fetch('http://school-recruiter-java-server.herokuapp.com/api/student/' + this.state.currentId + '/follows/recruiter/' + this.props.recruiter.id, {
            method : 'DELETE',
            credentials: 'include',
        }).then(t =>
            fetch('http://school-recruiter-java-server.herokuapp.com/api/recruiter/follows/' + this.props.recruiter.id, {
                method : 'GET',
                credentials: 'include',
            }).then(response => response.json())
                .then(txt => {
                    this.setState({
                        totalFollowers : txt.length,
                        currentFollow: 0
                    })
                }))


    }

    addFollower() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/student/' + this.state.currentId + '/recruiter/' + this.props.recruiter.id, {
            method : 'POST',
            credentials: 'include',
        }).then(response => response.json())
            .then(t => {
                this.setState({
                    totalFollowers: t[t.length-1].followedStudents.length,
                    currentFollow: 1
                })
            })
    }

    render () {
        return (
            <span className="float-right">

                {this.state.LoggedInStatus === "Student" && this.state.currentFollow === 0 &&
                <button className="btn bg-success text-white m-2" onClick={() => this.addFollower()}>
                    <i className="fa fa-plus"></i>
                </button>
                }
                {this.state.LoggedInStatus === "Student" && this.state.currentFollow === 1 &&
                <button className="btn bg-warning text-white m-2" onClick={() => {this.deleteFollower()}}>
                    <i className="fa fa-minus"></i>
                </button>
                }
                <button className="btn bg-info text-light m-2">
                    {this.state.totalFollowers} Followers
                </button>
            </span>
        )
    }
}