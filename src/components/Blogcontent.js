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
        fetch('https://adminsa.herokuapp.com/sitesbycities/'+cityname+'/'+(parseInt(this.state.resultcount,10) + 10),{headers: {
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

    shorten_description(longstring){
        longstring=longstring.substring(0,150);
        return longstring.substr(0, Math.min(longstring.length, longstring.lastIndexOf(" ")))+"...";
    }

    createContentUrl(event,i){
        event.preventDefault();
        var pagetoshare="https://news-new.herokuapp.com/?id="+this.state.contents_in_view[i]["_id"],
            metadescription=this.state.contents_in_view[i]["description"] && this.state.contents_in_view[i]["description"].length ? this.shorten_description(this.state.contents_in_view[i]["description"]) : "Most of people in "+this.state.contents_in_view[i]["countryName"]+" search for "+this.state.contents_in_view[i]["title"]+". Are you aware of it ?";            
            pagetoshare=pagetoshare+"&mettitle="+(this.state.contents_in_view[i]["title"])+"&metdesc="+metadescription+"&meturl="+pagetoshare;
        this.socialshare(pagetoshare,event.target.parentElement.className);    
    }
    socialshare(url,media){
        switch(media){
            case "social_media_f":
                console.log("facebook",url);
                window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url)+'&amp;src=sdkpreparse','facebook-share-dialog','width=626,height=436');
                // window.open(url);
                break;
            case "social_media_t":
                console.log("twitter",url);
                break;
            case "social_media_i":
                console.log("instagram",url);
                break;
            case "social_media_w":
                console.log("whatsapp",url);
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
                        var current_classname="blog-card "+((v % 2!==0) ? "alt" : ""),
                            image_url=e.contentImageUrl ? e.contentImageUrl : "./assets/images/contentImage.jpg",
                            current_imageURL={background: 'url("'+image_url+'") center no-repeat',backgroundSize: '150px 150px'},
                            contentlink=e.contentLink ? (<a rel="nofollow, noindex, noopener" className="read_more" href={e.contentLink} target="_blank">Read More</a>) : "",
                            summary=e.summary ? (
                                                    <div className="summary">
                                                        <p>
                                                            {this.parseHTML(e.summary.title)}
                                                        </p>
                                                        <p>
                                                            {this.parseHTML(e.summary.content)}
                                                        </p>
                                                        <b>Source : </b><i>{this.parseHTML(e.summary.source)}</i>
                                                    </div>) : ( <div className="summary">
                                                                    <p>
                                                                        People in {e.countryName} have not searched this keyword "<b>{e.title}</b>" into any specific website, but still it is one of the most searched content over the web in {e.countryName}. 
                                                                    </p>
                                                                </div>);
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
                                        <a className="description_link" target="_blank" href={"./?id="+e._id}>
                                            <h3>{e.title}</h3>
                                        </a>
                                        <h2>{e.description}</h2>
                                        {summary}     
                                        {contentlink}
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
