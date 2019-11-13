module.exports = {
  NODE_PORT: 3303,
  KAFKA: {
    SERVER: 'localhost:2181',
    TOPICS: {
      C_VALIDATE_JSON: 'validateJSON',
      C_WRITE_DB: 'saveData',
    },
  },
};
