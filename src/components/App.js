import React, { Component } from 'react';
import Header from './Header';
import Ad from './Ad';
import Search from './Search';
import Blogcontent from './Blogcontent';
import './../styles/css/Main.css';

class App extends Component {
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
              <Search option={{}}/>
              <div>
                <Ad position={"LEFT"} content={""}/>
              </div>
            </div>
            </div>
            <div className="col-sm-6 col-xs-6 col-md-6 col-lg-6 body">
                <Blogcontent/>
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
