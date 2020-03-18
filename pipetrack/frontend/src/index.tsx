import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

// @ts-ignore
const id = window.lastReactRootID;

ReactDOM.render(<App />, document.getElementById(id));
