import fetch from 'isomorphic-fetch';

const { Promise } = require('es6-promise');

// const API_URL = 'http://chatapplication.demoappstore.com/';
export default (endpoint, method = 'get', headerToken, body) => fetch(`${endpoint}`, {
  headers: { 'content-type': 'application/json', 'authentication': headerToken },
  method,
  body: JSON.stringify(body),
})
  .then(response => 
    {
      if(response.ok) {
        return response._bodyText
      }
    }
  ).then(
    response => response,
    error => error
  )
