import { useState, useEffect } from "react";

const GetUsers = () => {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setUsers([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="get-users">
      <h1>Users:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default GetUsers;
