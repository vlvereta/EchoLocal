import { h } from "preact";
import { Route, Router } from "preact-router";

import Header from "./Header";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthContextProvider } from "./AuthContext";

import Home from "../routes/home";
import Profile from "../routes/profile";
import SignupPage from "../routes/signup";
import SigninPage from "../routes/signin";
import Dashboard from "../routes/dashboard";
import Organizations from "../routes/organizations";
import CreateOrganization from "../routes/create-organization";

const App = () => {
  return (
    <AuthContextProvider>
      <Header />
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
    </AuthContextProvider>
  );
};

export default App;
