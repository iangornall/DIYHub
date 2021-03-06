import React, { Component } from 'react';
import SignUpForm from '../components/SignupForm';
import postSignup from '../fetchreqs/postSignup';
import postAuth from '../fetchreqs/postAuth';
import { connect } from 'react-redux';

class SignupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null,
            first: '',
            last: '',
            username: '',
            password: '',
            pwverify: '',
            email: ''
        }
    }
    render() {
        let signUp = (formData) => {
            formData.append('first_name', this.state.first);
            formData.append('last_name', this.state.last);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            let userData = {
                email: this.state.email,
                password: this.state.password
            }
            let post = () => {postAuth(userData, this.props.history.push, this.props.dispatch);};
            postSignup(this.props.dispatch, formData, this.props.history.push, post);
        }

        let updateState = (keyvalue, string) =>
            this.setState({[keyvalue]: string})

        return <SignUpForm {...this.state} update={updateState} signUp={signUp}/>
    }
}

export default connect()(SignupContainer);