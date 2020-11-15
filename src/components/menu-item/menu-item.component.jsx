import React from "react";
import "./menu-item.style.scss";
import { withRouter } from "react-router-dom";
//url() is used to get the file from the URL string, ${} is used to convert the {Imageurl} to string
// size is used so that we can make sure the last 2 pictures are larger
//when we hover over the image we do not want the image to get bigger instead we want to see the effect get bigger within the div it is in
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
