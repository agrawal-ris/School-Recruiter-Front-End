import React from 'react';
import {Link,Route} from 'react-router-dom';
import SchoolDetails from './SchoolDetails'
import states from '../data/States'
import  StateItem from './StateItem'
import LeftSchoolRender from "./LeftSchoolRender";
import ProfileComponent from "../Profile/ProfileComponent";


class SearchSchools extends React.Component {
  constructor() {
    super();
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.state = {
        keyword: '',
        StateID:'',
        States:  states,
        schoolMatches: [],
        collapsed:true
    } ;
	this.handleChange = this.handleChange.bind(this);
	this.handleSearchState = this.handleSearchState.bind(this);
  }

    toggleNavBar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleChange(event) {
      this.setState(
        {keyword: event.target.value});
        }




    renderStates(){
      alert("here")
    console.log(this.States)

}

handleSearchState(event){
    this.setState(
        {StateID: event});
}



   render() {
       const collapsed = this.state.collapsed;
       const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
       const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';


       return (
           <div className="container-fluid">

           <nav className="navbar navbar-expand-lg navbar-light bg-light">
               <button className="btn navbar-brand" href="#">School Finder</button>
               <button onClick={this.toggleNavBar}
                       className={`${classTwo}`}
                       type="button"
                       data-toggle="collapse"
                       data-target="#navbarSupportedContent"
                       aria-controls="navbarSupportedContent"
                       aria-expanded="false"
                       aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
               </button>

               <div className={`${classOne}`} id="navbarSupportedContent">
                   <ul className="navbar-nav ml-auto">
                       <li className="nav-item active">
                           <button className="btn" >
                               <img alt="" width="24px" src="https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/home-alt-256.png"  ></img>
                               <span className="sr-only">(current)</span>
                           </button>
                       </li>


                   </ul>
                   <ul className="navbar-nav">
                       <li className="nav-item active">
                           <form className="form-inline my-3 my-lg-0">
                               <input className="form-control mr-sm-4"
                                      type="search"
                                      placeholder="Enter School Name"
                                      aria-label="Search"
                                      value={this.state.keyword}
                                      onChange={this.handleChange}/>
                           </form>
                       </li>
                       <li className="nav-item active">
                           <form className="form-inline my-3 my-lg-0">
                               <input className="form-control mr-sm-4"
                                      type="search"
                                      placeholder="Select State"
                                      aria-label="Search"
                                      value={this.state.StateID}
                                      onChange={(event) => this.handleSearchState(event.target.value)}/>
                           </form>
                       </li>
                       <li className="nav-item dropdown  mr-md-4 ">
                           <select className="nav-link dropdown-toggle"
                                   value={this.state.StateID}
                                   onChange={(event) => this.handleSearchState(event.target.value)}
                                   id="navbarDropdown">
                               Dropdown
                               <option className="dropdown-item" ></option>

                               {this.state.States.map(
                                   (States, index) =><StateItem key={index} abbreviation={States.abbreviation} name={States.name}/>)}
                           </select>

                       </li>
                       <li className="nav-item active my-lg-0">

                               <button className="btn btn-outline-success my-2 my-sm-0"
                                       onClick={this.handleSubmit}>
                                   <Link to={`/Search/${this.state.keyword}`}>
                                       Search
                                   </Link>
                               </button>

                       </li>
                     </ul>
               </div>

           </nav>
               <h2 className="text-white">Results</h2>


                   <div className="row">
                       <div className="col-md-4">
                           <Route path="/Search/:SearchParam/" component={LeftSchoolRender}
                                      />
                       </div>
                       <div className="col-md-8 rounded-sm">
                            <Route path="/Search/:SearchParam/:SchoolId" component={SchoolDetails}/>
                        </div>
                   </div>


               </div>

				
       )
   }
}

export default SearchSchools;