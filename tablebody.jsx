import React, { Component } from "react";
import _ from "lodash";
class Tablebody extends Component {
  rendercell = (item, col) => {
    if (col.content) return col.content(item);
    return _.get(item, col.path);
  };
  generatekey = (item, col) => {
    return item._id + (col.path || col.content);
  };
  render() {
    const { data, colom } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {colom.map((col) => (
              <td key={this.generatekey(item, col)}>
                {this.rendercell(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default Tablebody;
