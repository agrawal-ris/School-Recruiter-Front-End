import React from 'react'
import UserPhoto from '../../images/user.png'
import {Link, Redirect} from "react-router-dom";
import RecruiterService from '../../services/RecruiterService';
import StudentService from '../../services/StudentService';

export default class ProfileComponent extends React.Component {
    constructor() {
        super();
		
		 this.state = {
            profile : {
                "firstName":"",
                "lastName":"",
                "username":"",
                "password":"",
                "email":"",
                "address":"",
                "contactNum":"",
                "dtype":"Recruiter",
                "yearsOfExp":"",
                "skills":"",
                "domain":"",
                "joiningYear":""
            },
            profilePut : {
                "firstName":"",
                "lastName":"",
                "username":"",
                "password":"",
                "email":"",
                "address":"",
                "contactNum":"",
                "dtype":"Recruiter",
                "yearsOfExp":"",
                "skills":"",
                "domain":"",
                "joiningYear":""
            },
                "verify":"", 
				"accountsettings":"0",
				"description":"1",
                "redirect" : 0


        }

        this.studentService = StudentService.instance;
        this.recruiterService = RecruiterService.instance;



    }
	
    showAccountSettings() {
            this.setState({"accountsettings": "1", "description": "0"}
            )
            }
		
    showDescription() {
            this.setState({"accountsettings": "0", "description": "1"}
            )
            }

    
    componentDidMount() {

        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => this.setState(
                {'profile': txt,
                'profilePut':txt}
            )).then(t => console.log(this.state.profile))

        fetch('http://school-recruiter-java-server.herokuapp.com/api/CheckLogin/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.text())
            .then(txt => {
                this.setState(
                    {'LoggedInStatus': txt}
                )
            }).then(t => {
                if (this.state.LoggedInStatus === "Anonymous") {
                    this.setState({
                        redirect : 1
                    })
                }
        })
    }

    putUser() {
        this.updateUser()
    }

    updateUser() {
        if (this.state.profile.dtype === "Student") {
            this.studentService
                .updateStudent(this.state.profilePut).then(t => {
                    this.props.checkLogin();
                    this.setState({
                        redirect: 1
                    })
            }).then(t => this.props.updateProfile())
        }
        else if (this.state.profile.dtype === "Recruiter") {
            this.recruiterService
                .updateRecruiter(this.state.profilePut).then(t => {
                this.props.checkLogin();
                this.setState({
                    redirect: 1
                })
            }).then(t => this.props.updateProfile())
        }
    }

    changeUserType (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"dtype": eventValue}
        })
    }
    changeFirstname (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"firstName": eventValue.target.value}
        })

    }
    changeLastname (eventValue) {

        this.setState({
            profilePut:{...this.state.profilePut,"lastName": eventValue.target.value}
        })

    }
    changeUsername (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"username": eventValue.target.value}
        })

    }
    changePassword (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"password": eventValue.target.value}
        })

    }

    changeVerifyPasswrd (eventValue) {
        this.setState({
            "verify": eventValue.target.value
        })

    }
    changeEmail (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"email": eventValue.target.value}
        })

    }
    changeYearsOfExp (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"yearsOfExp": eventValue.target.value}
        })

    }

    changeAddress (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"address": eventValue.target.value}
        })

    }
    changeDomain (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"domain": eventValue.target.value}
        })

    }
    changeContactNum (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"contactNum": eventValue.target.value}
        })

    }
    changeJoiningYear(eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,"joiningYear": eventValue.target.value}
        })

    }
    changeSkilled (eventValue) {
        this.setState({
            profilePut:{...this.state.profilePut,
                "skills": eventValue.target.value}
        })

    }



// this.setState({course: course})

    render () {

        if (this.state.redirect) {
            return <Redirect
                to={{
                    pathname: "/Login"
                }}/>;
        }


        return (

                <div className="row profile">
                    <div className="col-md-3">
                        <div className="profile-sidebar rounded">
                            <div className="profile-userpic">
                                <center><img src={UserPhoto} className="img-responsive" alt="" /></center>
                            </div>

                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                        {this.state.profile.firstName} {this.state.profile.lastName}
                                </div>
                                <div className="profile-usertitle-job">
                                        {this.state.profile.dtype}
                                </div>
                            </div>



                            {this.state.profile.dtype  === "Recruiter" && <div className="profile-userbuttons">
                                <button type="button"
                                        className="btn btn-danger btn-sm">
                                    <Link className="text-white" to="/">
                                    Followers
                                    </Link>
                                </button>
                            </div>}

                            <div className="profile-userbuttons">
                                <button type="button" className="btn btn-success btn-sm"onClick= {() => this.showDescription()}>Description</button>
                                <button type="button" className="btn btn-danger btn-sm" onClick= {() => this.showAccountSettings()}>Account Settings</button>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-9">
                    <div className="profile-content rounded">
                       {this.state.accountsettings === "1"  && <div>
                           <div className="form-group row">
                                    <label htmlFor="firstNameFld" className="col-md-2 col-form-label">
                                        Firstname
                                    </label>
                                    <div className="col-md-10">
                                        <input id="firstNameFld" className="form-control"
                                               onChange={(e) => this.changeFirstname(e)}
                                                defaultValue={this.state.profile.firstName}
                                              />
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label htmlFor="lastNameFld" className="col-md-2 col-form-label">
                                        Lastname
                                    </label>
                                    <div className="col-md-10">
                                        <input id="lastNameFld" className="form-control"
                                               onChange={(e) => this.changeLastname(e)}
                                              defaultValue={this.state.profile.lastName}
                                               />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="usernameFld" className="col-md-2 col-form-label">
                                        Username
                                    </label>
                                    <div className="col-md-10">
                                        <input id="usernameFld" className="form-control"
                                               onChange={(e) => this.changeUsername(e)}
                                                defaultValue={this.state.profile.username}
                                               />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="passwordFld" className="col-md-2 col-form-label">
                                        Password
                                    </label>
                                    <div className="col-md-10">
                                        <input id="passwordFld" type="password" className="form-control"
                                               onChange={(e) => this.changePassword(e)}
                                               defaultValue={this.state.profile.password}
                                               />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="EmailFld" className="col-md-2 col-form-label">
                                        E-Mail
                                    </label>
                                    <div className="col-md-10">
                                        <input id="EmailFld" type="email" className="form-control"
                                               onChange={(e) => this.changeEmail(e)}
                                                 defaultValue={this.state.profile.email}
                                             />
                                    </div>
                                </div>

                           <div className="form-group row">
                               <label htmlFor="PhoneNumberFld" className="col-md-2 col-form-label">
                                   Phone Number
                               </label>
                               <div className="col-md-10">
                                   <input id="PhoneNumberFld"
                                          onChange={(e) => this.changeContactNum(e)}
                                          defaultValue={this.state.profile.contactNum}
                                          type="phone"
                                          className="form-control"
                                          placeholder="999666xxxx"
                                   />
                               </div>
                           </div>


                           <div className="form-group row">
                               <label htmlFor="AddressFld" className="col-md-2 col-form-label">
                                   Address
                               </label>
                               <div className="col-md-10">
                                        <textarea id="AddressFld"
                                                  onChange={(e) => this.changeAddress(e)}
                                                  className="form-control"
                                                  defaultValue={this.state.profile.address}
                                        />
                               </div>
                           </div>

                           <div className="form-group row">
                                <label htmlFor="TypeFld" className="col-md-2 col-form-label">
                                    Type of User
                                </label>
                                <div className="col-md-10">
                                    {this.state.profile.dtype}
                                </div>
                            </div>

                                {this.state.profile.dtype === "Recruiter" &&
                                <div className="form-group row">
                                    <label htmlFor="YrsOfExpFld" className="col-md-2 col-form-label">
                                        Years of Experience
                                    </label>
                                    <div className="col-md-10">
                                        <input id="YrsOfExpFld"
                                               onChange={(e) => this.changeYearsOfExp(e)}
                                               defaultValue={this.state.profile.yearsOfExp}
                                               type="number"
                                               className="form-control"
                                               placeholder="3"
                                               />
                                    </div>
                                </div>}

                                {this.state.profile.dtype  === "Recruiter" &&
                                <div className="form-group row">
                                    <label htmlFor="DomainFld" className="col-md-2 col-form-label">
                                        Domain
                                    </label>
                                    <div className="col-md-10">
                                        <input id="DomainFld"
                                               onChange={(e) => this.changeDomain(e)}
                                               type="text"
                                               className="form-control"
                                             defaultValue={this.state.profile.domain}
                                             />
                                    </div>
                                </div>}

                                {this.state.profile.dtype  === "Student" &&
                                <div className="form-group row">
                                    <label htmlFor="JoiningFld" className="col-md-2 col-form-label">
                                        Joining Period
                                    </label>
                                    <div className="col-md-10">
                                        <input id="JoiningFld" className="form-control"
                                               onChange={(e) => this.changeJoiningYear(e)}
                                               defaultValue={this.state.profile.joiningYear}

                                        />
                                    </div>
                                </div>
                                }

                                {this.state.profile.dtype  === "Student" &&
                                <div className="form-group row">
                                    <label htmlFor="SkillsFld" className="col-md-2 col-form-label">
                                        Skills
                                    </label>
                                    <div className="col-md-10">
                                        <input id="SkillsFld"
                                               onChange={(e) => this.changeSkilled(e)}
                                               className="form-control"
                                               type="text"
                                               defaultValue={this.state.profile.skills}

                                        />
                                    </div>
                                </div>
                                }

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label"></label>
                                    <div className="col-md-10">


                                        <div className="row">
                                            <div className="col-12">
                                              <button onClick={() => this.putUser()}>
                                                  <Link className="btn" to="/">
                                                    Save Changes?
                                                  </Link>
                                              </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                </div>
                    }

                        {this.state.description === "1"  &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="">
                                        <dl className="row p-2">
                                            <dt className="col-md-2">
                                                Name
                                            </dt>
                                            <dl className="col-md-10">
                                                {this.state.profile.firstName} {this.state.profile.lastName}
                                            </dl>
                                        </dl>

                                        {this.state.profile.address &&
                                        <dl className="row p-2">
                                            <dt className="col-md-2 ">
                                                Address
                                            </dt>
                                            <dl className="col-md-10">
                                                {this.state.profile.address}
                                            </dl>
                                        </dl>}

                                        {this.state.profile.email &&
                                        <dl className="row p-2">
                                            <dt className="col-md-2  ">
                                                Email
                                            </dt>
                                            <dl className="col-md-10">
                                                {this.state.profile.email}
                                            </dl>
                                        </dl>}

                                        {this.state.profile.contactNum &&
                                        <dl className="row p-2">
                                            <dt className="col-md-2 ">
                                                Phone Number
                                            </dt>
                                            <dl className="col-md-10">
                                                {this.state.profile.contactNum}
                                            </dl>
                                        </dl>}

                                        {this.state.profile.dtype &&
                                        <dl className="row p-2">
                                            <dt className="col-md-2 ">
                                                Type of User
                                            </dt>
                                            <dl className="col-md-10">
                                                {this.state.profile.dtype}
                                            </dl>
                                        </dl>}

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
                            </div>

                        }
                        </div>

                    </div>
                </div>

        )
    }
}