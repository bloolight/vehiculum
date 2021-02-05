import React, {useState, useMemo} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import greenLight from '../assets/images/green-light.png';
import arrowDown from '../assets/images/arrow-down.png';
import arrowRight from '../assets/images/arrow-right.png';
import {act} from "@testing-library/react";

const UN_CATEGORIZED = {
  name: 'UN_CATEGORIZED',
  color: '#6c757d',
};

const ALL_CATEGORIES = {
  name: 'All',
  color: '#d1bb91',
};

export default () => {
  const jokeList = useSelector((state) => state.joke.list);
  const jokeCategories = useSelector((state) => state.joke.categories);

  const [activeCategory, setActiveCategory] = useState('');
  const [displayCount, setDisplayCount] = useState(12);

  const filteredJokes = useMemo(() => {
    if (!activeCategory || activeCategory.name === ALL_CATEGORIES.name)
      return jokeList;
    if (activeCategory.name === UN_CATEGORIZED.name)
      return jokeList.filter((joke) => !joke.categories.length);
    return jokeList.filter((joke) => joke.categories.indexOf(activeCategory.name) !== -1);
  }, [jokeList, activeCategory]);

  const onSelectCategory = (category) => {
    setActiveCategory(category);
    setDisplayCount(12);
  };

  const onViewMore = () => {
    setDisplayCount(displayCount + 12);
  };

  return (
    <>
      <div className="container">
        <div className="filter-section">
          {jokeCategories.map((category, index) => (
            <div className="filter-col" key={category.name}>
              <button
                className={`${activeCategory.name === category.name ? 'active' : ''} filter-button`}
                style={{backgroundColor: category.color}}
                onClick={() => onSelectCategory(category)}
              >
                {category.name}
              </button>
            </div>
          ))}
          <div className="filter-col">
            <button
              className={`${activeCategory.name === UN_CATEGORIZED.name ? 'active' : ''} filter-button`}
              onClick={() => onSelectCategory(UN_CATEGORIZED)}
              style={{backgroundColor: UN_CATEGORIZED.color}}
            >
              Uncategorized
            </button>
          </div>
          <div className="filter-col">
            <button className="filter-button view-all" onClick={() => onSelectCategory(ALL_CATEGORIES)}>
              View All
              <img src={arrowDown} className="view-all-icon" alt="View All" />
            </button>
          </div>
        </div>
        <div className="filter-result">
          {activeCategory
            ? (
              <span className="filter-badge" style={{ backgroundColor: activeCategory.color }}>
                {activeCategory.name}
              </span>
            )
            : (<span className="filter-badge">All</span>)}
          <div className="row">
            {filteredJokes.length > 0
              ? (
                <>
                  {filteredJokes.slice(0, displayCount).map((joke, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="joke-card">
                        <p className="card-title">
                          <img src={greenLight} alt="Card Icon" className="card-icon" />
                          Joke Title
                        </p>
                        <p className="card-info">{joke.value}</p>
                        <Link to={`/joke/${joke.id}`} className="see-stats">
                          See Stats
                          <img src={arrowRight} alt="Stats Icon" className="stats-icon" />
                        </Link>
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
            <button className="view-more" disabled={displayCount >= filteredJokes.length} onClick={onViewMore}>
              View More
              <img src={arrowDown} className="view-all-icon" alt="View All" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
