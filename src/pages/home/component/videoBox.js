import React, { useState, useEffect } from "react";
import "../css/videoBox.css";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
const VideoBox = ({ title, img, videoTime, description, Id }) => {
  const [check, setCheck] = useState("");
  useEffect(() => {}, [check]);
  const addFavorite = (Id, title, img, videoTime, description) => {
    let obj;
    if (JSON.parse(localStorage.getItem("playList")) === null) {
      obj = [
        {
          Id: Id,
          title: title,
          img: img,
          videoTime: videoTime,
          description: description,
        },
      ];
      localStorage.setItem("playList", JSON.stringify(obj));
    } else {
      obj = JSON.parse(localStorage.getItem("playList"));
      obj.push({
        Id: Id,
        title: title,
        img: img,
        videoTime: videoTime,
        description: description,
      });
      localStorage.setItem("playList", JSON.stringify(obj));
    }
    setCheck(true);
  };
  const detFavorite = (index) => {
    let obj = JSON.parse(localStorage.getItem("playList"));
    obj.splice(index, 1);
    localStorage.setItem("playList", JSON.stringify(obj));
    setCheck(false);
  };

  return (
    <>
      <div className="videoBox">
        {JSON.parse(localStorage.getItem("playList"))
          .map((item) => item.Id)
          .indexOf(Id) === -1 ? (
          <div
            onClick={() => addFavorite(Id, title, img, videoTime, description)}
            className="viedoeBoxFavoriteButton"
          >
            <AiOutlineStar />
            &nbsp;點擊收藏
          </div>
        ) : (
          <div
            onClick={() =>
              detFavorite(
                JSON.parse(localStorage.getItem("playList"))
                  .map((item) => item.Id)
                  .indexOf(Id)
              )
            }
            className="viedoeBoxFavoriteButton"
          >
            <AiFillStar />
            &nbsp;取消收藏
          </div>
        )}

        <Link
          to={{
            pathname: "/palypage",
            state: {
              Id: Id,
              title: title,
              description: description,
            },
          }}
        >
          <div className="viedoImgBox">
            <img className="videoImg" src={img} alt="圖片失去連結" />
            <div className="videoTimeBox">{videoTime}</div>
          </div>
        </Link>
        <p className="videoTitle">{title}</p>
        <p className="videoDescription">{description}</p>
      </div>
    </>
  );
};
export default VideoBox;
