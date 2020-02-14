import fetch from 'isomorphic-fetch';
const { Promise } = require('es6-promise');

const API_URL = 'http://gophorapi.demoappstore.com/api/';
export default  (endpoint, method = 'get', headerToken, body) =>
  fetch(`${API_URL}${endpoint}`, {
  headers: { 'content-type': 'application/json', 'authentication': headerToken },
  method,
  body: JSON.stringify(body),
})
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
      console.log("Api Request ==> "+ `${API_URL}${endpoint}` +" Token=> "+headerToken +"  Body =>",body );
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error,
);
