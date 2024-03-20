import { h } from "preact";
import { Route, Router } from "preact-router";

import Header from "./header";

// Code-splitting is automated for `routes` directory
import Home from "../routes/home";
import Profile from "../routes/profile";

const BackgroundImage = () => (
  <i
    class="bi bi-globe"
    style={{
      top: "5%",
      zIndex: 0,
      color: "#f1f1f1",
      fontSize: "80vw",
      position: "absolute",
    }}
  />
);

const App = () => (
  <div id="app">
    <Header />
    <main>
      {/* <BackgroundImage /> */}
      <Router>
        <Route path="/" component={Home} />
        <Route path="/profile/" component={Profile} user="me" />
      </Router>
    </main>
  </div>
);

export default App;
