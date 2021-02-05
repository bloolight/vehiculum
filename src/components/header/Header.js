import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import vehiculumLogo from '../../assets/images/vehiculum-logo.png';
import chevronDown from '../../assets/images/chevron-down.png';
import userIcon from '../../assets/images/user.png';
import menuIcon from '../../assets/images/menu.png';
import searchWhite from '../../assets/images/search-white.png';

export const Header = () => {
  const navItems = [
    {
      key: 'Funktioniert',
      name: "So Funktioniert's",
      toggle: false,
      url: '#',
    },
    {
      key: 'Sonderangebote',
      name: 'Sonderangebote',
      toggle: false,
      url: '#',
    },
    {
      key: 'MeinBereich',
      name: 'Mein Bereich',
      toggle: true,
      children: ['My published jokes', 'My saved jokes', 'Account Information', 'Publish new joke'],
    },
  ];
  const history = useHistory();
  const jokeList = useSelector((state) => state.joke.list);
  const [collapse, setCollapse] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [jokes, setJokes] = useState([]);

  const collapseSidebar = (show) => {
    setToggleSidebar(show);
    document.querySelector('body').style.overflow = (show ? 'hidden' : 'auto');
    setCollapse(false);
  };

  const collapseMenu = () => {
    setCollapse(!collapse);
  };

  const clearSearch = () => {
    setKeyword('');
    document.querySelector('.search-input').blur();
  };

  useEffect(() => {
    if (!keyword) {
      setJokes([]);
      return;
    }

    const search = keyword.toLowerCase();
    const filteredJokes = jokeList.filter((joke) =>  joke.value.toLowerCase().indexOf(search) !== -1);

    setJokes(filteredJokes);
    if (filteredJokes.length === 1) {
      window.setTimeout(() => {
        history.push(`/joke/${filteredJokes[0].id}`);
        clearSearch();
      }, 1000);
    }
  }, [keyword]);

  return (
    <>
      <div className={`app-header ${toggleSidebar ? 'open-sidebar' : ''}`}>
        <div className="container d-flex justify-content-between h-100">
          <div className="logo h-100">
            <Link to="/" title="Vehiculum">
              <img src={vehiculumLogo} className="logo-img" alt="Logo" />
            </Link>
          </div>
          <div className="top-navbar h-100">
            <ul>
              {navItems.map((item) => (
                  item.toggle
                      ? (
                          <div className="toggle-menu" key={item.key}>
                            <li className="hover-menu">
                              <img src={userIcon} alt="menu-icon" className="menu-icon" />
                              {item.name}
                              <img src={chevronDown} alt="arrow-icon" className="arrow-icon" />
                            </li>
                            <div className="collapsed-menu-container">
                              <div className="collapsed-menu">
                                {item.children.map((child, index) => (
                                    <p key={index}>{child}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                      )
                      : <li key={item.key}>{item.name}</li>
              ))}
            </ul>
          </div>
          <div className="mobile-menu-icon">
            <img src={menuIcon} className="menu-icon" alt="Menu Icon" onClick={() => collapseSidebar(true)} />
          </div>
        </div>
        <div className="sidebar">
          <img src={vehiculumLogo} className="logo-img" alt="Logo" />
          <div className="sidebar-menus">
            {navItems.map((item) => (
              item.toggle
                ? (
                  <div className={`toggle-menu ${collapse ? 'collapsed' : ''}`} key={item.key}>
                    <p className="menu-item" onClick={() => collapseMenu()}>
                      {item.name}
                      <img src={chevronDown} alt="arrow-icon" className="arrow-icon" />
                    </p>
                    <div className="collapsed-menu-container">
                      <div className="collapsed-menu">
                        {item.children.map((child, index) => (
                          <p key={index} className="menu-item">{child}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )
                : <p key={item.key} className="menu-item">{item.name}</p>
            ))}
          </div>
        </div>
        <div className="backdrop" onClick={() => collapseSidebar(false)} />
      </div>
      <div className="page-banner">
        <h1>The Joke Bible</h1>
      <p className="banner-lead">Daily Laughs for you and yours</p>
      <div className="banner-search">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="How can we make you laugh today?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <img src={searchWhite} alt="Search" className="search-icon" />
        </div>
        <div className={`search-result ${jokes.length > 0 ? 'show' : ''}`}>
          {jokes.map((joke) => (
            joke.categories.length > 0
              ? (
              <Link
                to={`/joke/${joke.id}`}
                key={joke.id}
                className="list-item"
                onClick={clearSearch}
              >
                {`${joke.categories.join(', ')} Jokes: Joke Title`}
              </Link>
            ) : (
                <Link
                  to={`/joke/${joke.id}`}
                  key={joke.id}
                  className="list-item"
                  onClick={clearSearch}
                >
                  {`UnCategorized Jokes: Joke Title`}
                </Link>
              )
          ))}
        </div>
      </div>
    </div>
  </>
  );
};
