import React, { Component } from 'react';
import Header from './Header';
import Ad from './Ad';
import Search from './Search';
import Blogcontent from './Blogcontent';
import './../styles/css/Main.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      filter : {
        name:"country",
        value:"India"
      }
    }
    this.changefilter=this.changefilter.bind(this);
  }

  changefilter(filterdata){
    console.log(filterdata);
    switch(filterdata.name){
      case "country":
          this.setState({filter : filterdata})
          break;
      case "query":
          break;
      default:
          break;
    }
  }

  componentDidMount() {
    document.title = "Amazing Page";
  }

  render() {
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
              <Search filter={this.changefilter}/>
              <div>
                <Ad position={"LEFT"} content={""}/>
              </div>
            </div>
            </div>
            <div className="col-sm-6 col-xs-6 col-md-6 col-lg-6 body">
                <Blogcontent filter={this.state.filter}/>
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
