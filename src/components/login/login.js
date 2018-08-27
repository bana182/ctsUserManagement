import React, { Component } from 'react';
import { Constants } from '../../constants';
import './login.css';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: {
                username: "",
                password: ""
            },
            notify: false,
            message: ''
        }
    }
    onChange(e, type) {
        let userProfile = this.state.userProfile;
        type === 'userName' ? userProfile.username = e.target.value : userProfile.password = e.target.value;
        this.setState({ userProfile: userProfile });
    }
    checkForAuthentication() {
        let message = '';
        let notify = false;
        const that = this;
        if (this.state.userProfile.username.trim().length > 0 && this.state.userProfile.password.trim().length > 0) {
            const userLoggedIn = Constants.UserProfiles.filter(item => that.state.userProfile.username === item.username && that.state.userProfile.password === item.password);
            if (userLoggedIn.length === 0) {
                message = Constants.INVALID_CREDENTIAL_MESSAGE;
                notify = true;
            } else {
                message = '';
                notify = false;
                this.props.history.push({
                    pathname: '/',
                    state: { userInfo: userLoggedIn }
                });
                sessionStorage.setItem('userInfo', JSON.stringify(userLoggedIn[0]));
            }
        } else {
            message = Constants.EMPTY_FIELDS;
            notify = true;
        }
        this.setState({ message: message, notify: notify })
    }
    render() {

        return (
            <div>
                <div className="title">
                    <h1>{Constants.APP_TITLE}</h1>
                </div>
                <div className="panel panel-default login">
                    <div className="panel-heading"><h3 className="panel-title"><strong>{Constants.SIGN_IN}</strong></h3></div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">{Constants.USER_NAME}</label>
                            <input autocomplete="false" type="text" className="form-control" name="username" onChange={(e) => { this.onChange(e, 'userName') }} id="username" placeholder="Enter usrname" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">{Constants.PASSWORD}</label>
                            <input type="password" autocomplete="new-password" className="form-control" name="password" onChange={(e) => { this.onChange(e, 'password') }} id="password" placeholder="password" />
                        </div>
                        {this.state.notify ? <span>{this.state.message}</span> : ''} <br />
                        <button className="btn-primary" onClick={(e) => { this.checkForAuthentication(e) }}>{Constants.LOG_IN}</button>
                    </div>
                </div>
            </div>
        );
    }
}