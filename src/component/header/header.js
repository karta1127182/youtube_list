import React from "react";
import "./css/header.css";
import {Link} from "react-router-dom";
import Button from "../../component/button";
class header extends React.Component {
  render() {
    return (
      <>
        <div className="header">
          <div className="headerTitle">Header</div>
          <div>

            <Link to="/">
              <Button buttonName="Home" />
            </Link>
            <Link to="/favorite">
              <Button buttonName="favorite" />
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default header;
