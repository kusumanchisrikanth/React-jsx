import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
class Moviestable extends Component {
  colom = [
    {
      title: "Title",
      path: "title",
      content: (movie) => <Link to={`movies/${movie._id}`}>{movie.title}</Link>,
    },
    {
      title: "Genre",
      path: "genre.name",
    },
    {
      title: "Stock",
      path: "numberInStock",
    },
    {
      title: "Rate",
      path: "dailyRentalRate",
    },
    {
      name: "Like",
      content: (movie) => (
        <Like
          liked={movie.Like}
          onClick={() => this.props.onlike(movie)}
          colom={this.colom}
        />
      ),
    },
    {
      name: "Delete",
      content: (movie) => (
        <button
          onClick={() => this.props.ondelete(movie)}
          className="btn btn-danger"
          colom={this.colom}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, sortcolom, onsort } = this.props;
    return (
      <Table
        colom={this.colom}
        sortcolom={sortcolom}
        data={movies}
        onsort={onsort}
      />
    );
  }
}

export default Moviestable;
