import React from 'react'
import RecruiterSingleComponent from "./RecruiterSingleComponent";

export default class AllRecruiters extends React.Component {
    constructor() {
        super();
        this.state = {
            recruiters: [],
            currentId : 0
        }
    }

    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/recruiter', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    recruiters : txt
                })

            })

        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    currentId : txt.id

                })
                console.log(this.state)
            })
    }

    reloadRecruiter() {
        console.log("rrs")
        fetch('http://school-recruiter-java-server.herokuapp.com/api/recruiter', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    recruiters : txt
                })

            })
    }

    render () {
        return (

            <div className="row">
                {this.state.recruiters.map(recruiter =>
                    <div className="col-sm-6 col-md-4 col-lg-3" key={recruiter.id}>
                        <RecruiterSingleComponent key={recruiter.id}
                                               recruiter={recruiter}
                                                reloadRecruiter={() => this.reloadRecruiter()}/>
                    </div>
                )}
            </div>

        )
    }
}