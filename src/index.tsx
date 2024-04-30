import React from 'react';
import ReactDOM from 'react-dom';
import { Linkees } from './Linkees/index';
import { LINKS } from './links';

import './css/normalize.css';

const path = window.location.pathname;

function camelToReadable(str: string) {
  return str
    .slice(1)
    .replace(/([A-Z])/g, ' $1')
    .trim();
}

const name = camelToReadable(path);
let items = LINKS[name].concat(LINKS['default']);

ReactDOM.render(
  <React.StrictMode>
    <Linkees
      cardItems={items}
      name={name}
      headerAvatar="https://s3.us-east-2.amazonaws.com/www.stiawan.com/files/IMG_1212t.png"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
