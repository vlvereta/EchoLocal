import { h } from "preact";

import HealthCheck from "../../components/HealthCheck";

const Home = () => {
  return (
    <main class="section is-medium">
      <div class="is-flex-direction-column">
        <h2 class="has-text-centered has-text-weight-bold is-size-3">
          WORK IN PROGRESS
        </h2>
        <progress class="progress is-small is-dark" max="100">50%</progress>
        <HealthCheck />
      </div>
    </main>
  );
};

export default Home;
