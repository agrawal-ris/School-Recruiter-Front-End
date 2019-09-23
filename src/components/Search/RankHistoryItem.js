



import React from 'react'

const RankHistoryItem = ({rankHistory}) =>



    <li className="list-group-item" >
        <div className="row">
            Statistics for the Year: {rankHistory.year}

        </div>
        <br/>
        <div className="container-fluid">
            <div className="row">
                Rank Of:{rankHistory.rankOf}

            </div>
            <div className="row">
                Review Stars:{rankHistory.rankStars}

            </div>
            <br/>
        </div>
    </li>
export default RankHistoryItem


