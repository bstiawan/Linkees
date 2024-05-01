import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Linkees } from './Linkees/index';
import { fetchLinks } from './links';  // Assume fetchLinks is exported from './links'
import { ItemType } from '../src/Linkees/ts';

import './css/normalize.css';

const App = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const path = window.location.pathname;

  function camelToReadable(str: string) {
    return str
      .slice(1)
      .replace(/([A-Z])/g, ' $1')
      .trim();
  }

  const name = camelToReadable(path);

  useEffect(() => {
    fetchLinks()
      .then(links => {
        if (links[name]) {
          setItems(links[name].concat(links['default']));
        } else {
          setItems(links['default']);
        }
      })
      .catch(err => {
        console.error('Failed to fetch links:', err);
        setError(err.toString());
      })
      // Timeout 5 seconds
      // .then(() => new Promise(resolve => setTimeout(resolve, 5000)))
      .finally(() => setLoading(false));
  }, [name]);

  const loadingItem = [{
    title: 'Loading...',
    subtitle: 'Please wait.',
    link: '',
    type: 'LOADING',
  }];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <React.StrictMode>
      <Linkees
        cardItems={loading ? loadingItem : items}
        name={name}
        headerAvatar="https://s3.us-east-2.amazonaws.com/www.stiawan.com/files/IMG_1212t.png"
      />
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
