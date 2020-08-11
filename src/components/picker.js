import React from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import InfoIcon from '@material-ui/icons/Info';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';

let page = Math.floor(Math.random() * 500);
let selection = Math.floor(Math.random() * 20);

class Picker extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            data: null
        }
        this.handleInfo = this.handleInfo.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleInfo(event) {

    }

    handleReject(event) {
        this.setState({
            data: null
        })
        page = Math.floor(Math.random() * 500);
        selection = Math.floor(Math.random() * 20); 
        axios({
            "method": "GET",
            "url": "https://api.themoviedb.org/3/discover/movie",
            "headers": {
                "content-type": "application/json",
                "access-control-allow-origin": "*",
            }, "params": {
                "api_key": process.env.REACT_APP_API_KEY,
                "language":"en-US",
                "sort_by": "popularity.desc",
                "include_adult": "false",
                "include_video": "false",
                "page": page
            }
            })
            .then((response)=> {
                this.setState({ data: response.data.results[selection]})
                console.log(this.state.data);
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    handleNext(event) {

    }

    componentDidMount() {
        axios({
            "method": "GET",
            "url": "https://api.themoviedb.org/3/discover/movie",
            "headers": {
                "content-type": "application/json",
                "access-control-allow-origin": "*",
            }, "params": {
                "api_key": process.env.REACT_APP_API_KEY,
                "language":"en-US",
                "sort_by": "popularity.desc",
                "include_adult": "false",
                "include_video": "false",
                "page": page
            }
            })
            .then((response)=> {
                this.setState({ data: response.data.results[selection]})
                console.log(this.state.data);
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    render() {
        let poster;
        if(this.state.data) {
            poster = "https://image.tmdb.org/t/p/w500/" + this.state.data.poster_path;
            console.log(poster);
        }
        if(this.state.data) {
            return (
                <div id="picker-info">
                    <Paper elevation={24} id="paper">
                        <img alt="poster" src={poster}></img>
                        <p><b>{this.state.data.title}</b></p>
                        <p>{this.state.data.release_date}</p>
                        <p>{this.state.data.vote_average}/10</p>
                        {/* <p>{this.state.data.overview}</p> */}
                    </Paper>
                    <div id="button-group">
                        <Fab id="reject-button" onClick={this.handleReject}>
                            <ClearIcon />
                        </Fab>
                        <Fab id='info-button' onClick={this.handleInfo}>
                            <InfoIcon />
                        </Fab>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Paper elevation={24} id="paper">
                    <CircularProgress color="secondary" id="load"/>
                </Paper>
            </div>
        )
    }
}

export default Picker;