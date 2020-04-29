import React from "react";
import "./css/button.css";
function button(props) {
  return (
    <>
      <button className="button">{props.buttonName}</button>
    </>
  );
}

export default button;
