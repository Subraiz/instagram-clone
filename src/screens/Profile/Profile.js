import React from "react";
import { Link, useParams } from "react-router-dom";
import { PostThumbnail } from "../../components";
import styles from "./styles.module.css";

const Profile = ({ store, onFollow, onUnfollow }) => {
  let user = store.users.filter((obj) => {
    return obj.id === store.currentUserId;
  })[0];

  const { profileId } = useParams();

  const findUserById = (profileId) => {
    const user = store.users.filter((obj) => {
      return obj.id === profileId;
    });

    if (user.length > 0) {
      return user[0];
    } else {
      return null;
    }
  };

  if (findUserById(profileId)) {
    user = findUserById(profileId);
  }

  const { id, photo, name, bio } = user;

  const posts = store.posts.filter((obj) => {
    return obj.userId === user.id;
  });

  const followers = store.followers.filter((obj) => {
    return obj.userId === user.id;
  });

  const following = store.followers.filter((obj) => {
    return obj.followerId === user.id;
  });

  const renderPosts = () => {
    return posts.map((post, i) => {
      return (
        <Link key={post.id} to={`/${post.id}`}>
          <PostThumbnail post={post} />
        </Link>
      );
    });
  };

  const renderFollowButton = () => {
    if (user.id !== store.currentUserId) {
      const isFollowing =
        store.followers.filter((obj) => {
          return (
            obj.followerId === user.id && store.currentUserId === obj.userId
          );
        }).length > 0;

      console.log(store.followers);
      console.log(isFollowing);

      if (isFollowing) {
        return (
          <button
            onClick={() => onUnfollow(store.currentUserId, user.id)}
            className={styles.unfollowButton}
          >
            Unfollow
          </button>
        );
      } else {
        return (
          <button
            onClick={() => {
              onFollow(store.currentUserId, user.id);
            }}
            className={styles.followButton}
          >
            Follow
          </button>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div>
      <div className={styles.userInfoContainer}>
        <div className={styles.user}>
          <div className={styles.userPhotoContainer}>
            <img src={process.env.PUBLIC_URL + photo} alt="pfp" />
          </div>
          <div className={styles.userNameContainer}>
            <p>{id}</p>
            {renderFollowButton()}
          </div>
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
