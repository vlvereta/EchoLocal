import { h } from "preact";
import { Link } from "preact-router/match";
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
      <Link activeClassName={style.active} href="/profile">
        Me
      </Link>
    </nav>
  </header>
);

export default Header;
