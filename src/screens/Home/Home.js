import React from "react";
import styles from "./styles.module.css";
import { Post } from "../../components";

const Home = (props) => {
  const { store } = props;

  const findUser = (post, store) => {
    const { userId } = post;

    const user = store.users.filter((obj) => {
      return obj.id === userId;
    });

    return user[0];
  };

  const findComments = (post, store) => {
    const { id } = post;

    const comments = store.comments.filter((obj) => {
      return obj.postId === id;
    });

    return comments;
  };

  const findLikes = (post, store) => {
    const { id } = post;

    const likes = store.likes.filter((obj) => {
      return obj.postId === id;
    });

    return likes;
  };

  const renderPosts = () => {
    return store.posts
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
      .map((post) => {
        return (
          <Post
            currentUserId={props.currentUserId}
            key={post.id}
            onLike={props.onLike}
            onUnlike={props.onUnlike}
            onComment={props.onComment}
            user={findUser(post, store)}
            post={post}
            comments={findComments(post, store)}
            likes={findLikes(post, store)}
          />
        );
      });
  };

  return <div className={styles.home}>{renderPosts()}</div>;
};

export { Home };
