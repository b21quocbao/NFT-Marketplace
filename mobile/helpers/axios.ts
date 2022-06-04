import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `http://192.168.1.102:5007/api`,
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ipfsAxiosInstance = axios.create({
  baseURL: `https://ipfs.infura.io:5001/api/v0`,
  timeout: 5000,
});