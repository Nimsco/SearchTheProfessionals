import { Link } from "react-router-dom";
import './usercard.css'

interface UserProps {
  _id: string;
  username: string;
  createdAt: string;
}

const UserCard = ({ _id, username, createdAt }: UserProps) => {
  return (
    <Link to={`/user/${_id}`} className="user-card">
      <h3>{username}</h3>
      <p>Joined on: {new Date(createdAt).toLocaleDateString()}</p>
    </Link>
  );
};

export default UserCard;
