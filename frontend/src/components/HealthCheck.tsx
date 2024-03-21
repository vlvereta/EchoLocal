import { h } from "preact";
import { useState } from "preact/hooks";

const HealthCheck = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [healthStatus, setHealthStatus] = useState("");

  const checkHealth = () => {
    setIsLoading(true);

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

      setIsLoading(false);
  };

  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={checkHealth} disabled={isLoading}>
        {isLoading ? (
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        ) : (
          <span>Check Backend Health</span>
        )}
      </button>
      <div style={{ height: "2rem", lineHeight: "2rem" }}>{healthStatus}</div>
    </div>
  );
};

export default HealthCheck;
