/**
 * @description : Start `consumers` present in `CONSUMERS_PATH` and create log file for each
 */
const fs              = require('fs');
const forever         = require('forever-monitor');

const CONSUMERS_PATH  = './kafka-consumers/';

fs.readdir(CONSUMERS_PATH, (err, consumer) => {
  if (err) {
    throw new Error(err);
  } else if (consumer.length > 0) {
    consumer.forEach((filePath) => {
      const child = new (forever.Monitor)(CONSUMERS_PATH + filePath, {
        max: 1,
        silent: true,
        /* eslint-disable */
        logFile: './logs/' + filePath.split('.')[0] + '_log.log',
        outFile: './logs/' + filePath.split('.')[0] + '_out.log',
        errFile: './logs/' + filePath.split('.')[0] + '_err.log',
        /* eslint-enable */
      });

      child.on('exit', () => {
        console.log(`${filePath} has exited after 3 restarts`);
      });
      child.start();
    });
  } else {
    throw new Error('[ No consumers defined ]');
  }
});
