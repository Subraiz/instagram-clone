import React, { useState } from "react";
import {
  AiOutlineHeart as Heart,
  AiFillHeart as FillHeart
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegComment as Comment } from "react-icons/fa";
import styles from "./styles.module.css";

const Post = (props) => {
  const [toggleComment, setToggleComment] = useState(false);
  const [comment, setComment] = useState("");
  const { user, comments, likes, post, currentUserId } = props;

  const liked =
    likes.filter((obj) => {
      return obj.userId === currentUserId;
    }).length > 0;

  const currentDateTime = new Date();
  const datetime = new Date(post.datetime);
  const diffTime = Math.abs(currentDateTime - datetime);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setToggleComment(!toggleComment);
    props.onComment(post.id, comment);
    setComment("");
  };

  const renderComments = () => {
    return comments
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
      .map((comment, i) => {
        const { userId, text, postId } = comment;
        return (
          <p key={postId + userId + i} className={styles.description}>
            <Link to={`/profile/${userId}`}>
              <span className={styles.userDescription}>{userId}</span>
            </Link>
            {text}
          </p>
        );
      });
  };

  const photoSrc = post.photo.includes("data")
    ? post.photo
    : process.env.PUBLIC_URL + post.photo;

  return (
    <div className={styles.postContainer}>
      <div className={styles.postUser}>
        <div className={styles.profilePictureContainer}>
          <img src={process.env.PUBLIC_URL + user.photo} alt="user-profile" />
        </div>
        <Link to={`/profile/${user.id}`}>
          <p className={styles.username}>{user.name}</p>
        </Link>
      </div>

      <img className={styles.postImage} src={photoSrc} alt="post" />

      <div className={styles.postInfo}>
        <div className={styles.buttonsContainer}>
          <div>
            {liked ? (
              <FillHeart
                className={styles.fillHeart}
                onClick={() => {
                  props.onUnlike(post.id);
                }}
              />
            ) : (
              <Heart
                className={styles.heart}
                onClick={() => {
                  props.onLike(post.id);
                }}
              />
            )}
          </div>
          <button
            onClick={() => {
              setToggleComment(!toggleComment);
            }}
          >
            <Comment className={styles.commentIcon} />
          </button>
        </div>
        <p className={styles.likes}>{`${likes.length} likes`}</p>
        <p className={styles.description}>
          <span className={styles.userDescription}>{user.id}</span>
          {post.desc}
        </p>
        <div className={styles.commentsContainer}>{renderComments()}</div>
        <p className={styles.date}>{diffDays} DAYS AGO</p>
        {toggleComment ? (
          <form className={styles.addComment} onSubmit={handleSubmitComment}>
            <input
              type="text"
              placeholder="Add a comment…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export { Post };
