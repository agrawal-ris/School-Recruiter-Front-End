import React from 'react'
import SchoolPhoto from '../../images/school.jpg'

const AnonymousSchool = ({school}) =>

    <div className="col-md-4">
        <div className="card m-2">
            <img className="card-img-top" src={SchoolPhoto} alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{school.title}</h5>
                    <p className="card-text">{school.post_content}</p>
                    <p className="card-text">
                        <button className="btn float-right bg-primary text-light"
                                onClick={() => {alert("You must Login to Like Schools")}}>
                            Like
                        </button>
                    </p>
                </div>
        </div>
    </div>



export default AnonymousSchool