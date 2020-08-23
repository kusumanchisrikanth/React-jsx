import React from "react";

const Listgroup = ({
  items,
  textproperty,
  valueproperty,
  onitemselect,
  selecteditem,
}) => {
  return (
    <ul className="list-group m-2">
      {items.map((item) => (
        <li
          key={item[valueproperty]}
          onClick={() => onitemselect(item)}
          className={
            item === selecteditem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textproperty]}
        </li>
      ))}
    </ul>
  );
};
Listgroup.defaultProps = {
  textproperty: "name",
  valueproperty: "_id",
};
export default Listgroup;
