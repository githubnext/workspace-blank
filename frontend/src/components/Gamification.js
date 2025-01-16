import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gamification() {
  const [badges, setBadges] = useState([]);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGamificationData = async () => {
      try {
        const response = await axios.get('/api/gamification', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBadges(response.data.badges);
        setPoints(response.data.points);
      } catch (err) {
        setError('Failed to fetch gamification data');
      }
    };

    fetchGamificationData();
  }, []);

  return (
    <div className="gamification-container">
      <h2>Gamification</h2>
      {error && <p className="error">{error}</p>}
      <div className="points-section">
        <h3>Points</h3>
        <p>{points}</p>
      </div>
      <div className="badges-section">
        <h3>Badges</h3>
        <ul>
          {badges.map((badge) => (
            <li key={badge.id}>
              <img src={badge.imageUrl} alt={badge.name} />
              <p>{badge.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Gamification;
