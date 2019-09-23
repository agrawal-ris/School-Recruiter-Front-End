import React from "react"
import {Link} from "react-router-dom";

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    toggleNavBar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';


        return (
            <nav className="pl-4 row navbar navbar-expand-md navbar-dark bg-grad">
                <span className="navbar-brand">
                    <i className="fa fa-university mr-1"></i>
                    <Link to="/" className="text-light">
                        Student Recruiter
                    </Link>
                </span>
                <button onClick={this.toggleNavBar}
                        className={`${classTwo}`}
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbar7">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${classOne}`} id="navbar7">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Search">
                                Search
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link className="nav-link" to ="/AllRecruiters">
                                All Recruiters
                            </Link>
                        </li>

                        {this.props.LoggedInStatus === "Recruiter" &&
                        <li className="nav-item">
                            <Link className="nav-link" to ="/AddSchools">
                                <i className="fa fa-plus"></i> School
                            </Link>
                        </li>}



                        <li className="nav-item">
                            <Link className="nav-link" to ="/AllSchools">
                                All Schools
                            </Link>
                        </li>

                        {this.props.LoggedInStatus !== "Anonymous" &&
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/Home">
                                <i className="fa fa-user-circle mr-1"></i>
                                Hi {this.props.LoggedInStatus} - {this.props.profile.firstName} {this.props.profile.lastName}
                            </Link>
                        </li>
                        }

                        {this.props.LoggedInStatus === "Anonymous" &&
                        <li className="nav-item">
                            <Link className="nav-link" to ="/Login">
                            Login
                            </Link>
                        </li>}

                        {this.props.LoggedInStatus === "Anonymous" &&
                        <li className="nav-item">
                            <Link className="nav-link" to ="/Register">
                                Register
                            </Link>
                        </li>}

                        {this.props.LoggedInStatus !== "Anonymous" &&
                        <li className="nav-item">
                            <Link className="nav-link" to ="/Profile">
                                Profile
                            </Link>
                        </li>}

                        {this.props.LoggedInStatus !== "Anonymous" &&
                        <li className="nav-item ">
                            <Link className="nav-link" to ="/Logout">
                                Logout
                            </Link>
                        </li>}


                    </ul>
                </div>
            </nav>
        )
    }


}


export default NavBar