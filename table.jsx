import React from "react";
import Tableheader from "./tableheader";
import Tablebody from "./tablebody";
const Table = ({ colom, sortcolom, onsort, data }) => {
  return (
    <table className="table table-warning ">
      <Tableheader colom={colom} sortcolom={sortcolom} onsort={onsort} />
      <Tablebody colom={colom} data={data} />
    </table>
  );
};

export default Table;
