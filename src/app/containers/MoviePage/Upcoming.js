import React, { Component } from 'react';
import requestApi from '../api';
import MovieList from './MovieList';

class Upcoming extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                results: []
            },
            isLoading: false
        }
    }

    nextPage(e) {
        const page = this.state.data.page + 1;
        requestApi.fetchDataPaginate('movie', 'upcoming', page).then(response => {
            this.setState({ data: response.data });
        });
    }

    prevPaginate(e) {
        const page = this.state.data.page - 1;
        requestApi.fetchDataPaginate('movie', 'upcoming', page).then(response => {
            this.setState({ data: response.data });
        });
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        requestApi.fetchData('movie', 'upcoming').then(response => {
            this.setState({ data: response.data, isLoading: false });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="ss_media">
                    <h2 className="title">Upcoming Movies</h2>
                    <MovieList
                        routeProps={this.props}
                        prevPaginate={this.prevPaginate.bind(this)}
                        nextPaginate={this.nextPage.bind(this)}
                        moviesList={this.state.data} />
                </div>
            </div>
        );
    }
}

export default Upcoming;