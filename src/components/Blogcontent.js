import React,{Component} from 'react';
import './../styles/css/blog-contents.css';
// var request = require("request");

export default class Blogcontent extends Component {
    constructor(){
        super();
        this.state={
            contents_in_view:[]
        }
    }
    sortByCity(cityname){
        fetch('http://localhost:3001/sitesbycities/'+cityname,{headers: {
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
                                        <li className="author"><a href="">John Doe</a></li>
                                        <li className="date">Aug. 24, 2015</li>
                                        <li className="tags">
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
                                        <p className="summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.
                                        {/* {e.contentLink} */}
                                        </p>
                                        <a href={e.contentLink}>Read More</a>
                                    </div>
                                </div>
                            )
                    })
                }
                {/* <div class="blog-card alt">
                    <div class="photo" style={{background: 'url("http://i62.tinypic.com/34oq4o0.jpg") center no-repeat',backgroundSize: 'cover'}}></div>
                    <ul class="details">
                        <li class="author"><a href="#">Jane Doe</a></li>
                        <li class="date">July. 15, 2015</li>
                        <li class="tags">
                            <ul>
                                <li><a href="#">Learn</a></li>
                                <li><a href="#">Code</a></li>
                                <li><a href="#">JavaScript</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="description">
                        <h1>Mastering the Language</h1>
                        <h2>Java is not the same as JavaScript</h2>
                        <p class="summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
                        <a href="#">Read More</a>
                    </div>
                </div> */}
                
                
                
                
                
                
                
                
                
                
                
                                {/* {e.title}
                                {e.description}
                                {e.traffic}
                                {e.contentLink}
                                {e.contentImageUrl}
                                {e.dateTracked} */}
                  
        </div>
        )
    }
}
