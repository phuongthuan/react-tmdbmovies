import React, { Component } from 'react';
import movieApi from '../api.js';
import MovieList from './MovieList';

class Popular extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                page: 1,
                results: []
            },
            isLoading: false
        }
    }

    nextPage(e) {
        const page = this.state.data.page + 1;
        movieApi.fetchMoviePaginate('movie', 'popular', page).then(response => {
            this.setState({data: response.data});
        });
    }

    prevPaginate(e) {
        const page = this.state.data.page - 1;
        movieApi.fetchMoviePaginate('movie', 'popular', page).then(response => {
            this.setState({ data: response.data });
        });
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        movieApi.fetchMovie('movie', 'popular').then(response => {
            this.setState({ data: response.data, isLoading: false });
        });
    }

    render() {
        return (
            <div>
                <h2 className="title">Popular Movies</h2>
                <MovieList 
                    routeProps={this.props}
                    prevPaginate={this.prevPaginate.bind(this)} 
                    nextPaginate={this.nextPage.bind(this)} 
                    moviesList={this.state.data} />
            </div>
        );
    }
}

export default Popular;