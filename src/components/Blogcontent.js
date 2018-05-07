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
                                    <div className="photo" style={current_imageURL}></div>
                                    <ul className="details">
                                        <li className="author"><a rel="nofollow, noindex" href="">John Doe</a></li>
                                        <li className="date">Aug. 24, 2015</li>
                                        <li className="tags">
                                            {/* SHARE options  */}
                                            <ul>
                                                <li><a href="">Learn</a></li>
                                                <li><a href="">Code</a></li>
                                                <li><a href="">HTML</a></li>
                                                <li><a href="">CSS</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className="description">
                                        <h1>{e.title}<span style={{float:'right',fontSize:'12px'}}><span className="glyphicon glyphicon-eye-open"></span>{e.traffic}</span></h1>
                                        <h2>{e.description}</h2>
                                        <p className="summary">
                                            <div>
                                                {this.parseHTML(e.summary.title)}
                                            </div>
                                            <div>
                                                {this.parseHTML(e.summary.content)}
                                            </div>
                                            <div>
                                                <b>Source : </b>{this.parseHTML(e.summary.source)}
                                            </div>
                                        </p>
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
