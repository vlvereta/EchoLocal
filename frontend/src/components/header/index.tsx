import { h, Fragment } from "preact";
import { route } from "preact-router";
import { Link } from "preact-router/match";

import { useAuth } from "../AuthContext";

import style from "./style.css";

const Header = () => {
  const { isAuthenticated, clearToken } = useAuth();

  const handleSignOut = (e: MouseEvent) => {
    e.stopPropagation();

    clearToken();
    route("/");
  };

  return (
    <header class={style.header}>
      <a href="/" class={style.logo}>
        <i class="bi bi-globe" />
        <h1>EchoLocal</h1>
      </a>
      <nav>
        {isAuthenticated ? (
          <>
            <Link activeClassName={style.active} href="/onboarding">
              Onboarding
            </Link>
            <Link activeClassName={style.active} href="/profile">
              Profile
            </Link>
            <Link as="button" onClick={handleSignOut}>
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link activeClassName={style.active} href="/signin">
              Sign in
            </Link>
            <Link activeClassName={style.active} href="/signup">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
