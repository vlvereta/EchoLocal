import { h } from "preact";
import { useEffect } from "preact/hooks";
import { Route, route } from "preact-router";

import { useAuth } from "./AuthContext";

export const ProtectedRoute = (props) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      route("/signin", true);
    }
  }, [isAuthenticated]);

  return <Route {...props} />;
};
