import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Page extends Component {
  render() {
    const { pagesize, itemscount, onClick, currentpage } = this.props;
    const pagecount = Math.ceil(itemscount / pagesize);
    //console.log(currentpage);
    if (
      (pagecount === 1) |
      {
        /*(pagecount < 1)*/
      }
    )
      return null;
    const pages = _.range(1, pagecount + 1);
    return (
      <nav aria-label="Page navigation ">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentpage ? "page-item active" : "page-item "
              }
            >
              <button className="page-link" onClick={() => onClick(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Page.propTypes = {
  pagesize: PropTypes.number.isRequired,
  itemscount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  currentpage: PropTypes.number.isRequired,
};
export default Page;
