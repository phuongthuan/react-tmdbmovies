import React from 'react';
import Item from './Item';
import Pagination from '../../components/Pagination/Pagination';

const MovieList = (props) => {

    const movies = props.moviesList.results;
    const getMovie = props.movie;
    return (
        <div className="ss_results">
            {movies.map(movie => (<Item
                                    viewDetail={() => getMovie(movie.id)}
                                    movie={movie}
                                    key={movie.id} />) )}
            <Pagination 
                routeProps={props.routeProps} 
                prevPaginate={props.prevPaginate} 
                nextPaginate={props.nextPaginate} 
                dataPaginate={props.moviesList} />
        </div>
    );
};

export default MovieList;