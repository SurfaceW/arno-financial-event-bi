import axios from 'axios';

const ax = axios.create({
  // 10s timeout
  timeout: 10 * 1000,
});

export default ax;
