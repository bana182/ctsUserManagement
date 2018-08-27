import React from "react";
import { Constants } from "../../constants";
import "./ConfirmModel.css";
import PropTypes from 'prop-types';


export const ConfirmModel = (props) => {
    return (
        <div id="myModal" className="modalBox">
            <div className="modalBox-content">
                <div className="modalBox-header">
                    <span onClick={() => { props.close() }} className="close">&times;</span>
                    <span>{Constants.CONFIRM_DIALOG_LABEL}</span>
                </div>
                <div className="modalBox-body">
                    <div className="delete-user-img">
                        <img src={props.user.avatar} width="68px" alt="" />
                    </div>
                    <div className="delete-user-data">
                        <h4><span>{props.user.first_name}</span> <span>{props.user.last_name}</span></h4>
                    </div>
                </div>
                <div className="modalBox-footer">
                    <button className="btn-info" onClick={() => { props.close() }}>{Constants.CANCEL}</button> &nbsp;
                     <button className="btn-success cancel-btn" onClick={() => { props.confirmDelete(props.user) }}>{Constants.DELETE}</button>
                </div>
            </div>

        </div>
    );
};

ConfirmModel.propTypes = {
    user: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    confirmDelete: PropTypes.func.isRequired,
}

