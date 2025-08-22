import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../shared/config/axiosinstance';
import './homepage.css';
import Button from '../Button/Button';

interface User {
  _id: string;
  username: string;
  createdAt: string;
}

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async (searchQuery = '') => {
    try {
      const res = await axiosInstance.get('/auth/users', {
        params: { search: searchQuery }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(search);
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">Nims</h1>
        <ul className="navlist">
          <li><a href="#">Home</a></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contacts</a></li>
          <Link to='/'><li><Button>Login</Button></li></Link>
          <Link to='/register'><li><Button>Register</Button></li></Link>
          <Link to='/profile' className='profbtn'><li>P</li></Link>
        </ul>
      </nav>

      <div className="main">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="users-list">
          {users.length > 0 ? (
            users.map(user => (
              <Link key={user._id} to={`/profile/${user._id}`} className="user-link">
                <div className="user-card">
                  <h3>{user.username}</h3>
                  <p>Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
