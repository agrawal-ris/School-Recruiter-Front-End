import React from 'react'
import SchoolSingleComponent from "./SchoolSingleComponent";


export default class AllSchools extends React.Component {
    constructor() {
        super();

        this.state = {
            schools : [],
            currentId : 0,
            schoolInfo: {},
            SchoolName: "",
            SchoolAddress:{},
            county:{},
            district:{},
            schoolYearlyDetails:{},
            rankHistory:{},
            dataPresent: 1,
            recruiters : [{},{},{}]
        }
    }

    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    currentId : txt.id

                })
            })

        fetch('http://school-recruiter-java-server.herokuapp.com/api/school', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => {
                this.setState({
                    schools : txt
                })

            }).then(t =>
             {
            var url = 'https://api.schooldigger.com/v1.2/schools/';
            url += this.state.schools[0].school_api_id +'?appID=f4c915e3&appKey=3ce1a57449bc3f0d7a06a5a23c048279';
            fetch(url,{
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => response.json()).then(json => {
                this.setState({
                    ...this.state,
                    SchoolName: json,
                    SchoolAddress:json.address,
                    county:json.county,
                    district:json.district,
                    schoolYearlyDetails:json.schoolYearlyDetails,
                    rankHistory:json.rankHistory,
                    dataPresent: 1
                });
            })
        })
    }

    render() {
        return (
            <div className="row">
                {this.state.schools.map((school, index) =>
                    <div className="col-sm-6 col-md-6 col-lg-4" key={school.id}>
                        <SchoolSingleComponent schoolInfo={this.state.schoolInfo}
                                               key={school.id}
                                               schoolAddress={this.state.schoolInfo.SchoolAddress}
                                               schoolDistrict={this.state.schoolInfo.SchoolDistrict}
                                               schoolNames={this.state.SchoolName}
                                               currentId= {this.state.currentId}
                                               school={school}
                                               ind = {index}
                                               recruiter={this.state.recruiters}
                        />
                    </div>
                )}
            </div>
        )
    }
}