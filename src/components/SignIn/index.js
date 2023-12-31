import React, { Component } from 'react';

import './styles.scss';

import FormInput from '../forms/Forminput';
import Button from './../forms/Button';
import { signInWithGoogle, auth } from '../../firebase/utils';
import { signInWithEmailAndPassword } from 'firebase/auth';


const initialState = {
    email: '',
    password: ''
};


class SignIn extends Component {

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


    handleSubmit = async e => {
        e.preventDefault();
    
        const { email, password } = this.state; 
    
        try {
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({ ...initialState });
        } catch (err) {
            console.error("Error signing in:", err);
            // Set the error message in the state to display it to the user
            this.setState({ errors: [err.message] });
        }
    }
    

    render() {


        const { email, password } = this.state;

        return (
            <div className="signin">
                <div className="wrap">
                    <h2>
                        Login
                    </h2>
                    <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>

                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                handleChange={this.handleChange}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                handleChange={this.handleChange}
                            />

                            <Button type="submit">
                                LogIn
                            </Button>

                            <div className="socialSignin">
                                <div className="row">
                                    <Button onClick={signInWithGoogle}>
                                        Sign in with Google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;