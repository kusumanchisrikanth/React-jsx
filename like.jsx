import React, { Component } from "react";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";

class Like extends Component {
  render() {
    return <div>{this.getlike()}</div>;
  }
  getlike() {
    if (this.props.liked)
      return (
        <IoIosHeart
          style={{ cursor: "pointer" }}
          onClick={this.props.onClick}
        />
      );
    //if (!this.props.liked)
    return (
      <IoIosHeartEmpty
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
      />
    );
  }
}

export default Like;
