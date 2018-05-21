import React,{Component} from 'react';
import './../styles/css/header.css';

class Header extends Component{
    movetohome(e){
        e.preventDefault();
        window.location.href="/";
    }
    render(){
        return(
            <div className="header_container">
                <a href="" onClick={this.movetohome} ><img src={this.props.logo_url} className='header_logo' alt="LOGO" /></a>
                <a href="" onClick={this.movetohome} ><img src={"https://news-new.herokuapp.com/assets/images/home_icon.png"} style={{width:50,height:50,float:"right",margin:5}} alt="LOGO" /></a>
            </div>
        )
    }
}

export default Header;