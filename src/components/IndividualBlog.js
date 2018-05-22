import React, { Component } from 'react'
import './../styles/css/individualSite.css';
// HTML Parser modules
import Parser from 'html-react-parser';
// import { render } from 'react-dom';


export default class IndividualBlog extends Component {
    constructor(props){
        super(props);
        this.state={
            loader:true,
            error:false,
            content:[]
        };
    }
    parseHTML(value){
        return Parser(value);
    }
    movetohome(e){
        e.preventDefault();
        window.location.href="/";
    }
    componentWillMount(){
        fetch('https://adminsa.herokuapp.com/sites/'+this.props.id,{headers: {               //http://localhost:3001/
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(response=> {return response.json()})
        .then(data=>{
            if(data.title){
                this.setState({error:false,loader:false,content : data},()=>{
                    this.set_SEO_Headers(data);
                });
            }else{
                this.setState({error:true,loader:false,content : "Unable to get Page!!"});    
            }
        }).catch(err=>{
            this.setState({error:true,loader:false,content : err});
        });
    }

    set_SEO_Headers(data){
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
        transformdate=new Date(data.created_date),
        searched_date = transformdate.getUTCDate()+"-"+monthNames[transformdate.getUTCMonth()]+"-"+transformdate.getUTCFullYear();
        document.title="News New | "+data.title;
        document.querySelector('meta[name="description"]').content=data.description && data.description.length ? data.description : data.title+" is one of the trending search in "+data.countryName+" on "+searched_date;
        document.querySelector('meta[name="og:country-name"]').content=data.countryName;
        document.querySelector('meta[itemprop="name"]').content="News New Search - "+data.title;
        document.querySelector('meta[itemprop="image"]').content=data.contentImageUrl && data.contentImageUrl.length ? data.contentImageUrl : "https://news-new.herokuapp.com/assets/images/logo.png";
        document.querySelector('meta[itemprop="description"]').content=data.description && data.description.length ? data.description : data.title+" is one of the trending search in "+data.countryName+" on "+searched_date;
        document.querySelector('meta[property="og:url"]').content=this.props.currenturl;
        document.querySelector('meta[property="og:title"]').content="News New Search - "+data.title;
        document.querySelector('meta[property="og:image"]').content=data.contentImageUrl && data.contentImageUrl.length ? data.contentImageUrl : "https://news-new.herokuapp.com/assets/images/logo.png";
        document.querySelector('meta[property="og:description"]').content=data.description && data.description.length ? data.description : data.title+" is one of the trending search in "+data.countryName+" on "+searched_date;
    }


  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var contents=this.state.content,
        transformdate=new Date(this.state.content.created_date),
        searched_date = transformdate.getUTCDate()+"-"+monthNames[transformdate.getUTCMonth()]+"-"+transformdate.getUTCFullYear(),
        contentlink=(contents.contentLink && (contents.contentLink.length>0)) ? <a href={contents.contentLink} rel="nofollow, noindex, noopener" target="_blank" className="post-link">Read More...</a> : "",
        contentImage=(contents.contentImageUrl && contents.contentImageUrl.length>0) ? contents.contentImageUrl : "./assets/images/contentImage.jpg",
        summary=contents.summary && Object.keys(contents.summary).length ? (<div className="blog-content">
                                                                            <p>
                                                                                <b>{this.parseHTML(contents.summary.title)}</b>
                                                                            </p>
                                                                            <p>
                                                                                {this.parseHTML(contents.summary.content)}
                                                                            </p>
                                                                            <p>
                                                                                <b>Source : </b>{this.parseHTML(contents.summary.source)}
                                                                            </p>
                                                                            </div>) : (
                                                                            <div className="blog-content">
                                                                            <p>
                                                                                People do not visit a specific page in this search but most of the people searched for this keyword in <b>{contents.countryName}</b>
                                                                            </p>
                                                                            </div>);
    return (
      <div className="container individual-container">
            {(this.state.loader) ? <div className="loader-wrapper"><label className="loader"></label></div> : 
            (this.state.error) ? <div><h1 className="text-center">Oops..!!</h1><div className="text-center error_info">Something Went Wrong. Please try again Later!!<div><label><span onClick={this.movetohome} className="button-home">Go to Home</span></label></div></div></div> : (
		  <div className="section">
                <div className="blog-post">
                    <h1 className="blog-title">Trending in {contents.countryName}</h1>                    
                    <div style={{textAlign:"center",margin:"30px 0px"}}>
                        <img src={contentImage} className="content-photo" alt="Searched Thumbimage"/>
                    </div>
                    <h1 className="blog-title">{contents.title}</h1>
                    <h2 className="date">Searched on {searched_date}</h2>
                    <p className="blog-content-description">
                        {contents.description ? contents.description : ""}
                    </p>
                    {summary}
                    {contentlink}
                </div>
          </div>)
        }
	</div>
    )
  }
}
