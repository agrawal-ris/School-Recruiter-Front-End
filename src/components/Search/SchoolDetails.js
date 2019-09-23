import React from 'react';
import RankHistoryItem from "./RankHistoryItem";
import StudentYearlyItem from "./StudentYearlyItem";
import {Link} from "react-router-dom"

class SchoolDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SchoolDetails: "",
            SchoolAddress:"",
            county:"",
            district:"",
            schoolYearlyDetails:[],
            rankHistory: [],
            dataPresent: 0,
            id: this.props.match.params.SchoolId
        }

        console.log(this.state);

        this.getdata();


    }


    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.SchoolId !== prevProps.match.params.SchoolId) {
            var url = 'https://api.schooldigger.com/v1.2/schools/';
            url += this.props.match.params.SchoolId+'?appID=f4c915e3&appKey=3ce1a57449bc3f0d7a06a5a23c048279';
            fetch(url,{
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => response.json()).then(json => {
                this.setState({SchoolDetails: json,
                    SchoolAddress:json.address,
                    county:json.county,
                    district:json.district,
                    schoolYearlyDetails:json.schoolYearlyDetails,
                    rankHistory:json.rankHistory,
                    dataPresent: 1
                });
                console.log("Hello")

            })
        }
    }

    getdata = () => {

        var url = 'https://api.schooldigger.com/v1.2/schools/';
        url += this.props.match.params.SchoolId+'?appID=f4c915e3&appKey=3ce1a57449bc3f0d7a06a5a23c048279';
        fetch(url,{
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json()).then(json => {
            this.setState({SchoolDetails: json,
                SchoolAddress:json.address,
                county:json.county,
                district:json.district,
                schoolYearlyDetails:json.schoolYearlyDetails,
                rankHistory:json.rankHistory,
                dataPresent: 1
            });
            console.log("Hello")

        })
    }






    render() {

        return(
            <div key={this.props.match.params.SchoolId} className="bg-light">
                <nav className="navbar navbar-dark bg-school">
                    <div className="row clearfix">
                        <Link to={`/Details/${this.props.match.params.SchoolId}`}>
                            <span className="navbar-brand p-2" >
                                {this.state.SchoolDetails.schoolName}
                            </span>
                        </Link>
                    </div>
                <span>
                    <Link className="navbar-brand navbar-link" to={`/Details/${this.props.match.params.SchoolId}`}>
                        <i className="fa fa-globe mr-1"></i>
                         School Page
                    </Link>
                </span>

                </nav>

                    <div className="container-fluid mb-2">


                        <div className="row">
                            <span className="navbar-brand" >
                                <img
                                    src="https://cdn3.iconfinder.com/data/icons/education-vol-1-34/512/16_Building_education_school-256.png" width="30px" alt="">
                                </img>
                                School Details:
                            </span>
                        </div>


                        <li className="list-group-item" >
                            <div className="container-fluid">
                                <div className="row">
                                    School Level: {this.state.SchoolDetails.schoolLevel}
                                 </div>

                                    <div className="row">
                                        Charter School: {this.state.SchoolDetails.isCharterSchool}
                                    </div>
                                    <div className="row">
                                        Virtual School: {this.state.SchoolDetails.isVirtualSchool}
                                    </div>
                                    <div className="row">
                                        Private School: {this.state.SchoolDetails.isTitleISchool}
                                    </div>


                            </div>
                        </li>

                        <br/>

                        <div className="row">
                            <span className="navbar-brand" ><img alt="" src="https://cdn2.iconfinder.com/data/icons/seo-flat-6/128/23_Page_Rank_Badge-256.png" width="30px"></img> Ranking Details</span>
                        </div>
                        <ul className="list-group">
                            {this.state.rankHistory && this.state.rankHistory.map(
                                (rankHistory, index) => <RankHistoryItem key={index} rankHistory={rankHistory}
                                                                            />)}

                        </ul>
                        <br/>

                        <div className="row">
                            <span className="navbar-brand" ><img alt="" src="https://cdn1.iconfinder.com/data/icons/education-filled-outline-8/64/Education-Filled_33-256.png" width="30px"></img> Student-Teacher Details:</span>
                        </div>
                        <ul className="list-group">
                        {this.state.schoolYearlyDetails && this.state.schoolYearlyDetails.map(
                            (schoolYearlyDetails,index) => <StudentYearlyItem key={index} schoolYearlyDetails={schoolYearlyDetails} />)}

                        </ul>
                        <br/>


                        <div className="row">
                            <span className="navbar-brand" > <img alt="" src="https://cdn4.iconfinder.com/data/icons/user-interface-glyph-5/32/Location-512.png" width="30px"></img> Address</span>
                        </div>


                        <li className="list-group-item" >
                            <div className="container-fluid">
                                <div className="row">
                                    Street: {this.state.SchoolAddress.street}
                                </div>
                                <div className="row">
                                   City: <a href={this.state.SchoolAddress.cityURL}>{this.state.SchoolAddress.city} </a>
                                </div>
                                <div className="row">
                                     {this.state.SchoolAddress.state}-{this.state.SchoolAddress.zip}
                                </div>
                                <div className="row">
                                     Contact Us-{this.state.SchoolDetails.phone}
                                </div>

                            </div>
                        </li>







                    </div>

            </div>

        )
    }
}
export default SchoolDetails;
