/**
 * @author      : RAJESH K
 * @description : Consumer for topic `C_VALIDATE_JSON`; to validate request JSON schema
 */
const kafka           = require('kafka-node');
const CONFIG          = require('../config/index');
const jsonValidator   = require('../utils/json-schema.validator');
const core            = require('../kafka-central-producer/core.producer');

const _TOPIC          = CONFIG.KAFKA.TOPICS.C_VALIDATE_JSON;
try {
  const { Consumer }  = kafka;
  const client        = new kafka.KafkaClient(CONFIG.KAFKA.SERVER);
  const consumer      = new Consumer(
    client,
    [{ topic: _TOPIC, partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      keyEncoding: 'utf8',
      fromOffset: false,
    },
  );
  consumer.on('message', async (message) => {
    console.log(`Message received at ${_TOPIC}. Message [ `, message.value, ' ]');
    jsonValidator('userSchema', JSON.parse(message.value), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Message at ${_TOPIC} validated. Message [ `, message.value, ' ]');
        // Call Write data consumer
        core(CONFIG.KAFKA.TOPICS.C_WRITE_DB, message.value);
      }
    });
  });
  consumer.on('error', (err) => {
    console.log(`${_TOPIC} topic error =>`, err);
  });
} catch (e) {
  console.log(e);
}
