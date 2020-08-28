import React from "react";
import { getGenres } from "../fakeGenreService";
import { getMovie, saveMovie } from "../fakeMovieService";
import joi from "joi-browser";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  schema = {
    title: joi.string().required().label("Title"),
    genreId: joi.string().required().label("Genre"),
    numberInStock: joi
      .number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: joi
      .number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  dosubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div className="container">
        <h1>Movie Form </h1>
        <form onSubmit={this.handlesubmit}>
          {this.renderinput("title", "Title")}
          {this.renderselect("genreId", "Genre", this.state.genres)}
          {this.renderinput("numberInStock", "Number in stock", "number")}
          {this.renderinput("dailyRentalRate", "Rate", "number")}
          {this.rendersubmit("Save")}
        </form>
      </div>
    );
  }
}
export default MovieForm;
