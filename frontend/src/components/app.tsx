import { h } from "preact";
import { Route, Router } from "preact-router";

import Header from "./Header";

import Home from "../routes/home";
import Profile from "../routes/profile";
import Organizations from "../routes/organizations";
import SignupPage from "../routes/signup";
import SigninPage from "../routes/signin";
import Dashboard from "../routes/dashboard";
import CreateOrganization from "../routes/create-organization";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthContextProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <div id="app">
        <Header />
        <main>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <ProtectedRoute path="/organizations" component={Organizations} />
            <ProtectedRoute path="/profile" component={Profile} user="me" />
            <ProtectedRoute
              path="/create-organization"
              component={CreateOrganization}
            />
            <ProtectedRoute
              path="/dashboard/:organizationId/:projectId?"
              component={Dashboard}
            />
          </Router>
        </main>
      </div>
    </AuthContextProvider>
  );
};

export default App;
