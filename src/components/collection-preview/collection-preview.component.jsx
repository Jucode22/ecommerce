import React from "react";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

// collection preview is the entire section/category of clothing type
// items is an array
// every time CollectionPreview gets rerendered, the items modifications
// such as the .filter() and .map() method, are called each time
// this may become a time complexity concern when the array becomes really large
const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(({ id, ...otherItemProps }) => (
          <CollectionItem key={id} {...otherItemProps} />
        ))}
    </div>
  </div>
);
export default CollectionPreview;
