import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from '../components/HomePage'
import LoginComponent from '../components/Login/LoginComponent'
import RegisterComponent from '../components/Login/RegisterComponent'
import ProfileComponent from '../components/Profile/ProfileComponent'
import SearchComponent from '../components/Search/SearchComponent'
import LogoutComponent from '../components/Login/LogoutComponent'
import AllSchools from '../components/School/AllSchools'
import AllRecruiters from '../components/Recruiter/AllRecruiters'
import SchoolDetails from "../components/Search/SchoolDetails"
import ProfileSpecificComponent from "../components/Profile/ProfileSpecificComponent";
import NavBar from "../components/NavBar/NavBar";
import AddSchools from "../components/School/AddSchools"
import EditSchool from "../components/School/EditSchool"

export default class MainContainer extends Component {
    constructor() {
        super();

        this.state = {
            'LoggedInStatus' : "Anonymous",
            'profile' : {}
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

        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => this.setState(
                {'profile': txt}
            ))
    }

    checkLogin() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/CheckLogin/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.text())
            .then(txt => {
                this.setState(
                    {'LoggedInStatus': txt}
                )
            })
    }

    updateProfile() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => this.setState(
                {'profile': txt}
            ))
    }


    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <div className="list-group sticky-top row">

                        <NavBar LoggedInStatus={this.state.LoggedInStatus}
                                profile={this.state.profile}/>

                        <div className="list-group-item bg-dark container-fluid">
                            <Route exact path='/' render={props => <HomePage
                                profile={this.state.profile}
                                LoggedInStatus={this.state.LoggedInStatus}
                                updateProfile={() => this.updateProfile()}
                                checkLogin={() => this.checkLogin()}/>}/>

                            <Route path='/Home' render={props => <HomePage
                                profile={this.state.profile}
                                LoggedInStatus={this.state.LoggedInStatus}
                                updateProfile={() => this.updateProfile()}
                                checkLogin={() => this.checkLogin()}/>}/>

                            <Route path="/Login"
                                   render={props => <LoginComponent
                                       updateProfile={() => this.updateProfile()}
                                       checkLogin={() => this.checkLogin()}/>}/>

                            <Route path="/Register" component={RegisterComponent}/>

                            <Route exact path="/Profile" render={props => <ProfileComponent
                                updateProfile={() => this.updateProfile()}
                                checkLogin={() => this.checkLogin()}/>}/>

                            <Route path="/AllRecruiters" component={AllRecruiters}/>

                            <Route path="/AllSchools" component={AllSchools}/>

                            <Route path="/AddSchools" render={
                                (props) => <AddSchools
                                    updateProfile={() => this.updateProfile()}
                                    profile={this.state.profile}/>
                            }/>

                            <Route path="/EditSchool/:schoolId" component={EditSchool}/>

                            <Route path="/Details/:SchoolId" component={SchoolDetails}/>

                            <Route path="/Search" component={SearchComponent}/>

                            <Route exact path="/Profile/:profileId" component={ProfileSpecificComponent}/>

                            <Route path="/Logout"
                                   render={props => <LogoutComponent
                                       checkLogin={() => this.checkLogin()}/>}/>

                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}

