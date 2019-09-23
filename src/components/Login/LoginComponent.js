import React from 'react'
import {Link} from 'react-router-dom'

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user : {
                "username" : "",
                "password" : ""
            }

        }

    }

    changeUsername (event) {
        this.setState({
            user : {
                "username": event.target.value,
                "password": this.state.user.password
            }
        })
    }

    changePassword (event) {
        this.setState({
            user : {
                "username": this.state.user.username,
                "password": event.target.value
            }
        })
    }

    loginUser () {

        fetch('http://school-recruiter-java-server.herokuapp.com/api/login',{
            method : "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }           ,
            body : JSON.stringify(this.state.user)
        }).then(response => response.json())
            .then(txt => {
                console.log(txt)
                fetch('http://school-recruiter-java-server.herokuapp.com/api/CheckLogin/', {
                    method : 'GET',
                    credentials: "include",
                }).then(response => response.text())
                    .then(txt => console.log(txt)).then( this.props.checkLogin())
            }).then(   t=>this.props.updateProfile())




    }

    render () {
        return (
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 bg-light text-black rounded">
                    <h1> Login
                        <Link to="/" className="float-right">
                            <i className="fa fa-times-circle"></i>
                        </Link>
                    </h1>
                    <div className="form-group row">
                        <label htmlFor="usernameFld" className="col-md-2 col-form-label">
                            Username
                        </label>
                        <div className="col-md-10">
                            <input id="usernameFld"
                                   className="form-control"
                                   onChange = {(event) => this.changeUsername(event)}
                                   placeholder="Bob1234"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="passwordFld" className="col-md-2 col-form-label">
                            Password
                        </label>
                        <div className="col-md-10">
                            <input id="passwordFld"
                                   type="password"
                                   onChange = {(event) => this.changePassword(event)}
                                   className="form-control"
                                   placeholder="Bob123#45%"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 col-form-label"></label>
                        <div className="col-md-10">
                            <Link to="/" onClick={() => this.loginUser()}>
                                <button type="submit" id="loginBtn" className="btn btn-primary form-control">
                                    Sign In
                                </button>
                            </Link>
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/Register" className="float-left">
                                        Sign Up
                                    </Link>
                                </div>
                                <div className="col-6">
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        )
    }
}