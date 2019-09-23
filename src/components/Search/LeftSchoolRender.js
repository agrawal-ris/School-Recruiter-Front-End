import React from 'react'
import {Link} from "react-router-dom";


export default class LeftSchoolRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolMatches: []
        }

    }

    componentDidMount() {

        var url = 'https://api.schooldigger.com/v1.2/autocomplete/schools';
        url += '?q=' + this.props.match.params.SearchParam +'&appID=f4c915e3&appKey=3ce1a57449bc3f0d7a06a5a23c048279';
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





    render() {
        return(
            <ul className="list-group">
                {this.state.schoolMatches &&

                this.state.schoolMatches
                    .map((item, index) =>
                        <li className="list-group-item"
                            key={index}>
                            <Link key={index}
                                  to={`/Search/${this.props.match.params.SearchParam}/${item.schoolid}`}>
                                {item.schoolName}
                            </Link>
                        </li>
                    )
                }
            </ul>
        )
    }
}