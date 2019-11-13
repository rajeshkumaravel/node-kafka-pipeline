/**
 * @author      : RAJESH K
 * @description : Consumer for topic `C_WRITE_DB`; to write request data to database
 */
const kafka   = require('kafka-node');
const CONFIG  = require('../config/index');

const _TOPIC  = CONFIG.KAFKA.TOPICS.C_WRITE_DB;
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
    console.log(`Message received at ${_TOPIC}. Message [ `, message, ' ]');
    console.log(JSON.parse(message.value));
  });
  consumer.on('error', (err) => {
    console.log(`${_TOPIC} topic error =>`, err);
  });
} catch (e) {
  console.log(e);
}
