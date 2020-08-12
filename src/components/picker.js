import React from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import InfoIcon from '@material-ui/icons/Info';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

let page = Math.floor(Math.random() * 500) + 1;
let selection = Math.floor(Math.random() * 20);

let genre = null;

class Picker extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            data: null
        }
    }

    getData = (page, selection, genre) => {
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
                "page": page,
                "with_genres": genre || null
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

    handleInfo = (event) => {
        if(!this.state.data) { return; }
    }

    handleReject = (event) => {
        if(!this.state.data) { return; }
        this.setState({
            data: null
        })
        page = Math.floor(Math.random() * 500);
        selection = Math.floor(Math.random() * 20); 
        this.getData(page, selection, genre);
        console.log("genre to be submitted: " + genre)
    }

    handleGenreChange = (event) => {
        genre = event.target.value;
        console.log(genre);
    }

    componentDidMount = () => {
        this.getData(page, selection, genre);
    }

    render() {
        let poster;
        if(this.state.data) {
            if(this.state.data.poster_path) {
                poster = <img alt="poster" src={"https://image.tmdb.org/t/p/w500/" + this.state.data.poster_path}></img>
            } else {
                poster = <p id="poster-not-found">Poster not found</p>
            }
        }
        if(this.state.data) {
            return (
                <div id="picker-info">
                    <div id="params">
                        <FormControl id="genre-dropdown">
                            <InputLabel>Genre</InputLabel>
                            <Select onChange={this.handleGenreChange}>
                                <MenuItem value={undefined}>None</MenuItem>
                                <MenuItem value={28}>Action</MenuItem>
                                <MenuItem value={12}>Adventure</MenuItem>
                                <MenuItem value={16}>Animation</MenuItem>
                                <MenuItem value={35}>Comedy</MenuItem>
                                <MenuItem value={80}>Crime</MenuItem>
                                <MenuItem value={99}>Documentary</MenuItem>
                                <MenuItem value={18}>Drama</MenuItem>
                                <MenuItem value={10751}>Family</MenuItem>
                                <MenuItem value={14}>Fantasy</MenuItem>
                                <MenuItem value={36}>History</MenuItem>
                                <MenuItem value={27}>Horror</MenuItem>
                                <MenuItem value={10402}>Music</MenuItem>
                                <MenuItem value={9648}>Mystery</MenuItem>
                                <MenuItem value={10749}>Romance</MenuItem>
                                <MenuItem value={878}>Science Fiction</MenuItem>
                                <MenuItem value={10770}>TV Movie</MenuItem>
                                <MenuItem value={53}>Thriller</MenuItem>
                                <MenuItem value={10752}>War</MenuItem>
                                <MenuItem value={37}>Western</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Paper elevation={24} id="paper">
                        {poster}
                        <h2><b>{this.state.data.title}</b></h2>
                        <div id="rating">
                            <Rating defaultValue={this.state.data.vote_average} max={10} precision={0.5} size="small" readOnly></Rating>
                        </div>
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
                <div id="params">
                    <FormControl id="genre-dropdown">
                        <InputLabel>Genre</InputLabel>
                        <Select>
                            <MenuItem value={28}>Action</MenuItem>
                            <MenuItem value={12}>Adventure</MenuItem>
                            <MenuItem value={16}>Animation</MenuItem>
                            <MenuItem value={35}>Comedy</MenuItem>
                            <MenuItem value={80}>Crime</MenuItem>
                            <MenuItem value={99}>Documentary</MenuItem>
                            <MenuItem value={18}>Drama</MenuItem>
                            <MenuItem value={10751}>Family</MenuItem>
                            <MenuItem value={14}>Fantasy</MenuItem>
                            <MenuItem value={36}>History</MenuItem>
                            <MenuItem value={27}>Horror</MenuItem>
                            <MenuItem value={10402}>Music</MenuItem>
                            <MenuItem value={9648}>Mystery</MenuItem>
                            <MenuItem value={10749}>Romance</MenuItem>
                            <MenuItem value={878}>Science Fiction</MenuItem>
                            <MenuItem value={10770}>TV Movie</MenuItem>
                            <MenuItem value={53}>Thriller</MenuItem>
                            <MenuItem value={10752}>War</MenuItem>
                            <MenuItem value={37}>Western</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Paper elevation={24} id="paper">
                    <CircularProgress color="secondary" id="load"/>
                </Paper>
                <div id="button-group">
                    <Fab id="reject-button">
                        <ClearIcon />
                    </Fab>
                    <Fab id='info-button'>
                        <InfoIcon />
                    </Fab>
                </div>
            </div>
        )
    }
}

export default Picker;