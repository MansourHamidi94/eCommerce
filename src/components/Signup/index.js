import React, { Component } from "react";

import './styles.scss';

// firebase
import { getAuth, handleUserProfile } from './../../firebase/utils';

import FormInput from "../forms/Forminput";
import Button from "../forms/Button";
import { confirmPasswordReset } from "firebase/auth";

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword, errors } = this.state;

        if (password !== confirmPassword) {
            const err = ["Password don't match"];
            this.setState({
                errors: err
            })
            return;
        }
    }

    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state;
    
        return (
            <div className="signup">
                <div className="wrap">
                    <h2>
                        Signup
                    </h2>
    
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => (
                                <li key={index}>
                                    {err}
                                </li>
                            ))}
                        </ul>
                    )}
    
                    <div className="formWrap">
                        {/* Corrected: Removed the self-closing form tag */}
                        <form onSubmit={this.handleFormSubmit}>
                            <FormInput
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full name"
                                onChange={this.handleChange}
                            />
    
                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handleChange}
                            />
    
                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
    
                            <FormInput
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                            />
    
                            <Button type="submit">
                                Register
                            </Button>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}   

export default Signup;