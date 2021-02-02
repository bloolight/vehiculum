import React from 'react';

import vehiculumLogo from '../../assets/images/vehiculum-logo.png';
import chevronDown from '../../assets/images/chevron-down.png';
import userIcon from '../../assets/images/user.png';

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

  return (
      <div className="app-header">
        <div className="container d-flex justify-content-between h-100">
          <div className="logo h-100">
            <img src={vehiculumLogo} className="logo-img" alt="Logo" />
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
        </div>
      </div>
  );
};
