import { h } from "preact";

import HealthCheck from "../../components/HealthCheck";
import FetchUsersButton from "../../components/FetchUsersButton";

const Home = () => {
  return (
    <div>
      <h2>WORK IN PROGRESS</h2>
      <section
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        <HealthCheck />
        <FetchUsersButton />
      </section>
    </div>
  );
};

export default Home;
