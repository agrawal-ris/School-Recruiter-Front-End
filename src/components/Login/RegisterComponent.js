import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import UserService from '../../services/UserService';
import RecruiterService from '../../services/RecruiterService';
import StudentService from '../../services/StudentService';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import Textarea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';


const required = (value) => {
  if (!value.toString().trim().length) {
	  
    return 'require';
  }
};
 
const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};

const alpha = (value) => {
	 if (!validator.isAlpha(value)) {
    return `${value} is not alphabets only.`
  }
};

const alphanumeric = (value) => {
	 if (!validator.isAlphanumeric(value)) {
    return `${value} is not isAlphanumeric.`
  }
};
 
 
const lt8 = (value, props) => {
  if (!value.toString().trim().length > props.maxLength) {
    return <span className="error">The value exceeded {props.maxLength} symbols.</span>
  }
};
 
const password = (value, props, components) => {

  if (value !== components['confirm'][0].value) { 

    return <span className="error">Passwords are not equal.</span>
  }
};

export default class RegisterComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            registerUser : {
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
                "redirect" : false,
				
        }

        this.userService = UserService.instance;
        this.studentService = StudentService.instance;
        this.recruiterService = RecruiterService.instance;

    }
	
	


    verifyPassword () {

        if (this.state.registerUser.password === this.state.verify) {
			
			if(this.state.registerUser.firstName === "" || this.state.registerUser.lastName === "" || this.state.registerUser.username === "" || this.state.registerUser.password === "" || this.state.registerUser.email === "" || this.state.registerUser.address  === ""|| this.state.registerUser.contactNum === "" || this.state.registerUser.dtype === "")
			{
				alert("Please fill all the fields they are mandatory for registration")
				
			}
			
			else{

            if(this.state.registerUser.dtype ==='Student' ) {

                this.registerStudent(this.state.registerUser)
            }
            else{
                this.registerRecruiter(this.state.registerUser)
            }
        }
		}
        else {
            alert("Passwords Dont Match")
            this.setState({
                registerUser:{...this.state.registerUser,"password": ""}
            })
        }

    }

    changeUserType (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"dtype": eventValue}
        })
    }
    changeFirstname (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"firstName": eventValue.target.value}
        })
   
    }
    changeLastname (eventValue) {

        this.setState({
            registerUser:{...this.state.registerUser,"lastName": eventValue.target.value}
        })
   
    }
    changeUsername (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"username": eventValue.target.value}
        })
   
    }
    changePassword (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"password": eventValue.target.value}
        })
   
    }

    changeVerifyPasswrd (eventValue) {
        this.setState({
           "verify": eventValue.target.value
        })
   
    }
    changeEmail (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"email": eventValue.target.value}
        })
   
    }
    changeYearsOfExp (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"yearsOfExp": eventValue.target.value}
        })
   
    }

    changeAddress (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"address": eventValue.target.value}
        })
   
    }
    changeDomain (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"domain": eventValue.target.value}
        })
   
    }
    changeContactNum (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"contactNum": eventValue.target.value}
        })
   
    }
    changeJoiningYear(eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,"joiningYear": eventValue.target.value}
        })
   
    }
    changeSkilled (eventValue) {
        this.setState({
            registerUser:{...this.state.registerUser,
                "skills": eventValue.target.value}
        })
   
    }
    registerRecruiter(newUser) {
        this.recruiterService
            .createRecruiter(newUser)

        this.setState({redirect: true});
    }
    registerStudent(newStudent) {
        this.studentService
            .createStudent(newStudent)

        this.setState({redirect: true});
    }


    render () {
        if (this.state.redirect) {
            return <Redirect
                to={{
                    pathname: "/home",
                    state: { msgReg: "You are Registered" }
                }}/>;
        }

        return (
		<Form>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 bg-light text-black rounded">
                    <h1> Sign Up
                        <Link to="/" className="float-right">
                            <i className="fa fa-times-circle"></i>
                        </Link>
                    </h1>
                    <div className="form-group row">
                        <label htmlFor="firstNameFld" className="col-md-2 col-form-label">
                            Firstname
                        </label>
                        <div className="col-md-10">
                            <Input id="firstNameFld" className="form-control"
                                   placeholder="Bob" validations={[alpha]}
                                   onChange = {(event) => this.changeFirstname(event)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastNameFld" className="col-md-2 col-form-label">
                            Lastname
                        </label>
                        <div className="col-md-10">
                            <Input id="lastNameFld" className="form-control"
                                   placeholder="Builder" validations={[alpha]}
                                   onChange = {(event) => this.changeLastname(event)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="usernameFld" className="col-md-2 col-form-label">
                            Username
                        </label>
                        <div className="col-md-10">
                            <Input id="usernameFld" className="form-control"
                                   placeholder="Bob1234"  validations={[alpha]}
                                   onChange = {(event) => this.changeUsername(event)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="passwordFld" className="col-md-2 col-form-label">
                            Password
                        </label>
                        <div className="col-md-10">
                            <Input id="passwordFld" type="password" className="form-control"
                                   placeholder="Bob123#45%" validations={[lt8, alphanumeric]}
                                   onChange = {(event) => this.changePassword(event)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="verifyPasswordFld" className="col-md-2 col-form-label">
                            Verify Password
                        </label>
                        <div className="col-md-10">
                            <Input id="VerifyPasswordFld" type="password" className="form-control"
                                   placeholder="Bob123#45%" 
                                   onChange= {(event) => this.changeVerifyPasswrd(event)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="EmailFld" className="col-md-2 col-form-label">
                            E-Mail
                        </label>
                        <div className="col-md-10">
                            <Input id="EmailFld" type="email" className="form-control"
                                   placeholder="bob@neu.edu"  validations={[email]}
                                   onChange = {(event) => this.changeEmail(event)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="PhoneNumberFld" className="col-md-2 col-form-label">
                            Phone Number
                        </label>
                        <div className="col-md-10">
                            <Input id="PhoneNumberFld" type="phone" className="form-control"
                                   placeholder="999666xxxx"
                                   onChange = {(event) => this.changeContactNum(event)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="AddressFld" className="col-md-2 col-form-label">
                            Address
                        </label>
                        <div className="col-md-10">
                            <Textarea id="AddressFld" className="form-control"
                                      placeholder="333 Huntington Avenue, Boston, MA - 02115"
                                      onChange = {(event) => this.changeAddress(event)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="TypeFld" className="col-md-2 col-form-label">
                            Type of User
                        </label>
                        <div className="col-md-10">
                            <Select id="TypeFld"
                                    className="form-control" 
                                    onChange= {(event) => this.changeUserType(event.target.value)}>
                                <option value="Recruiter">
                                    Recruiter
                                </option>
                                <option value="Student">
                                    Student
                                </option>
                            </Select>
                        </div>
                    </div>

                    {this.state.registerUser.dtype === "Recruiter" &&
                    <div className="form-group row">
                        <label htmlFor="YrsOfExpFld" className="col-md-2 col-form-label">
                            Years of Experience
                        </label>
                        <div className="col-md-10">
                            <Input id="YrsOfExpFld" type="number" className="form-control"
                                   placeholder="3" 
                                   onChange = {(event) => this.changeYearsOfExp(event)}/>
                        </div>
                    </div>}

                    {this.state.registerUser.dtype  === "Recruiter" &&
                    <div className="form-group row">
                        <label htmlFor="DomainFld" className="col-md-2 col-form-label">
                            Domain
                        </label>
                        <div className="col-md-10">
                            <Input id="DomainFld" type="text" className="form-control"
                                   placeholder="Sports" 
                                   onChange = {(event) => this.changeDomain(event)}/>
                        </div>
                    </div>}

                    {this.state.registerUser.dtype  === "Student" &&
                    <div className="form-group row">
                        <label htmlFor="JoiningFld" className="col-md-2 col-form-label">
                            Joining Period
                        </label>
                        <div className="col-md-10">
                            <Input id="JoiningFld" className="form-control"
                                   placeholder="mm-dd-yyyy"
                                   type="month" 
                                   onChange = {(event) => this.changeJoiningYear(event)}
                            />
                        </div>
                    </div>
                    }

                    {this.state.registerUser.dtype  === "Student" &&
                    <div className="form-group row">
                        <label htmlFor="SkillsFld" className="col-md-2 col-form-label">
                            Skills
                        </label>
                        <div className="col-md-10">
                            <Input id="SkillsFld" className="form-control"
                                   type="text" 
                                   placeholder="Sports, Coding"
                                   onChange = {(event) => this.changeSkilled(event)}
                            />
                        </div>
                    </div>
                    }

                    <div className="form-group row">
                        <label className="col-md-2 col-form-label"></label>
                        <div className="col-md-10">
                            <Link to="/Register">
                                <Button type="submit" id="signupBtn" className="btn btn-primary form-control"
                                        onClick= {(event) => {
                                            this.verifyPassword(event);
                                        }}>
                                    Sign Up
                                </Button>
                            </Link>
                            <div className="row">
                                <div className="col-12">
                                    <Link to="/Login">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
			</Form>
        )
    }
}