import React from "react";
import { PostThumbnail } from "../../components";
import styles from "./styles.module.css";

const Profile = ({ store }) => {
  const user = store.users.filter((obj) => {
    return obj.id === store.currentUserId;
  })[0];

  const { id, photo, name, bio } = user;

  const posts = store.posts.filter((obj) => {
    return obj.userId === store.currentUserId;
  });

  const followers = store.followers.filter((obj) => {
    return obj.userId === store.currentUserId;
  });

  const following = store.followers.filter((obj) => {
    return obj.followerId === store.currentUserId;
  });

  const renderPosts = () => {
    return posts.map((post, i) => {
      return <PostThumbnail key={post.id} post={post} />;
    });
  };

  return (
    <div>
      <div className={styles.userInfoContainer}>
        <div className={styles.user}>
          <div className={styles.userPhotoContainer}>
            <img src={process.env.PUBLIC_URL + photo} alt="pfp" />
          </div>
          <p>{id}</p>
        </div>
        <div>
          <p className={styles.userName}>{name}</p>
          <p className={styles.userBio}>{bio}</p>
        </div>
      </div>

      <div className={styles.userStats}>
        <div>
          <p className={styles.statNumber}>{posts.length}</p>
          <p>posts</p>
        </div>

        <div>
          <p className={styles.statNumber}>{followers.length}</p>
          <p>following</p>
        </div>

        <div>
          <p className={styles.statNumber}>{following.length}</p>
          <p>followers</p>
        </div>
      </div>

      <div className={styles.posts}>{renderPosts()}</div>
    </div>
  );
};

export { Profile };
