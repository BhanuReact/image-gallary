import axios from 'axios';


const API = axios.create({
  baseURL: 'https://pixabay.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    key: "27530356-f6edef595d19a3abfbeaaa6e8",
    safesearch: true,
  },
});

export default API;