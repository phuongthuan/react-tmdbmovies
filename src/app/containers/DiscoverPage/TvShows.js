import React, { Component } from 'react';
import requestApi from '../api';
import TvList from "../TvShowPage/TvList";

class TvShow extends Component {

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

    nextPage = () => {
        const page = this.state.data.page + 1;
        requestApi.fetchDataPaginate('discover/tv', page).then(response => {
            this.setState({data: response.data});
        });
    };

    prevPaginate = () => {
        const page = this.state.data.page - 1;
        requestApi.fetchDataPaginate('discover/tv', page).then(response => {
            this.setState({ data: response.data });
        });
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        requestApi.fetchData('discover/tv').then(response => {
            this.setState({ data: response.data, isLoading: false });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="ss_media">
                    <h2 className="title">Discover New Movies & TV Shows</h2>
                    <TvList
                        routeProps={this.props}
                        prevPaginate={this.prevPaginate}
                        nextPaginate={this.nextPage}
                        tvshowsList={this.state.data} />
                </div>
            </div>
        );
    }
}

export default TvShow;