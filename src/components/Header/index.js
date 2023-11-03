import React from "react";
import './styles.scss';
import Logo from './../../images/logo5.png'



const Header = props => {
    return (

        <header className="header">
            <div className="wrap">
                <div className="logo"> 
                <img src = {Logo} alt="eCommerce Logo"/>

                </div>
            </div>


        </header>
    );
}

export default Header;