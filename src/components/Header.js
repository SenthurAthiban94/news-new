import React,{Component} from 'react';
import './../styles/css/header.css';

class Header extends Component{
    render(){
        return(
            <div className="header_container">
                <img src={this.props.logo_url} className='header_logo' alt="LOGO" />
            </div>
        )
    }
}

export default Header;