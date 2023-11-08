import React from "react";
import './styles.scss';
import { Link } from 'react-router-dom';

import Logo from './../../images/logo5.png';
import { getAuth, signOut } from "firebase/auth";



const Header = props => {
    const { currentUser } = props;
    return (

        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="eCommerce Logo" />
                    </Link>
                </div>
                <div className="callToActions">

                    {currentUser && (
                        <ul>
                            <li>
                                <span onClick={() => signOut(getAuth()).then(() => {
                                    // Handle successful sign out
                                }).catch((error) => {
                                    // Handle sign out errors
                                })}>
                                    Log Out
                                </span>

                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

Header.defaultProps = {
    currentUser: null
}

export default Header;