import React from "react";
import "./Footer.css";
import { Constants } from '../../constants';

export const Footer = () => (
    <footer className="footer">
        <div className="container-fluid">
            <div className="row">
            </div>
            <span>{Constants.FOOTER_LABEL}</span>
        </div>
    </footer>
);