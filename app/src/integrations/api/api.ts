import axios from 'axios';
import * as rax from 'retry-axios';
import 'dotenv/config';

const api = axios.create({
    baseURL: process.env.MARKET_API,
    timeout: 30000,
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
rax.attach(api);

async function getPendingTasksToSend(token: string): Promise<any> {
    const res = await api({
        url: `/api/v1/tasks/pending`,
        method: 'GET',
        headers: {
            'market-host': process.env.PROJECT_HOST,
            'Authorization': token
        }
    });
    
    return res.data.data;
}

async function updateTask(token: string, body: any, id: number): Promise<any> {
    const res = await api({
        url: `/api/v1/tasks/${id}`,
        method: 'PUT',
        headers: {
            'market-host': process.env.PROJECT_HOST,
            'Authorization': token
        },
        data: body
    });

    return res.data;
}

async function sendPendingTask(token: string, id: number): Promise<any> {
    const res = await api({
        url: `/api/v1/tasks/pending/${id}`,
        method: 'POST',
        headers: {
            'market-host': process.env.PROJECT_HOST,
            'Authorization': token
        }
    });

    return res.data;
}

export default {
    getPendingTasksToSend,
    updateTask,
    sendPendingTask
}