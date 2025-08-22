
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../shared/config/axiosinstance';
import './profile.css';

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  education?: string;
  degree?: string;
  hobbies?: string[];
  currentWorkplace?: string;
}

function Profile() {
  const params = useParams<{ userId?: string }>();
  const navigate = useNavigate();

  const currentUser = useMemo(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  const userId = params.userId || currentUser?._id;

  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    education: '',
    degree: '',
    hobbies: '',
    currentWorkplace: ''
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;

        if (userId === currentUser?._id) {
          // Load from localStorage user
          setUser(currentUser);
          setFormData({
            education: currentUser.education || '',
            degree: currentUser.degree || '',
            hobbies: currentUser.hobbies?.join(', ') || '',
            currentWorkplace: currentUser.currentWorkplace || ''
          });
        } else {
          // Load another user's profile
          const res = await axiosInstance.get(`/auth/users/${userId}`);
          setUser(res.data);
          setFormData({
            education: res.data.education || '',
            degree: res.data.degree || '',
            hobbies: res.data.hobbies?.join(', ') || '',
            currentWorkplace: res.data.currentWorkplace || ''
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userId, currentUser]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.put('/auth/me', {
        ...formData,
        hobbies: formData.hobbies.split(',').map(h => h.trim())
      });
      setUser(res.data);
      setEditMode(false);
      localStorage.setItem('currentUser', JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return <p>Loading...</p>;

  const isCurrentUser = user._id === currentUser?._id;

  return (
    <div className="profile-container">
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email || '-'}</p>
      <p>Joined on: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>

      <div className="profile-details">
        {editMode ? (
          <>
            <input
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
            />
            <input
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
            />
            <input
              name="currentWorkplace"
              placeholder="Current Workplace"
              value={formData.currentWorkplace}
              onChange={handleChange}
            />
            <textarea
              name="hobbies"
              placeholder="Hobbies (comma separated)"
              value={formData.hobbies}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>Education: {user.education || '-'}</p>
            <p>Degree: {user.degree || '-'}</p>
            <p>Current Workplace: {user.currentWorkplace || '-'}</p>
            <p>Hobbies: {user.hobbies?.join(', ') || '-'}</p>
            {isCurrentUser && (
              <>
                <button onClick={() => setEditMode(true)}>Edit Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
