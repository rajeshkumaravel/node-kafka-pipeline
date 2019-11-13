/**
 * @author                    : RAJESH K
 * @description               : Centralized Kafka producer to initiate action for consumer thru broker with data
 * @param  {String} _TOPIC    : Topic name to be initiated
 * @param  {Array} _PAYLOAD   : JSON array
 */

/* eslint-disable no-unused-vars */
const kafka = require('kafka-node');
const CONFIG = require('../config/index');

function _coreProducer(_TOPIC, _PAYLOAD) {
  try {
    const { Producer } = kafka;
    const client = new kafka.KafkaClient(CONFIG.KAFKA.SERVER);
    client.refreshMetadata([_TOPIC], (err) => {
      if (err) {
        console.warn('Error refreshing kafka metadata', err);
      }
    });
    const producer = new Producer(client);
    const payloads = [
      {
        topic: _TOPIC,
        messages: _PAYLOAD,
      },
    ];

    producer.on('ready', async () => {
      const status = producer.send(payloads, (err, data) => {
        if (err) {
          console.log(`[kafka-producer -> ${_TOPIC}]: broker update failed`);
        } else {
          console.log(`[kafka-producer -> ${_TOPIC}]: broker update success`);
        }
      });
    });

    producer.on('error', (err) => {
      console.log(err);
      console.log(`[kafka-producer -> ${_TOPIC}]: connection errored`);
      throw err;
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = _coreProducer;
