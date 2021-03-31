import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import initialStore from "./initialStore";
import uniqueId from "./utils/uniqueId";
import { Home, Search, Create, Notification, Profile } from "./screens";
import { Header, NavBar } from "./components";

function App() {
  const [store, setStore] = useState(initialStore);

  const addLike = (postId) => {
    const like = {
      userId: store.currentUserId,
      postId,
      datetime: new Date().toISOString()
    };

    setStore({ ...store, likes: store.likes.concat(like) });
  };

  const removeLike = (postId) => {
    let like = store.likes.filter((obj) => {
      return obj.userId === store.currentUserId && obj.postId === postId;
    });

    const index = store.likes.indexOf(like[0]);
    store.likes.splice(index, 1);

    setStore({ ...store, likes: store.likes });
  };

  const addComment = (postId, text) => {
    const comment = {
      userId: store.currentUserId,
      postId,
      text,
      datetime: new Date().toISOString()
    };

    setStore({ ...store, comments: store.comments.concat(comment) });
  };

  const addPost = (photo, desc) => {
    const post = {
      userId: store.currentUserId,
      desc,
      photo: photo,
      datetime: new Date().toISOString(),
      id: uniqueId("post")
    };
    setStore({ ...store, posts: store.posts.concat(post) });
  };

  const addFollower = (userId, followerId) => {
    const newFollow = {
      userId: userId,
      followerId: followerId
    };
    console.log(newFollow);
    setStore({
      ...store,
      followers: store.followers.concat(newFollow)
    });
  };

  const removeFollower = (userId, followerId) => {
    setStore({
      ...store,
      followers: store.followers.filter(
        (follower) =>
          follower.followerId !== followerId || follower.userId !== userId
      )
    });
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/profile/:profileId?">
            <Profile
              store={store}
              onFollow={addFollower}
              onUnfollow={removeFollower}
            />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/post">
            <Create onSubmit={addPost} />
          </Route>
          <Route path="/notifications">
            <Notification />
          </Route>
          <Route path="/:postId?">
            <Home
              store={store}
              onLike={addLike}
              onUnlike={removeLike}
              onComment={addComment}
              currentUserId={store.currentUserId}
            />
          </Route>
        </Switch>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
