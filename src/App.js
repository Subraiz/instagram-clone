import React, { useState } from "react";
import "./App.css";
import initialStore from "./initialStore";
import uniqueId from "./utils/uniqueId";
import { Home, Search, Create, Notification, Profile } from "./screens";
import { Header, NavBar } from "./components";

function App() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [store, setStore] = useState(initialStore);

  const switchScreen = (index) => {
    setScreenIndex(index);
  };

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
    // TODO:
    // 1. Create a new post object (use uniqueId('post') to create an id)
    const post = {
      userId: store.currentUserId,
      desc,
      photo: photo,
      datetime: new Date().toISOString(),
      id: uniqueId("post")
    };
    // 2. Update the store
    setStore({ ...store, posts: store.posts.concat(post) });
    // 3. Call setPage to come back to the home page
    setScreenIndex(0);
  };

  const cancelPost = () => {
    // TODO:
    // 1. Call setPage to come back to the home page (we will use Router to improve this)
    setScreenIndex(0);
  };

  const renderScreen = () => {
    switch (screenIndex) {
      case 0:
        return (
          <Home
            store={store}
            onLike={addLike}
            onUnlike={removeLike}
            onComment={addComment}
            currentUserId={store.currentUserId}
          />
        );
      case 1:
        return <Search />;
      case 2:
        return <Create onSubmit={addPost} onCancel={cancelPost} />;
      case 3:
        return <Notification />;
      case 4:
        return <Profile store={store} />;
      default:
        return <Home />;
    }
  };
  return (
    <div className="App">
      <Header />
      {renderScreen()}
      <NavBar switchScreen={switchScreen} />
    </div>
  );
}

export default App;
