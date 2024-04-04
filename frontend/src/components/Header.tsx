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
    <header
      role="navigation"
      aria-label="main navigation"
      class="navbar has-shadow is-dark"
    >
      <div class="navbar-brand">
        <Link class="navbar-item" href="/">
          <i class="bi bi-globe mr-2 is-align-content-center" />
          <h1 class="is-size-4">EchoLocal</h1>
        </Link>

        <Link
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
        </Link>
      </div>

      <div
        id="main-navigation"
        class={`navbar-menu${isMenuOpen ? " is-active" : ""}`}
      >
        {isAuthenticated && (
          <nav class="navbar-start">
            <Link class="navbar-item" href="/organizations">
              Organizations
            </Link>
            <Link class="navbar-item" href="/profile">
              Profile
            </Link>
          </nav>
        )}

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              {isAuthenticated ? (
                <button class="button is-light" onClick={handleSignOut}>
                  Sign out
                </button>
              ) : (
                <>
                  <Link class="button is-light" href="/signin">
                    Sign in
                  </Link>
                  <Link class="button is-light" href="/signup">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
