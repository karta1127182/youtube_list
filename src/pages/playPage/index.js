import React from "react";
import YouTube from "react-youtube";
import "./css/playPage.css";

function PlayPage(props) {
  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  const opts = {
    height: "600px",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <>
      <div>
        <div>{props.location.state.title}</div>
        <div className="youtubeBox">
          <YouTube
            videoId={props.location.state.Id}
            opts={opts}
            onReady={_onReady}
          />
        </div>
        <div>{props.location.state.description}</div>
      </div>
    </>
  );
}
export default PlayPage;
