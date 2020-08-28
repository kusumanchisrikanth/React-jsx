import React from "react";

const Searchbox = ({ value, onChange }) => {
  return (
    <input
      className="my-2 form-control"
      value={value}
      placeholder="search..."
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Searchbox;
