import React from 'react';
import axios from 'axios';

import PickerInfo from './picker_info';

let page = Math.floor(Math.random() * 500);
let selection = Math.floor(Math.random() * 20);

class Picker extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            data: null
        }
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleApprove(event) {

    }

    handleReject(event) {

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
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    render() {
        let data;
        if(this.state.data) {
            data = <PickerInfo data={this.state.data}/>
        }
        return (
            <div>
                {data}
            </div>
        )
    }
}

export default Picker;