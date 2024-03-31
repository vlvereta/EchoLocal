import { h } from "preact";
import { useState } from "preact/hooks";

import { apiURL } from "..";

const HealthCheck = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [healthStatus, setHealthStatus] = useState<string>("");

  const checkHealth = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiURL}/health`);
      const status = await response.text();
      setHealthStatus(status);
    } catch (error) {
      console.error("Error during healthcheck:", error);
      setHealthStatus("Backend is UNHEALTHY!");
    }

    setIsLoading(false);
  };

  return (
    <div class="is-flex is-flex-direction-column is-align-items-center">
      <button
        onClick={checkHealth}
        class={`button is-primary${isLoading ? " is-loading" : ""}`}
      >
        Check Backend Health
      </button>
      <div style={{ height: "2rem", lineHeight: "2rem" }}>{healthStatus}</div>
    </div>
  );
};

export default HealthCheck;
