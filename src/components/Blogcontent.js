import React,{Component} from 'react';
import './../styles/css/blog-contents.css';
// HTML Parser modules
import Parser from 'html-react-parser';
// import { render } from 'react-dom';
////////////////////////////////////




export default class Blogcontent extends Component {
    constructor(){
        super();
        this.state={
            contents_in_view:[]
        }
    }
    sortByCity(cityname){
        fetch('https://adminsa.herokuapp.com/sitesbycities/'+cityname,{headers: {               //http://localhost:3001/
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }})
        .then(response=> {return response.json()})
        .then(data=>{
            this.setState({contents_in_view : data});
        }).catch(err=>{
            console.log(err);
        });
    }
    componentWillMount(){
        this.sortByCity('India');
    }
    parseHTML(value){
        return Parser(value);
    }
    render() {
        return (
            <div className="content-wrapper">
                <h3 className="Heading">Top Searches</h3>
                {    
                    this.state.contents_in_view.map((e,v)=>{
                        var current_classname="blog-card "+((v % 2!==0) ? "alt" : "");
                        var current_imageURL={background: 'url("'+e.contentImageUrl+'") center no-repeat',backgroundSize: '100% 100%'};
                        return (                
                                <div className={current_classname} key={v}>
                                    <div className="blog-picture">
                                        <div className="photo" style={current_imageURL}></div>
                                        <div className="views">
                                            <span className="glyphycon-icon view-icon"></span>
                                            <span className="search_traffic">{e.traffic}+ <i>Views</i></span>
                                        </div>
                                    </div>
                                    <ul className="details">
                                        <li className="author">Share</li>
                                        {/* <li className="date">Aug. 24, 2015</li>
                                        <li className="tags"> */}
                                            {/* SHARE options  */}
                                            {/* <ul> */}
                                                <li><a href=""><div className="social_media_f"></div></a></li>
                                                <li><a href=""><div className="social_media_t"></div></a></li>
                                                <li><a href=""><div className="social_media_i"></div></a></li>
                                                <li><a href=""><div className="social_media_w"></div></a></li>
                                            {/* </ul> */}
                                        {/* </li> */}
                                    </ul>
                                    <div className="description">
                                        <h1>{e.title}</h1>
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
        </div>
        )
    }
}
