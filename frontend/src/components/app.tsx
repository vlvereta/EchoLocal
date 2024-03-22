import { h } from "preact";
import { Route, Router } from "preact-router";

import Header from "./header";

// Code-splitting is automated for `routes` directory
import Home from "../routes/home";
import Profile from "../routes/profile";
import Dashboard from "../routes/dashboard";
import SignupPage from "../routes/signup";
import SigninPage from "../routes/signin";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthContextProvider } from "./AuthContext";

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

const App = () => {
  return (
    <AuthContextProvider>
      <div id="app">
        <Header />
        <main>
          {/* <BackgroundImage /> */}
          <Router>
            <Route path="/" component={Home} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/profile" component={Profile} user="me" />
          </Router>
        </main>
      </div>
    </AuthContextProvider>
  );
};

export default App;
