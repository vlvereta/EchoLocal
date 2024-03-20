import { h } from "preact";
import HealthCheck from "../../components/HealthCheck";

const Home = () => {
  return (
    <div>
      <h2>WORK IN PROGRESS</h2>
      <section style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
        <HealthCheck />
      </section>
    </div>
  );
};

export default Home;
