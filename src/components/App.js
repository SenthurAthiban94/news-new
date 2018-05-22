import React, { Component } from 'react';
import Header from './Header';
import Ad from './Ad';
import Search from './Search';
import Blogcontent from './Blogcontent';
import IndividualBlog from './IndividualBlog';
import PrivacyPolicy from './PrivacyPolicy';
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
          this.setState({filter : filterdata,blogdetails : false},()=>{
            document.title = "News New | "+this.state.filter.value;
          })
          break;
      case "query":
          break;
      default:
          break;
    }
  }
  getAddress (latitude, longitude) {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyBn7F5tuFmuhWoC8ntngoGZ2RYjVG9vcWA')
    .then(response=> {return response.json()})
    .then(response=>{
            console.log('User\'s Address Data is ', response);
            if(response.results && Object.keys(response.results).length){
              this.setState({filter:{name:"country",value:response.results[0].address_components[9].long_name},blogdetails : this._getParameter('id')});
            }
      }).catch(err=>{
        console.log('Request failed.  Returned status of',err);
    })
  }
  componentWillMount(){
    // this.getmylocation();
    // this.ipLookUp();
    this.checkprivacypage() ? document.title = "News New | Privacy Policy" : document.title = "News New | "+this.state.filter.value;
  }

  checkprivacypage(){
    var currentpage=window.location.href;
    if(currentpage==="https://news-new.herokuapp.com/privacy-policy/" || currentpage==="https://news-new.herokuapp.com/privacy-policy"){
      return true;
    }
    if(!this._getParameter("id") && currentpage!=="https://news-new.herokuapp.com/" && currentpage!=="https://news-new.herokuapp.com"){
      window.location.href="https://news-new.herokuapp.com/";
    }
    return false;
  }

  ipLookUp() {
    fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(response=>{
        console.log('User\'s Location Data is ', response);
        console.log('User\'s Country', response.country);
        // getAdress(response.lat, response.lon)
    })
    .catch((err,status)=>{
        console.log('Request failed.  Returned status of',status);
    });
  }
  getmylocation(){
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      var superscope=this;
      navigator.geolocation.getCurrentPosition(
       function success(position) {
        // for when getting location is a success
        //  console.log('latitude', position.coords.latitude, 
        //              'longitude', position.coords.longitude);
        superscope.getAddress(position.coords.latitude, position.coords.longitude);
       },
      function error(error_message) {
        // for when getting location results in an error
        // console.error('An error has occured while retrievinglocation', error_message)
      }  
    );
    }else {
      // geolocation is not supported
      // get your location some other way
      // console.log('geolocation is not enabled on this browser')
    }
  }
  render() {
    var searchoption=this.state.blogdetails ? "" : (<Search filter={this.changefilter}/>);
    var contents_container=this.state.blogdetails ? (
                            <IndividualBlog id={this.state.blogdetails} currenturl={this.state.blogdetails}/>
                          ) : (
                            <Blogcontent filter={this.state.filter} />
                          )

    var page_content= this.checkprivacypage() ? ( <div>
                                                    <div className="container-fluid">
                                                      <div className='row'>
                                                        <div className="sticky header">
                                                          <Header logo_url={"https://news-new.herokuapp.com/assets/images/logo.png"} />
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="privacy">
                                                      <PrivacyPolicy />
                                                    </div>
                                                  </div>
                                          ) : (
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
      
      return(page_content);
  }
}

export default App;
