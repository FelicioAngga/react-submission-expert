import React from 'react';
import PropTypes from 'prop-types';
import '../styles/LeaderboardItem.css';

function LeaderboardItem({ user, score }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item-user-info">
        <img src={user.avatar} alt="" />
        <p>{user.name}</p>
      </div>
      <p>{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
