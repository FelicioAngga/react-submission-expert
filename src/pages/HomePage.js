import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';
import { asyncReceiveThreads } from '../states/threads/action';
import ThreadItem from '../components/ThreadItem';
import { getRandomPastelColor } from '../utils/pastelColor';
import '../styles/HomePage.css';
import { setCategoryAction } from '../states/category/action';

function HomePage() {
  const dispatch = useDispatch();
  const {
    threads, categories, authUser,
  } = useSelector((states) => states);

  function filterByCategory(category) {
    if (categories.selectedCategory === category) {
      dispatch(setCategoryAction(null));
    } else dispatch(setCategoryAction(category));
  }

  useEffect(() => {
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  return (
    <div className="homepage-container">
      <div className="category-container">
        {categories && categories.values.map((category) => <button onClick={() => filterByCategory(category)} className="category-home" key={category} style={{ backgroundColor: getRandomPastelColor() }} type="button">{`#${category}`}</button>)}
      </div>
      <h2>Diskusi tersedia</h2>
      <div className="discussion">
        { threads.map((thread) => {
          if (categories.selectedCategory && thread.category !== categories.selectedCategory) {
            return null;
          }
          return <ThreadItem {...thread} key={thread.id} detail={false} />;
        })}
      </div>
      { authUser
        && (
          <Link to="/add-thread">
            <button type="button" className="add-thread">
              <MdAddCircle />
            </button>
          </Link>
        )}
    </div>
  );
}

export default HomePage;
