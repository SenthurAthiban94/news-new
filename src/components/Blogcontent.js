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

    createContentUrl(event,i){
        event.preventDefault();
        var pagetoshare="./?id="+this.state.contents_in_view[i]["_id"];
        var media=event.target.parentElement.className;
        this.socialshare(pagetoshare,media);    
    }
    socialshare(url,media){
        switch(media){
            case "social_media_f":
                console.log("facebook",url);
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
                            contentlink=e.contentLink ? (<a rel="nofollow, noindex" className="read_more" href={e.contentLink} target="_blank">Read More</a>) : "",
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
                                                <li><div className="fb-share-button social_media_f" data-href="https://news-new.herokuapp.com/?id=5b02ddadcb7fef002022da84" data-layout="button" data-size="small" data-mobile-iframe="true"><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnews-new.herokuapp.com%2F%3Fid%3D5b02ddadcb7fef002022da84&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore social-links" onClick={(event)=>this.createContentUrl(event,v)}> </a></div></li>
                                                <li><div className="social_media_t"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                                <li><div className="social_media_i"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                                <li><div className="social_media_w"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                            {/* </ul> */}
                                        {/* </li> */}
                                    </ul>
                                    <div className="description">
                                        <a className="description_link" target="_blank" href={"./?id="+e._id}>
                                            <h3>{e.title}</h3>
                                            <h2>{e.description}</h2>
                                            {summary}     
                                        </a>
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
