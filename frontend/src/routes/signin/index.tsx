import { h } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { signin } from "../../api/signin";
import { SigninPayload } from "../../types/requests";
import { useAuth } from "../../components/AuthContext";

const SigninPage = () => {
  const { isAuthenticated, setToken } = useAuth();

  useEffect(() => {
    isAuthenticated && route("organizations", true);
  }, [isAuthenticated]);

  const [formData, setFormData] = useState<SigninPayload>({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { token } = await signin(formData);
      setToken(token);
      route("organizations");
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <main class="section is-medium">
      <form onSubmit={handleSubmit} class="container">
        <div class="field">
          <label htmlFor="email" class="label">
            Email
          </label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="alan.wake@email.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div class="field">
          <label htmlFor="password" class="label">
            Password
          </label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="********"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" class="button is-primary">
          Sign In
        </button>
      </form>
    </main>
  );
};

export default SigninPage;
