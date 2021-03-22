import React from "react";
import css from "./PostThumbnail.module.css";

function PostThumbnail(props) {
  return (
    <div className={css.square}>
      <div className={css.content}>
        <img
          className={css.image}
          src={process.env.PUBLIC_URL + props.post.photo}
          alt="Post Thumbnail"
        />
      </div>
    </div>
  );
}

export { PostThumbnail };
