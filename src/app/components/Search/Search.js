import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import requestApi from '../../containers/api';
import { withRouter } from 'react-router-dom';
import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function getSuggestionValue(suggestion) {
    return suggestion.name || suggestion.title;
}

function renderSuggestion(suggestion) {
    return (
        <div className="slim_search">
            <div className="container">
                <FontAwesomeIcon icon={(() => {
                    switch (suggestion.media_type) {
                        case "movie":   return "film";
                        case "tv":      return "tv";
                        case "people":  return "user";
                        default:        return "search";
                    }
                })()} />
                <p>{suggestion.name || suggestion.title}</p>
            </div>
        </div>
    );
}

class Search extends Component {

    constructor() {
        super();
        this.timeout = 0;
        this.state = {
            value: '',
            suggestions: [],
            data: {
                results: []
            },
            isLoading: false
        };
    }

    loadSuggestions(value) {
        if(this.timeout) clearTimeout(this.timeout);
        if (value.trim() === '') return;

        this.setState({isLoading: true});

        this.timeout = setTimeout(() => {
            requestApi.search('search/multi', value)
                .then(response => {
                    this.setState({
                        isLoading: false,
                        // data: response.data,
                        suggestions: response.data.results
                    });
                })
                .catch(error => console.log(error));
        }, 500);
    }

    onChange = (event, {newValue}) => {
        this.setState({value: newValue});
    };

    onSuggestionsFetchRequested = ({value}) => {
        this.loadSuggestions(value);
    };

    onSuggestionSelected = (event, {suggestion, suggestionValue }) => {

        console.log('Selected', suggestion); // {value: 'new value', label: 'new label'}

        if (suggestion.media_type === 'movie') {
            this.searchData('search/movie', suggestionValue);
            this.navigate('/search/movie', suggestionValue);

        } else if (suggestion.media_type === 'tv') {
            this.searchData('search/tv', suggestionValue);
            this.navigate('/search/tv', suggestionValue);

        } else {
            this.searchData('search/multi', suggestionValue);
            this.navigate('/search', suggestionValue);
        }
    };

    searchData = (url, value) => {
        requestApi.search(url, value).then(response => {
            this.setState({data: response.data});
        });
    };

    navigate = (pathname, queryValue) => {
        this.props.history.push({
            pathname,
            search: `?query=${queryValue}`,
            state: {results: this.state.data}
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({suggestions: []});
    };

    render() {
        const {value, suggestions, isLoading} = this.state;
        const inputProps = {
            placeholder: "Search for a movie, tv show, person...",
            value,
            onChange: this.onChange
        };

        return (
            <div className="search_box">
                <Autosuggest
                    suggestions={suggestions}
                    highlightFirstSuggestion={true}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} />
            </div>
        );
    }
}

export default withRouter(Search);
