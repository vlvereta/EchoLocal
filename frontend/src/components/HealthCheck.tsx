import { h } from "preact";
import { useState } from "preact/hooks";

const HealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState("");

  const checkHealth = () => {
    fetch(`${process.env.PREACT_APP_API_URL}/api/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        setHealthStatus(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setHealthStatus("Failed to get health status");
      });
  };

  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={checkHealth}>
        Check Backend Health
      </button>
      <div style={{ height: "2rem", lineHeight: "2rem" }}>{healthStatus}</div>
    </div>
  );
};

export default HealthCheck;
