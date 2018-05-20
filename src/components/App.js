import React, { Component } from 'react';
import Header from './Header';
import Ad from './Ad';
import Search from './Search';
import Blogcontent from './Blogcontent';
import IndividualBlog from './IndividualBlog';
import './../styles/css/Main.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      filter : {
        name:"country",
        value:"India"
      },
      blogdetails : this._getParameter('id')
    }
    this.changefilter=this.changefilter.bind(this);
  }
   _getParameter(identifier) {
      var result = undefined, tmp = [];
      var items = window.location.search.substr(1).split("&");
      for (var index = 0; index < items.length; index++) {
          tmp = items[index].split("=");

          if (tmp[0] === identifier){
              result = decodeURIComponent(tmp[1]);
          }
      }
      return result ? result : false;
  }

  changefilter(filterdata){
    switch(filterdata.name){
      case "country":
          this.setState({filter : filterdata,blogdetails : false})
          break;
      case "query":
          break;
      default:
          break;
    }
  }

  componentWillMount() {
    document.title = "Amazing Page";
  }

  render() {
    var searchoption=this.state.blogdetails ? "" : (<Search filter={this.changefilter}/>);
    var contents_container=this.state.blogdetails ? (
      <IndividualBlog id={this.state.blogdetails}/>
    ) : (
      <Blogcontent filter={this.state.filter} />
    )
    return (
      <div>
        <div className="container-fluid">
          <div className='row'>
            <div className="sticky header">
              <Header logo_url={"./assets/images/logo.png"} />
            </div>
          </div>

          <div className='row contentroot'>
            <div className="col-sm-3 col-xs-3 col-md-3 col-lg-3 hidden-xs body searchoptions" >
            <div className="sticky col-sm-3 col-xs-3 col-md-3 col-lg-3">
              {searchoption}
              <div>
                <Ad position={"LEFT"} content={""}/>
              </div>
            </div>
            </div>
            <div className="col-sm-6 col-xs-6 col-md-6 col-lg-6 body">
                {contents_container}
            </div>
            <div className="col-sm-3 col-xs-3 col-md-3 col-lg-3 hidden-xs body" >
              <div className="sticky col-sm-3 col-xs-3 col-md-3 col-lg-3">
                <div>
                  <Ad position={"RIGHT"} content={""}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Ad position={"BOTTOM"} content={""}/>         */}
      </div>
    );
  }
}

export default App;
