import React from "react";
import "./Spinner.css";

export const Spinner = () => (
    <div>
        <div className="bg_load"></div>
        <div className="wrapper">
            <div className="inner">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
            </div>
        </div>
    </div>
);