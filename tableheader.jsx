import React, { Component } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
class Tableheader extends Component {
  raisesort = (path) => {
    const sortcolom = { ...this.props.sortcolom };
    if (sortcolom.path === path) {
      sortcolom.order = sortcolom.order === "asc" ? "desc" : "asc";
    } else {
      sortcolom.path = path;
      sortcolom.order = "asc";
    }
    this.props.onsort(sortcolom);
  };
  rendericon = (col) => {
    if (col.name) return null;
    const { sortcolom } = this.props;
    if (col.path !== sortcolom.path) return null;
    if (sortcolom.order === "asc") return <FaAngleUp />;
    return <FaAngleDown />;
  };
  mouse = (col) => {
    if (col.title) return { cursor: "pointer" };
    return null;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.colom.map((col) => (
            <th
              key={col.title || col.name}
              scope="col"
              onClick={() => this.raisesort(col.path)}
              style={this.mouse(col)}
            >
              {col.title || col.name} {this.rendericon(col)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default Tableheader;
