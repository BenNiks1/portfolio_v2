export const getTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}: ${date.getSeconds()}`;
};
