const logger = (loggingType) => (store) => (next) => (action) => {
  console.log("Logging", loggingType);
  next(action);
};

export default logger;
