import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initJokeList } from '../store/reducers/joke';

import greenLight from '../assets/images/green-light.png';
import searchWhite from '../assets/images/search-white.png';
import arrowDown from '../assets/images/arrow-down.png';
import arrowRight from '../assets/images/arrow-right.png';

export default () => {

  const dispatch = useDispatch();
  const jokeList = useSelector((state) => state.joke.list);
  const jokeCategories = useSelector((state) => state.joke.categories);

  const filterButtons = [
    {
      key: 'adult',
      name: 'adult jokes',
      color: '#ff5b5b',
    },
    {
      key: 'dad',
      name: 'dad jokes',
      color: '#ff915b',
    },
    {
      key: 'christmas',
      name: 'christmas jokes',
      color: '#ffbe5b',
    },
    {
      key: 'job',
      name: 'job jokes',
      color: '#ffdf5b',
    },
    {
      key: 'birthday',
      name: 'birthday jokes',
      color: '#8fe360',
    },
    {
      key: 'social',
      name: 'social jokes',
      color: '#57e690',
    },
    {
      key: 'puns',
      name: 'puns',
      color: '#57dbe6',
    },
  ];
  const totalJokes = [
    {
      name: 'lawyer joke',
      info: `A lawyer dies and goes to Heaven. "There must be some mistake," the lawyer argues. "I'm too young to die. I'm only 55." "Fifty-five?" says Saint Peter. "No, according to out calculations, you're 82." "How'd you get that?" the lawyer asks. Answers St. Peter, "We added up your time sheets."`,
      filter: 'social',
    },
    {
      name: 'doctor joke',
      info: `A lawyer dies and goes to Heaven. "There must be some mistake," the lawyer argues. "I'm too young to die. I'm only 55." "Fifty-five?" says Saint Peter. "No, according to out calculations, you're 82." "How'd you get that?" the lawyer asks. Answers St.Peter, "We added up your time sheets."`,
      filter: 'social',
    },
    {
      name: 'business joke',
      info: `A lawyer dies and goes to Heaven. "There must be some mistake," the lawyer argues. "I'm too young to die. I'm only 55." "Fifty-five?" says Saint Peter. "No, according to out calculations, you're 82." "How'd you get that?" the lawyer asks. Answers St.Peter, "We added up your time sheets."`,
      filter: 'social',
    },
    {
      name: 'police joke',
      info: `A lawyer dies and goes to Heaven. "There must be some mistake," the lawyer argues. "I'm too young to die. I'm only 55." "Fifty-five?" says Saint Peter. "No, according to out calculations, you're 82." "How'd you get that?" the lawyer asks. Answers St.Peter, "We added up your time sheets."`,
      filter: 'social',
    },
    {
      name: 'doctor joke',
      info: `A lawyer dies and goes to Heaven. "There must be some mistake," the lawyer argues. "I'm too young to die. I'm only 55." "Fifty-five?" says Saint Peter. "No, according to out calculations, you're 82." "How'd you get that?" the lawyer asks. Answers St.Peter, "We added up your time sheets."`,
      filter: 'social',
    },
    {
      name: 'boss joke',
      info: `A lawyer dies and goes to Heaven. "There must be some mistake," the lawyer argues. "I'm too young to die. I'm only 55." "Fifty-five?" says Saint Peter. "No, according to out calculations, you're 82." "How'd you get that?" the lawyer asks. Answers St.Peter, "We added up your time sheets."`,
      filter: 'social',
    },
  ];
  const [activeFilter, setActiveFilter] = useState('');
  const [jokes, setJokes] = useState(totalJokes);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setJokes(totalJokes.filter((joke) => joke.filter === filter.key));
  };

  const clearFilter = () => {
    setActiveFilter('');
    setJokes(totalJokes);
  };

  useEffect(() => {
    dispatch(initJokeList());
  }, []);

  return (
    <>
      <div className="page-banner">
        <h1>The Joke Bible</h1>
        <p className="banner-lead">Daily Laughs for you and yours</p>
        <div className="banner-search">
          <input type="text" className="search-input" placeholder="How can we make you laugh today?" />
          <img src={searchWhite} alt="Search" className="search-icon" />
        </div>
      </div>
      <div className="container">
        <div className="filter-section">
          {filterButtons.map((button) => (
            <button
              className={`${activeFilter.name === button.name ? 'active' : ''} filter-button`}
              key={button.key}
              style={{ backgroundColor: button.color }}
              onClick={() => handleFilter(button)}
            >
              {button.name}
            </button>
          ))}
          <button className="filter-button view-all" onClick={() => clearFilter()}>
            View All
            <img src={arrowDown} className="view-all-icon" alt="View All" />
          </button>
        </div>
        <div className="filter-result">
          {activeFilter
            ? (
              <span className="filter-badge" style={{ backgroundColor: activeFilter.color }}>
                {activeFilter.name}
              </span>
            )
            : (<span className="filter-badge">All</span>)}
          <div className="row">
            {jokeList.length > 0
              ? (
                <>
                  {jokeList.map((joke, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="joke-card">
                        <p className="card-title">
                          <img src={greenLight} alt="Card Icon" className="card-icon" />
                          Joke Title
                        </p>
                        <p className="card-info">{joke.value}</p>
                        <p className="see-stats">
                          See Stats
                          <img src={arrowRight} alt="Stats Icon" className="stats-icon" />
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )
              : (
                <p>No Jokes</p>
              )}
          </div>
          <div className="d-flex justify-content-center">
            <button className="view-more">
              View More
              <img src={arrowDown} className="view-all-icon" alt="View All" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
