import React from 'react'

export default class LogoutComponent extends React.Component {
    constructor(props) {
        super(props)

        fetch("http://school-recruiter-java-server.herokuapp.com/api/logout", {
            method: 'POST',
            credentials: 'include'
        })

        this.props.checkLogin();
    }
    render () {
        return (
            <div className="alert alert-danger text-center" role="alert">
                <h1>
                    Successfully Logged Out!
                </h1>   
            </div>
        )
    }
}