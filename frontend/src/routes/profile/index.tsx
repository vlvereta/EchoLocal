import { h } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { LocalStorageItem } from "../../types";

interface Props {
  user: string;
}

// Note: `user` comes from the URL, courtesy of our router
const Profile = ({ user }: Props) => {
  const [time, setTime] = useState<number>(Date.now());
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    if (!localStorage.getItem(LocalStorageItem.Token)) route("/signin", true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>Profile: {user}</h1>
      <p>This is the user profile for a user named {user}.</p>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <button onClick={() => setCount((count) => count + 1)}>Click Me</button>{" "}
        Clicked {count} times.
      </p>
    </div>
  );
};

export default Profile;
