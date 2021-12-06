import axios from 'axios';
import * as rax from 'retry-axios';
import 'dotenv/config';

const marketAuth = axios.create({
  baseURL: process.env.AUTH_API,
  timeout: 10000,
  headers: {
      'Content-Type': 'application/json'
  },
  raxConfig: {
      onRetryAttempt: err => {
          const cfg = rax.getConfig(err);
          console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
      }
  }
});
rax.attach(marketAuth);

async function getToken(): Promise<any> {
  const res = await marketAuth(
      {
          url: '/api/v1/auth/login',
          method: 'POST',
          data: {
              'login': process.env.AUTH_USERNAME,
              'password': process.env.AUTH_PASS
          }
      });
    
      return `Bearer ${res.data.authorization.token}`;
}

export default {
    getToken
}