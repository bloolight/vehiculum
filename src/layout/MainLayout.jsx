import React from 'react';

import { Header } from '../components/header';
import { Footer } from '../components/footer';

const MainLayout = props => (
  <div className="App">
    <Header />
    <div className="App-body">
      {props.children}
    </div>
    <Footer />
  </div>
);

export default MainLayout;