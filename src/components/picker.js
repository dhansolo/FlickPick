import React from 'react';
import {useState, useEffect} from 'react';
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

let data = null;

let page = Math.floor(Math.random() * 500) + 1;
let selection = Math.floor(Math.random() * 20);
let url = "https://api.themoviedb.org/3/discover/movie"
let genre = null;

let Picker = () => {
    const [title, setTitle] = useState("");
    const [poster, setPoster] = useState(null);
    const [rating, setRating] = useState(0);

    let ratingElement = <Rating defaultValue={rating} max={10} precision={0.5} size="small" readOnly></Rating>;

    let getData = async (page, selection, genre, url) => {
        let config = {
            "method": "GET",
            "url": url,
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
                "with_genres": genre
            }
        }
        let response = await axios(config);
        data = await response.data.results[selection];
        setTitle(data.title);
        setPoster(data.poster_path);
        setRating(data.vote_average);
        ratingElement = <Rating defaultValue={rating} max={10} precision={0.5} size="small" readOnly></Rating>;
        console.log(ratingElement)
        document.getElementById("rating").style.display = "block";
        document.getElementById("poster").style.display = "inline";
    }

    let handleInfo = () => {

    }

    let handleReject = async () => {
        document.getElementById("poster").style.display = "none";
        document.getElementById("rating").style.display = "none";
        document.getElementById("load").style.display = "inline-block";
        setTitle(null);
        setPoster(null);
        setRating(0);
        ratingElement = null;
        page = Math.floor(Math.random() * 500);
        selection = Math.floor(Math.random() * 20); 
        await getData(page, selection, genre, url);
        setTitle(data.title);
        setPoster(data.poster_path);
        setRating(data.vote_average);
    }

    let handleGenreChange = (event) => {
        genre = event.target.value;
    }

    useEffect(() => {
        console.log('called');
        let makeReq = (async () => {
            await getData(page, selection, genre, url); 
            document.getElementById("load").style.display = "none";
        });
        makeReq();
    });

    return (
        <div id="picker-info">
            <div id="params">
                <FormControl id="genre-dropdown">
                    <InputLabel>Genre</InputLabel>
                    <Select onChange={handleGenreChange}>
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
                <CircularProgress id="load"/>
                <div>
                    <img alt="poster" id="poster" src={`https://image.tmdb.org/t/p/w500${poster}`}></img>
                    <h2><strong>{title}</strong></h2>
                    <div id="rating">
                        {ratingElement}
                    </div>
                </div>
            </Paper>
            <div id="button-group">
                <Fab id="reject-button" onClick={handleReject}>
                    <ClearIcon />
                </Fab>
                <Fab id='info-button' onClick={handleInfo}>
                    <InfoIcon />
                </Fab>
            </div>
        </div>
    )
}

/*
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
*/

export default Picker;