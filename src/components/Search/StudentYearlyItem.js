
import React from 'react'

const StudentYearlyItem = ({schoolYearlyDetails}) =>

    <li className="list-group-item" >
        <div className="row">
            Statistics for the Year: {schoolYearlyDetails.year}

        </div>
        <br/>
        <div className="container-fluid">
            <div className="row">
                Pupil To Teacher Ratio:{schoolYearlyDetails.pupilTeacherRatio}

            </div>
            <div className="row">
               Percentage of Full Time Teachers:{schoolYearlyDetails.teachersFulltime}

            </div>
            <br/>



            <div className="row">
         Number of Students:{schoolYearlyDetails.numberOfStudents}

        </div>
            <div className="row">
                Percentage of African American Students:{schoolYearlyDetails.percentofAfricanAmericanStudents}

            </div>
            <div className="row">
                Percentage of Asian Students:{schoolYearlyDetails.percentofAsianStudents}

            </div>
            <div className="row">
                Percentage of Indian Students:{schoolYearlyDetails.percentofIndianStudents}

            </div>
            <div className="row">
                Percentage of Hispanic Students:{schoolYearlyDetails.percentofHispanicStudents}

            </div>
            <div className="row">
                Percentage of White Students:{schoolYearlyDetails.percentofWhiteStudents}

            </div>
            <div className="row">
                Percentage of Two or More Races Students:{schoolYearlyDetails.percentofTwoOrMoreRaceStudents}

            </div>
            <div className="row">
                Percentage of Pasific Students:{schoolYearlyDetails.percentofPacificIslanderStudents}

            </div>
            <div className="row">
                Percentage of Unspecified Students:{schoolYearlyDetails.percentofUnspecifiedRaceStudents}

            </div>
        </div>
</li>
export default StudentYearlyItem


