import { h } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { signup } from "../../api/users";
import { SignupPayload } from "../../types/requests";
import { useAuth } from "../../components/AuthContext";

const SignupPage = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    isAuthenticated && route("organizations", true);
  }, [isAuthenticated]);

  const [formData, setFormData] = useState<SignupPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      await signup(formData);
      route("/signin");
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <main class="section is-medium">
      <div class="columns is-centered">
        <form onSubmit={handleSubmit} class="box column is-half">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Alan"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Wake"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
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
          <div class="field">
            <label htmlFor="confirmPassword" class="label">
              Confirm Password
            </label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="********"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" class="button is-primary">
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
