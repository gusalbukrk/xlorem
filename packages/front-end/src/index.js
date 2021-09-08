import React from 'react';
import ReactDOM from 'react-dom';

import './reset.css';
import './index.scss';

import Header from './components/Header.tsx';
import Subheader from './components/Subheader.js';

console.log('from index');

function App() {
  return (
    <>
      <Header />
      <Subheader>for JavaScript Development</Subheader>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
