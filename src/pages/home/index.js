import React, { useState, useEffect } from "react";
import axios from "axios";

import VideoBox from "./component/videoBox";
import PaginationBox from "./component/PaginationBox";
import ReactLoading from "react-loading";

import Moment from "moment";
import "./css/index.css";

function MomentVideoTime(resTime) {
  let Time = Moment.duration(resTime).asMilliseconds();
  var minutes = parseInt((Time % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (Time % (1000 * 60)) / 1000;
  if (seconds < 10) {
    return minutes + ":0" + seconds;
  } else {
    return minutes + ":" + seconds;
  }
}
function Home() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);
  const [totalPosts] = useState(50);
  const [pageLoading, setLoading] = useState(true);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("playList")) === null) {
      localStorage.setItem("playList", JSON.stringify([]));
    }

    axios
      .get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: "snippet,contentDetails",
          chart: "mostPopular",
          maxResults: totalPosts,
          key: "AIzaSyBmCufGL3Wyz5DFhn_jH1e5bydSQHyN5z0",
          pageToken: "CAwQAA",
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        console.log(res.data.items);
        setItems(res.data.items);
      });
  }, [totalPosts]);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const paginateNextPage = () => {
    if (Math.floor(totalPosts / postPerPage) + 1 >= currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const paginatePreviousPage = () => {
    if (1 <= currentPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div>
        {pageLoading ? (
          <div className="loadingPage">
            <div className="loadingText">
              正在載入....
            </div>
            <ReactLoading
              type={"spinningBubbles"}
              color={"red"}
              height={150}
              width={150}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className="videoList">
          {currentPosts.map((text, idx, array) => (
            <VideoBox
              key={idx}
              title={currentPosts[idx].snippet.title}
              img={currentPosts[idx].snippet.thumbnails.medium.url}
              description={currentPosts[idx].snippet.description}
              videoTime={MomentVideoTime(
                currentPosts[idx].contentDetails.duration
              )}
              Id={currentPosts[idx].id}
            />
          ))}
        </div>
        <PaginationBox
          postPerPage={postPerPage}
          totalPosts={totalPosts}
          paginate={paginate}
          currentPage={currentPage}
          paginateNextPage={paginateNextPage}
          paginatePreviousPage={paginatePreviousPage}
        />
      </div>
    </>
  );
}
export default Home;
