import React, { Component } from 'react';
import './header.css';


export class Header extends Component {

    logOut() {
        sessionStorage.removeItem('userInfo');
        window.location.pathname = '/login'
    }
    render() {
        const userInfo = sessionStorage.getItem('userInfo') !== undefined ? JSON.parse(sessionStorage.getItem('userInfo')) : null;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/"><label>PEARSON</label></a>
                { userInfo !== null ? <div className="right-section">
                    <div><span>{userInfo.username}</span></div> &nbsp; &nbsp;
                    <a className="navbar-brand" href="#" onClick={() => { this.logOut() }}>LogOut</a>
                </div> : '' }
            </nav>
        );
    }
}