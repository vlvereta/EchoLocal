import { h, Fragment } from "preact";
import { Link } from "preact-router/match";

import { LocalStorageItem } from "../../types";

import style from "./style.css";

const Header = () => (
  <header class={style.header}>
    <a href="/" class={style.logo}>
      <i class="bi bi-globe" />
      <h1>EchoLocal</h1>
    </a>
    <nav>
      <Link activeClassName={style.active} href="/">
        Home
      </Link>
      {localStorage.getItem(LocalStorageItem.Token) ? (
        <>
          <Link activeClassName={style.active} href="/profile">
            Me
          </Link>
          <Link
            as="button"
            onClick={() => localStorage.removeItem(LocalStorageItem.Token)}
          >
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

export default Header;
