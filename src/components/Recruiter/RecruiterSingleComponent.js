import React from 'react'
import RecruiterFollowComponent from "../Buttons/RecruiterFollowComponent";
import UserPhoto from "../../images/user.png"
import {Link} from "react-router-dom";

const RecruiterSingleComponent = ({recruiter, reloadRecruiter}) =>
    <div className='row'>
        <div className="col-md-1"></div>
        <div className="col-md-10">
            <div className="card mb-3">
                <img className="card-img-top" src={UserPhoto} alt="Card cap"/>
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/profile/${recruiter.id}`}>
                        {recruiter.firstName} {recruiter.lastName}
                        </Link>
                    </h5>
                    {recruiter.domain &&
                    <p className="card-text"> Domain : {recruiter.domain}</p>}
                    {recruiter.email &&
                    <p className="card-text"> Email : {recruiter.email}</p>}
                    {recruiter.address &&
                    <p className="card-text"> Address : {recruiter.address}</p>}
                    {recruiter.yearsOfExp &&
                    <p className="card-text"> Years Of Exp : {recruiter.yearsOfExp}</p>}


                    <p className="card-text">
                        <RecruiterFollowComponent reloadRecruiter={() => reloadRecruiter} recruiter={recruiter}/>
                    </p>
                </div>
            </div>
        </div>
        <div className="col-md-1"></div>
    </div>


export default RecruiterSingleComponent