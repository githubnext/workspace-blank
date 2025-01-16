import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/api/user/activity', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setActivities(response.data);
      } catch (err) {
        setError('Failed to fetch user activities');
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="activity-feed-container">
      <h2>User Activity Feed</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <p>{activity.description}</p>
            <small>{new Date(activity.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserActivityFeed;
