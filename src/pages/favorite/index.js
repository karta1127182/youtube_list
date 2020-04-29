import React, { useState, useEffect } from "react";

import VideoBox from "../home/component/videoBox";
import PaginationBox from "../home/component/PaginationBox";

import Moment from "moment";
import "../home/css/index.css";

function MomentVideoTime(resTime) {
  let Time = Moment.duration(resTime).asMilliseconds();
  let minutes = parseInt((Time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (Time % (1000 * 60)) / 1000;
  return minutes + ":" + seconds;
}
function Home() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);
  const [totalPosts, setTotalPage] = useState(0);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("playList")) === null) {
      localStorage.setItem("playList", JSON.stringify([]));
    }
    setItems(JSON.parse(localStorage.getItem("playList")));
    setTotalPage(JSON.parse(localStorage.getItem("playList")).length);
  }, []);
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
        <div className="videoList">
          {currentPosts.map((text, idx, array) => (
            <VideoBox
              key={idx}
              title={currentPosts[idx].title}
              img={currentPosts[idx].img}
              description={currentPosts[idx].description}
              videoTime={currentPosts[idx].videoTime}
              Id={currentPosts[idx].Id}
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
