export const generateUserId = () => {
  return "SS-" + Math.random().toString(36).substring(2, 10);
};
