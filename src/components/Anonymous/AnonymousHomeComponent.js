import React from 'react'
import {Link} from 'react-router-dom'
import AnonymousSchool from './AnonymousSchool'

export default class AnonymousHomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <div className="col-12 alert alert-primary">
                    <div className="row">
                        You are Logged in as a Anonymous User. All Content May Not be Visible.
                        <Link to="/Login" className="alert-link">
                            Click Here to Login
                        </Link>.
                    </div>
                </div>

                <div className="col-12 alert alert-info">
                    <div className="row">
						<div className="col-md-6">
                       <i className="fa fa-search" aria-hidden="true"> <b>Students</b> can Search for Schools</i>
						</div>
						<div className="col-md-6">

						<i className="fa fa-users" aria-hidden="true"><b> Recruiters</b> can see the students following them</i>

						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
                      <i className="fa fa-thumbs-up" aria-hidden="true"> Like the School</i>

						</div>
						<div className="col-md-6">

						<i className="fa fa-university" aria-hidden="true">Add new schools to the list</i>


						</div>
					</div>
                </div>

                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="row">
                            {this.props.school.map(school => {
                                return <AnonymousSchool key = {school.id} school={school} />
                            })}


                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>


            </div>
        )
    }
}

