import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../shared/config/axiosinstance";

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/auth/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="user-details">
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserDetails;
