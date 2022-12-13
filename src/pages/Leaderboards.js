import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';
import '../styles/Leaderboards.css';

function Leaderboards() {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboard-main-container">
      <h1>Klasmen Pengguna Aktif</h1>
      <header className="header-leaderboard">
        <p>Pengguna</p>
        <p>Skor</p>
      </header>
      <div className="leaderboard-container">
        {leaderboards.map((item) => <LeaderboardItem {...item} key={item.user.id} />)}
      </div>
    </div>
  );
}

export default Leaderboards;
