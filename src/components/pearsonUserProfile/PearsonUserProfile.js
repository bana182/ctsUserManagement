import React from "react";
import { Constants } from "../../constants";
import "./PearsonUserProfile.css";
import PropTypes from 'prop-types';

export const PearsonUserProfile = (props) => (
    <div className="col-xs-12 col-sm-6 col-md-4">
        <div id={props.key} className="card">
            <div className="card-body text-center">
                <p><img className="img-fluid" src={props.user.avatar} alt="" /></p>
                <h4 className="card-title"><span>{props.user.first_name}</span> <span>{props.user.last_name}</span></h4>
                <div className="delete-btn"><a href="#" onClick={() => { props.deleteUser(props.user) }}>{Constants.DELETE}</a></div>
            </div>
        </div>
    </div>
);

PearsonUserProfile.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
    key: PropTypes.number
}