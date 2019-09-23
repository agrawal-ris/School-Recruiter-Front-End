import React from 'react'
import {Link} from "react-router-dom";

export default class LikeButtonComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalLikes : 0,
            LoggedInStatus : "Anonymous",
            CurrentLike : 0,
            currentId : 0
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
            }).then(a =>
        {
            if (this.state.LoggedInStatus === "Student") {
                fetch('http://school-recruiter-java-server.herokuapp.com/api/student/likes/' + this.props.currentId, {
                    method : 'GET',
                    credentials: 'include',
                }).then(response => response.json())
                    .then(txt => {
                        if (txt) {
                            txt = txt.filter(a => a.id === this.props.school.id)
                            if (txt.length > 0) {
                                this.setState({
                                    CurrentLike : 1
                                })
                            }
                        }
                    })
            }
        })






        fetch('http://school-recruiter-java-server.herokuapp.com/api/school/likes/' + this.props.school.id, {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    totalLikes : txt.length
                })
            })
    }

    deleteLike() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/student/' + this.props.currentId + '/likes/school/' + this.props.school.id, {
            method : 'DELETE',
            credentials: 'include',
        }).then(t =>
            fetch('http://school-recruiter-java-server.herokuapp.com/api/school/likes/' + this.props.school.id, {
                method : 'GET',
                credentials: 'include',
            }).then(response => response.json())
                .then(txt => {
                    this.setState({
                        totalLikes : txt.length,
                        CurrentLike: 0
                    })
                }))


    }

    addLikes() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/student/' + this.props.currentId + '/school/' + this.props.school.id, {
            method : 'POST',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    totalLikes : txt.length
                })
            }).then(t =>
            fetch('http://school-recruiter-java-server.herokuapp.com/api/school/likes/' + this.props.school.id, {
                method : 'GET',
                credentials: 'include',
            }).then(response => response.json())
                .then(txt => {
                    this.setState({
                        totalLikes : txt.length
                    })
                })).then(t =>
            fetch('http://school-recruiter-java-server.herokuapp.com/api/student/likes/' + this.props.currentId, {
                method : 'GET',
                credentials: 'include',
            }).then(response => response.json())
                .then(txt => {
                    if (txt) {
                        txt = txt.filter(a => a.id === this.props.school.id)
                        if (txt.length > 0) {
                            this.setState({
                                CurrentLike : 1
                            })
                        }
                    }
                }))



    }

    render() {
        return (
            <span className="float-right">

                {this.state.LoggedInStatus === "Student" && this.state.CurrentLike === 0 &&
                    <button className="btn bg-primary text-white m-2" onClick={() => this.addLikes()}>
                    <i className="fa fa-thumbs-up"></i>
                    </button>
                }
                {this.state.LoggedInStatus === "Student" && this.state.CurrentLike === 1 &&
                <button className="btn bg-primary text-white m-2" onClick={() => {this.deleteLike()}}>
                    <i className="fa fa-thumbs-down"></i>
                </button>
                }


                {this.state.LoggedInStatus !== "Anonymous" &&
                <button
                    className={!this.state.CurrentLike ? 'btn bg-primary text-light' : 'btn bg-success text-light'}>
                    {this.state.totalLikes}
                    {this.state.totalLikes > 1  && <span> Likes </span>}
                    {this.state.totalLikes <= 1 && <span> Like </span>}
                </button>}

                {this.state.LoggedInStatus === "Anonymous" &&
                <button
                    className={!this.state.CurrentLike ? 'btn bg-primary text-light' : 'btn bg-success text-light'}>
                    <Link className="text-white" to="/Login">
                        {this.state.totalLikes}
                        {this.state.totalLikes > 1  && <span> Likes </span>}
                        {this.state.totalLikes <= 1 && <span> Like </span>}
                    </Link>
                </button>}

            </span>
        )
    }
}