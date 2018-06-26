import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopRated from './TopRated';
import Upcoming from './Upcoming';
import NowPlaying from './NowPlaying';
import Popular from './Popular';
import MovieDetail from "./MovieDetail";

class MoviePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        };
    }

    getMovie = (data) => {
        this.setState({ movie: data });
    };

    render() {
        return (
            <Switch>
                <Route exact path="/movie" render={props => <Popular data={this.getMovie} {...props} />} />
                <Route path="/movie/top-rated" render={props => <TopRated data={this.getMovie} {...props} />} />
                <Route path="/movie/upcoming" render={props => <Upcoming data={this.getMovie} {...props} />} />
                <Route path="/movie/now-playing" render={props => <NowPlaying data={this.getMovie} {...props} />} />
                <Route path="/movie/:movie" render={props => (<MovieDetail data={this.state.movie} {...props} />)}/>
            </Switch>
        );
    }
}

export default MoviePage;