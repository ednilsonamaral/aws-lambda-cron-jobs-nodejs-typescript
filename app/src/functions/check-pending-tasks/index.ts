import AuthAPI from '../../integrations/auth/api';
import API from '../../integrations/api/api';
import PubApi from '../../integrations/pub/api';

export const handler = async () => {
  const token = await AuthAPI.getToken();
  const tasks = await API.getPendingTasksToSend(token);

  for (let task of tasks) {
    const bodyPending = {
      message: 'schedule-due',
      messageBody: task
    };

    let status = 'SENT';

    try {
      const sendMessage = await PubApi.sendMessage(token, bodyPending);
    } catch (error) {
      status = 'ERROR';
    } finally {
      let updateSchedule = {
        sentAt: new Date(),
        status
      };

      const update = await API.updateTask(token, updateSchedule, task.id);
    }
  };

  return true;
}