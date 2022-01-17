import React from 'react';
import ReactDOM from 'react-dom';

import Form from './components/Form';

import './index.scss';

function App() {
  return (
    <>
      <h1>
        <span>x</span>lorem
      </h1>
      <Form />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
