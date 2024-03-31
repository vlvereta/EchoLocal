import { h, Fragment } from "preact";
import { route } from "preact-router";
import { useState } from "preact/hooks";
import { Link } from "preact-router/match";

import { useAuth } from "./AuthContext";

const Header = () => {
  const { isAuthenticated, clearToken } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSignOut = (event: MouseEvent) => {
    event.stopPropagation();

    clearToken();
    route("/");
  };

  return (
    <nav
      role="navigation"
      aria-label="main navigation"
      class="navbar has-shadow is-dark"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <i class="bi bi-globe mr-2 is-align-content-center" />
          <h1 class="is-size-4">EchoLocal</h1>
        </a>

        <a
          role="button"
          aria-label="menu"
          aria-expanded="false"
          data-target="main-navigation"
          class={`navbar-burger${isMenuOpen ? " is-active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="main-navigation"
        class={`navbar-menu${isMenuOpen ? " is-active" : ""}`}
      >
        {isAuthenticated && (
          <div class="navbar-start">
            <Link class="navbar-item" href="/organizations">
              Organizations
            </Link>
            {/* <Link class="navbar-item" href="/dashboard">
              Dashboard
            </Link> */}
            <Link class="navbar-item" href="/profile">
              Profile
            </Link>
          </div>
        )}

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              {isAuthenticated ? (
                <Link class="button is-primary" onClick={handleSignOut}>
                  Sign out
                </Link>
              ) : (
                <>
                  <Link class="button is-light" href="/signin">
                    Sign in
                  </Link>
                  <Link class="button is-primary" href="/signup">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
