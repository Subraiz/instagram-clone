import React, { useState } from "react";
import "./App.css";
import { Home, Search, Create, Notification, Profile } from "./screens";
import { Header, NavBar } from "./components";

function App() {
  const [screenIndex, toggleScreenIndex] = useState(0);

  const switchScreen = (index) => {
    toggleScreenIndex(index);
  };

  const renderScreen = () => {
    switch (screenIndex) {
      case 0:
        return <Home />;
      case 1:
        return <Search />;
      case 2:
        return <Create />;
      case 3:
        return <Notification />;
      case 4:
        return <Profile />;
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
