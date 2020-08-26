import React, { Component } from "react";
import { getMovies } from "../fakeMovieService";
import Moviestable from "./moviestable";
import _ from "lodash";
import Listgroup from "./common/listgroup";
import { getGenres } from "../fakeGenreService";
import Page from "./common/pagination";
import { paginate } from "../utils/pagination";

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    pagesize: 4,
    selectedgenre: null,
    currentpage: 1,
    sortcolom: {
      path: "title",
      order: "asc",
    },
  };
  componentDidMount() {
    const genre = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genre: genre });
  }
  getpagedata = () => {
    const { currentpage, pagesize, selectedgenre, sortcolom } = this.state;
    const filtered =
      selectedgenre && selectedgenre._id
        ? this.state.movies.filter((m) => m.genre._id === selectedgenre._id)
        : this.state.movies;
    const sorted = _.orderBy(filtered, [sortcolom.path], [sortcolom.order]);
    const movies = paginate(sorted, currentpage, pagesize);
    return { totalcount: filtered.length, movies };
  };
  render() {
    const { currentpage, pagesize, selectedgenre, sortcolom } = this.state;
    const { totalcount, movies } = this.getpagedata();
    if (totalcount === 0)
      return (
        <div
          className="alert alert-warning alert-dismissible fade show m-2"
          role="alert"
        >
          <span role="img" aria-label="sad">
            🙁
          </span>{" "}
          There are no movies in the database..
        </div>
      );
    return (
      <div className="row">
        <div className="col-2">
          <Listgroup
            items={this.state.genre}
            selecteditem={selectedgenre}
            onitemselect={this.handlegenre}
          />
        </div>
        <div className="col">
          {/* {this.text()} */}
          <h3>Showing {totalcount} movies in the database</h3>
          <Moviestable
            movies={movies}
            sortcolom={sortcolom}
            onlike={this.handleclick}
            ondelete={this.delete}
            onsort={this.handlesort}
          />
          <Page
            itemscount={totalcount}
            pagesize={pagesize}
            onClick={this.handlepage}
            currentpage={currentpage}
          />
        </div>
      </div>
    );
  }
  // text() {
  //   // if (.length === 0)
  //   //   return <h3>There are no movies in the database!</h3>;
  //   return
  // }
  delete = (movie) => {
    const movies = this.state.movies.filter((mo) => mo._id !== movie._id);
    this.setState({ movies });
  };
  handleclick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].Like = !movies[index].Like;

    this.setState({ movies });
  };
  handlepage = (page) => {
    this.setState({ currentpage: page });
  };
  handlegenre = (genre) => {
    this.setState({ selectedgenre: genre, currentpage: 1 });
  };
  handlesort = (sortcolom) => {
    this.setState({ sortcolom });
  };
}
export default Movies;
