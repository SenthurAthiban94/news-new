import React,{Component} from 'react';
import './../styles/css/blog.css';
// HTML Parser modules
import Parser from 'html-react-parser';
// import { render } from 'react-dom';
////////////////////////////////////

export default class Blogcontent extends Component {
    constructor(){
        super();
        this.state={
            error:false,
            loader:true,
            contents_in_view:[],
            resultcount:10,
            next:false
        }
        this.moreresults=this.moreresults.bind(this);
    }
    sortByCity(cityname){
        this.setState({error:false,loader:true,contents_in_view : []});
        fetch('https://adminsa.herokuapp.com/sitesbycities/'+cityname+'/'+this.state.resultcount,{headers: {               //http://localhost:3001/
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(response=> {return response.json()})
        .then(data=>{
            this.setState({error:false,loader:false,contents_in_view : data},()=>{this.checknextsets(cityname)});
        }).catch(err=>{
            this.setState({error:true,loader:false,contents_in_view : err});
        });
    }
    checknextsets(cityname){
        fetch('https://adminsa.herokuapp.com/sitesbycities/'+cityname+'/'+this.state.resultcount+10,{headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }})
        .then(response=> {return response.json()})
        .then(data=>{
            var previousstate=this.state;
            if(data.length > this.state.contents_in_view.length){
                previousstate.next=true;
            }else{
                previousstate.next=false;
            }
            this.setState(previousstate);
        }).catch(err=>{
            this.setState({error:true,loader:false,contents_in_view : err});
        });
    }

    componentWillMount() {
        this.applyfilter(this.props);
    }
    componentWillReceiveProps(nextProps) {
        var previousstate=this.state;
            previousstate.resultcount=10;
            this.setState(previousstate);
        this.applyfilter(nextProps)
    }
    applyfilter(props){
        switch(props.filter.name){
            case "country":
                this.sortByCity(props.filter.value);
                break;
            case "query":
                break;
            default:
                break;
        }
    }
    moreresults(){
        var previousstate=this.state;
            previousstate.resultcount=this.state.resultcount+10;
            previousstate.next=false;
        this.setState(previousstate,()=>{
            this.applyfilter(this.props);
        });        
    }
    parseHTML(value){
        return Parser(value);
    }

    createContentUrl(event,i){
        event.preventDefault();
        console.log(this.state.contents_in_view[i]);
        // var media=event.target.parentElement.className;
        // this.socialshare(media);    
    }
    socialshare(url,media){
        switch(media){
            case "social_media_f":
                break;
            case "social_media_t":
                break;
            case "social_media_i":
                break;
            case "social_media_w":
                break;
            default:
                break;
        }
    }    
    render() {
        var renderelement= (
            <div className="content-wrapper">
                <h1 className="Heading">Trending on {this.props.filter.value}</h1>
                {    
                    (this.state.loader) ? <div className="loader-wrapper"><label className="loader"></label></div> : 
                    (this.state.error) ? <div className="text-center error_info">Something Went Wrong. Please try again Later!!</div> :
                    this.state.contents_in_view.map((e,v)=>{
                        var current_classname="blog-card "+((v % 2!==0) ? "alt" : "");
                        var current_imageURL={background: 'url("'+e.contentImageUrl+'") center no-repeat',backgroundSize: '150px 150px'};
                        return (                
                                <div className={current_classname} key={v}>
                                    <div className="blog-picture">
                                        <div className="photo" style={current_imageURL}></div>
                                    </div>
                                    <div className="views">
                                        <span className="glyphycon-icon view-icon"></span>
                                        <span className="search_traffic">{e.traffic}+ <i>Views</i></span>
                                    </div>
                                    <ul className="details">
                                        <li className="author">Share</li>
                                        {/* <li className="date">Aug. 24, 2015</li>
                                        <li className="tags"> */}
                                            {/* SHARE options  */}
                                            {/* <ul> */}
                                                <li><div className="social_media_f"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                                <li><div className="social_media_t"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                                <li><div className="social_media_i"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                                <li><div className="social_media_w"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                            {/* </ul> */}
                                        {/* </li> */}
                                    </ul>
                                    <div className="description">
                                        <h3>{e.title}</h3>
                                        <h2>{e.description}</h2>
                                        <div className="summary">
                                            <p>
                                                {this.parseHTML(e.summary.title)}
                                            </p>
                                            <p>
                                                {this.parseHTML(e.summary.content)}
                                            </p>
                                            <b>Source : </b><i>{this.parseHTML(e.summary.source)}</i>
                                        </div>
                                        <a rel="nofollow, noindex" href={e.contentLink} target="_blank">Read More</a>
                                    </div>
                                </div>
                            )
                    })
                }               
        { (!this.state.error) && (!this.state.loader) && (this.state.next) ? 
            <div className="More-results">
                <span className="highlight" onClick={this.moreresults}>View More</span>
            </div> : ""
        }
        </div>
        )

        return renderelement;
    }
}
