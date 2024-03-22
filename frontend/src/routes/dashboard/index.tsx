import { h } from "preact";

import FetchUsersButton from "../../components/FetchUsersButton";

const Dashboard = () => {
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
        <FetchUsersButton />
      </section>
    </div>
  );
};

export default Dashboard;
