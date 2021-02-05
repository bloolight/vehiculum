import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import back from '../assets/images/back.png';
import next from '../assets/images/next.png';
import like from '../assets/images/like.png';
import dislike from '../assets/images/dislike.png';

const topJokes = [
  {
    id: 1,
    title: 'Smoking Joke',
  },
  {
    id: 2,
    title: 'My Boss Joke',
  },
  {
    id: 3,
    title: 'Dirty Millionaire Joke',
  },
  {
    id: 4,
    title: 'The annoying neighbour',
  },
  {
    id: 5,
    title: 'Knock Knock',
  },
  {
    id: 6,
    title: 'Why Tyson lisps',
  },
  {
    id: 7,
    title: 'The drunk Police officer',
  },
  {
    id: 8,
    title: 'My hip dad (Dad joke)',
  },
  {
    id: 9,
    title: 'What not to say in an elevator',
  },
];

const JokeDetail = ({ match }) => {
  const jokeList = useSelector((state) => state.joke.list);
  const jokeCategories = useSelector((state) => state.joke.categories);
  const [joke, setJoke] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const id = match.params.id;
    if (!jokeList.length)
      return;
    const currentJoke = jokeList.find((joke) => joke.id === id);
    setJoke(currentJoke || null);
  }, [jokeList, match]);

  const goBack = () => {
    history.push('/');
  };

  const getLikeLabel = (like, dislike) => {
    if (dislike > like) {
      return (
        <p className="like-label chestnut">
          • chestnut
        </p>
      );
    } if (like > 0 && like < 50) {
      return (
        <p className="like-label new-town">
          • new in town
        </p>
      );
    } if (like > 51 && like < 100) {
      return (
        <p className="like-label trending">
          • trending
        </p>
      );
    } if (like > 101) {
      return (
        <p className="like-label hall-fame">
          • hall of fame
        </p>
      );
    }

    return (
      <p className="like-label hall-fame">
        • hall of fame
      </p>
    );
  };

  const getCategoryColor = (categoryName) => {
    const category = jokeCategories.find((jc) => jc.name === categoryName);
    return category ? category.color : '#000';
  };

  const gotoNextJoke = (id, offset) => {
    let index = jokeList.findIndex((joke) => joke.id === id);
    index = (index + offset + jokeList.length) % jokeList.length;
    const nextJokeId = jokeList[index].id;
    history.push('/joke/' + nextJokeId);
  };

  const prevJoke = (id) => {
    gotoNextJoke(id, -1);
  };

  const nextJoke = (id) => {
    gotoNextJoke(id, 1);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <button className="back-button" onClick={() => goBack()}>
              <img src={back} alt="Back" className="back-icon" />
            </button>
          </div>
        </div>
        <div className="row joke-detail">
          <div className="col-md-8 d-flex flex-column justify-content-between">
              {joke !== undefined && joke !== null && (
                <>
                  <div className="joke-card">
                    <div className="joke-header justify-content-between">
                      {joke.categories.length === 0 && (
                        <p className="badge uncategorized-badge">Un_Categorized</p>
                      )}
                      {joke.categories.length !== 0 && joke.categories.map((category) => (
                          <p className={`badge ${category}-badge`} key={category} style={{backgroundColor: getCategoryColor(category)}}>
                            {`• ${category} Jokes`}
                          </p>
                      ))}
                      {getLikeLabel(joke.like, joke.dislike)}
                    </div>
                    <div className="card-content">
                      <div className="title-content d-flex justify-content-between">
                        <p className="title">Joke Title</p>
                        <p className="number">NO #1</p>
                      </div>
                      <p className="description">{joke.value}</p>
                    </div>
                  </div>
                  <div className="option-content">
                    <div className="like-group">
                      <div className="like counter">
                        <div className="circle">
                          <img src={like} alt="Like" className="hand-icon" />
                        </div>
                        <span>65</span>
                      </div>
                      <div className="dislike counter">
                        <div className="circle">
                          <img src={dislike} alt="Dislike" className="hand-icon" />
                        </div>
                        <span>65</span>
                      </div>
                    </div>
                    <div className="pagination-group">
                      <button className="prev-button" onClick={() => prevJoke(joke.id)}>
                        <img src={back} alt="Prev Icon" />
                          Prev Joke
                      </button>
                      <button className="next-button" onClick={() => nextJoke(joke.id)}>
                        Next Joke
                        <img src={next} alt="Next Icon" />
                      </button>
                    </div>
                  </div>
                </>
              )}
          </div>
          <div className="col-md-4">
            <div className="week-card">
              <h3>The Top 10 Jokes This Week</h3>
              {topJokes.map((joke) => (
                <p className="title-list" key={joke.id}>{joke.title}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

JokeDetail.propTypes = {
  match: PropTypes.any.isRequired,
};

export default JokeDetail;
