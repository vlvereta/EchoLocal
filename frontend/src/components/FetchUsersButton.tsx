import { h } from "preact";
import { useState } from "preact/hooks";
import { useAuth } from "./AuthContext";

const FetchUsersButton = () => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.PREACT_APP_API_URL}/api/users`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        onClick={fetchUsers}
        disabled={isLoading}
      >
        {isLoading ? (
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <span>TEST Users</span>
        )}
      </button>
      <ul style={{ minHeight: "2rem" }}>
        {users.map((user) => (
          <li key={user.id} style={{ lineHeight: "2rem" }}>
            {user.first_name} {user.last_name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchUsersButton;
