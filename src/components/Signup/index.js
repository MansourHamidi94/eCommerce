import React, { Component } from "react";

import './styles.scss';

// firebase
import {  auth,handleUserProfile } from './../../firebase/utils';
import { createUserWithEmailAndPassword } from "firebase/auth";
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
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            const err = ["Password don't match"];
            this.setState({
                errors: err
            })
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await handleUserProfile(user, { displayName });
            this.setState({ ...initialState });
        } catch (err) {
            console.error("Error during user registration:", err);
            // Set the error message in the state to display it to the user
            this.setState({ errors: [err.message] });
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