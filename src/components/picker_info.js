import React from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

class PickerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    handleApprove(event) {

    }

    handleReject(event) {

    }

    render() {
        let poster = "https://image.tmdb.org/t/p/w500/" + this.props.data.poster_path;
        return (
            <div id="picker-info">
                <Paper elevation={24}>
                    <img alt="poster" src={poster}></img>
                    <p><b>{this.props.data.title}</b></p>
                    <p>{this.props.data.release_date}</p>
                    <p>{this.props.data.vote_average}/10</p>
                    {/* <p>{this.props.data.overview}</p> */}
                </Paper>
                <div id="button-group">
                    <Fab id="reject-button" onClick={this.handleReject}>
                        <ClearIcon />
                    </Fab>
                    <Fab id='approve-button'>
                        <CheckIcon />
                    </Fab>
                </div>
            </div>
        )
    }
}

export default PickerInfo;