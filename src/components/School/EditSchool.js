import React from "react"
import {Link} from "react-router-dom";


export default class EditSchool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addSchool : {
                "title": "",
                "post_content": "",
                "school_api_id": "",
                "recruiter_id": 0
            },
            schoolMatches: [],
            SchoolDetails: "",
            SearchTitle: "",
            SchoolAddress:"",
            county:"",
            district:"",
            schoolYearlyDetails:[],
            rankHistory: [],
            dataPresent: 0,
            currentId: 0

        }
    }

    componentDidMount() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/profile/', {
            method : 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then(txt => this.setState(
                {'profile': txt}
            ))

        console.log(this.props.match.params)
        this.getSchool()
    }

    changeSchoolName(v) {
        this.setState({
            addSchool: {
                ...this.state.addSchool,
                "title": v
            }
        })
    }

    changeSchoolContent(v) {
        this.setState({
            addSchool: {
                ...this.state.addSchool,
                post_content: v
            }
        })
    }

    getdata() {
        var url = 'https://api.schooldigger.com/v1.2/schools/';
        url += this.state.addSchool.school_api_id +'?appID=f4c915e3&appKey=3ce1a57449bc3f0d7a06a5a23c048279';
        fetch(url,{
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json()).then(json => {
            this.setState({
                ...this.state,
                SchoolDetails: json,
                SchoolAddress:json.address,
                county:json.county,
                district:json.district,
                schoolYearlyDetails:json.schoolYearlyDetails,
                rankHistory:json.rankHistory,
                dataPresent: 1
            });

        })
    }


    renderSchoolList() {
        var url = 'https://api.schooldigger.com/v1.2/autocomplete/schools';
        url += '?q=' + this.state.SearchTitle +'&appID=f4c915e3&appKey=3ce1a57449bc3f0d7a06a5a23c048279';
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json()).then(json => {
            this.setState({schoolMatches: json.schoolMatches});
        })
    }

    addSchoolToForm(sid) {
        this.setState({
            addSchool: {
                ...this.state.addSchool,
                school_api_id: sid
            }
        }, () =>  this.getdata())
    }

    changeSearch(v) {
        this.setState({
            ...this.state,
            SearchTitle: v
        })
    }
    getSchool() {
        fetch('http://school-recruiter-java-server.herokuapp.com/api/school/'+ this.props.match.params.schoolId, {
            method : 'GET',
            credentials: 'include'
        }).then(response => response.json()).then(t =>
        {
            this.setState({
                addSchool: t
            })
        }).then(t =>
            this.addSchoolToForm(this.state.addSchool.school_api_id))
    }

    putSchool() {
        console.log(this.state.addSchool)
        fetch('http://school-recruiter-java-server.herokuapp.com/api/school/'+ this.state.addSchool.id, {
            method : 'PUT',
            credentials: 'include',
            body: JSON.stringify(this.state.addSchool),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    render() {
        return (
            <div className="row">
                <div className='col-md-5 bg-light text-black rounded'>
                    <h1>Edit School</h1>
                    <div className="form-group row m-2">
                        <label htmlFor="SchoolTitleFld" className="col-md-2 col-form-label">
                            School Title
                        </label>
                        <div className="col-md-10">
                            <input id="SchoolTitleFld"
                                   type="text"
                                   defaultValue={this.state.addSchool.title}
                                   onChange={(e) => this.changeSchoolName(e.target.value)}
                                   className="form-control"
                                   placeholder="Northeastern High School"
                            />
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label htmlFor="SchoolContentFld" className="col-md-2 col-form-label">
                            School Content
                        </label>
                        <div className="col-md-10">
                            <textarea id="SchoolContentFld"
                                      type="text"
                                      value={this.state.addSchool.post_content}
                                      onChange={(e) => this.changeSchoolContent(e.target.value)}
                                      className="form-control"
                                      placeholder="This school mainly focuses on students excelling in sports..."
                            />
                        </div>
                    </div>
                    {this.state.addSchool.school_api_id !== "" &&
                    <div className="form-group row m-2">
                        <label htmlFor="SchoolContentFld" className="col-md-2 col-form-label">
                            API School Details
                        </label>
                        <div className="col-md-10">
                            <div className="container">
                                <dl className="row">
                                    <dt className="col-md-3">Name</dt>
                                    <dd className="col-md-9">{this.state.SchoolDetails.schoolName}</dd>
                                </dl>
                                {this.state.SchoolAddress && <dl className="row">
                                    <dt className="col-md-3">Address</dt>
                                    <dd className="col-md-9">
                                        {this.state.SchoolAddress.city},
                                        {this.state.SchoolAddress.state} -
                                        {this.state.SchoolAddress.zip}
                                    </dd>
                                </dl>}
                                {this.state.district &&
                                <dl className="row">
                                    <dt className="col-md-3">District</dt>
                                    <dd className="col-md-9">{this.state.district.districtName}</dd>
                                </dl>}
                                <dl className="row">
                                    <dt className="col-md-3">School Type</dt>
                                    <dd className="col-md-9">{this.state.SchoolDetails.schoolLevel}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-md-3">School Website</dt>
                                    <dd className="col-md-9">
                                        <a href={this.state.SchoolDetails.url}>URL</a>
                                    </dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-md-3">Highest Grade</dt>
                                    <dd className="col-md-9">
                                        {this.state.SchoolDetails.highGrade}
                                    </dd>
                                </dl>

                            </div>
                        </div>
                    </div>}

                    <div className="form-group row">
                        <label className="col-md-2 col-form-label"></label>
                        <div className="col-md-10">
                            <Link to="/Home">
                                <button type="submit"
                                        id="signupBtn"
                                        className="btn btn-primary form-control"
                                        onClick= {() =>
                                            this.putSchool()
                                        }>
                                    Post Your School
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6 bg-light text-black rounded">
                    <h1>Search School To Add to Form</h1>
                    <div className="form-group row m-2">
                        <div className="col-md-10">
                            <input id="SearchSchoolFld"
                                   type="text"
                                   className="form-control"
                                   placeholder="Enter your School"
                                   onChange={(e) => this.changeSearch(e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <button onClick={()=>this.renderSchoolList()}
                                    className="bg-secondary text-white btn">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="row m-2 list-group">
                        {this.state.schoolMatches &&

                        this.state.schoolMatches
                            .map((item, index) =>
                                <button onClick={() => this.addSchoolToForm(item.schoolid)} className="list-group-item"
                                        key={index}>
                                        <span key={index}>
                                            {item.schoolName}
                                        </span>
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>
        )
    }
}