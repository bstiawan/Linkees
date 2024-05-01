import { ItemType } from '../src/Linkees/ts';

interface IObjectKeys {
  [key: string]: ItemType[];
}

function fetchLinks(): Promise<IObjectKeys> {
  return fetch('https://raw.githubusercontent.com/bstiawan/Linkees/master/links.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parsing the JSON in the response
    })
    .then(data => {
      // console.log(data); // Handle the JSON data here
      return data; // Return the data for further processing
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      throw error; // Re-throw the error to handle it in the calling function
    });
}

export { fetchLinks };