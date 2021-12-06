import axios from 'axios';
import * as rax from 'retry-axios';
import 'dotenv/config';

const pubApi = axios.create({
    baseURL: process.env.PUB_API,
    timeout: 300000,
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
rax.attach(pubApi);

async function sendMessage(token: string, body: any): Promise<any> {
    const res = await pubApi({
        url: `/api/v1/messages`,
        method: 'POST',
        headers: {
            'market-host': process.env.PROJECT_HOST,
            'Authorization': token
        },
        data: body
    });

    return res.data;
}

export default {
  sendMessage
}