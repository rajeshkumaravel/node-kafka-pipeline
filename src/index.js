const express         = require('express');

const kafka           = require('kafka-node');
const config          = require('../config/index');
const core            = require('../kafka-central-producer/core.producer');

const app             = express();
const PORT            = config.NODE_PORT;
const client          = new kafka.KafkaClient();
app.use(express.json());

/**
 * @description         - Function to check kafka topics are already created before app start
 * @throws {Exception}  - If topics mentioned in config file are not created
 */
/* eslint-disable */
let _TOPICSLIST = [];
for (const topic in config.KAFKA.TOPICS) {
  _TOPICSLIST.push(config.KAFKA.TOPICS[topic]);
}

let _availableTopics = {};
client.loadMetadataForTopics([], (e, r) => {
  if (e) {
    console.log(e);
  } else {
    if (r[1].metadata) {
      for (const topic in r[1].metadata) {
        _availableTopics[topic] = topic;
      }
      _TOPICSLIST.forEach((topic) => {
        if (!_availableTopics.hasOwnProperty(topic)) throw new Error(`Topic [ ${topic} ] is not available`);
      });
      /* eslint-enable */
    }
  }
});

app.post('/api/v1/save', (req, res) => {
  console.log('Request received');
  try {
    const _payLoad = JSON.stringify(req.body);
    core(config.KAFKA.TOPICS.C_VALIDATE_JSON, _payLoad);
    res.status(200);
    res.send({
      code: 200,
      message: 'Data received',
    });
  } catch (e) {
    res.status(400);
    res.send({
      code: 400,
      message: 'Bad request',
    });
  }
});

app.get('/api/v1/topics', (req, res) => {
  const admin = new kafka.Admin(client);
  admin.listTopics((err, _topicsList) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(_topicsList);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Node Server running at: http://localhost:${PORT}/`);
});
