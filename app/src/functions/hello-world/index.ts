export const handler = async () => {
  const message = `Hello World cron function executing at ${new Date()}`;
  console.log(message);
  return message;
};