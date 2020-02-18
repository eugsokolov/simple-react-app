var express = require('express');
var router = express.Router();

var array = new Array();

router.get('/sensor1', function(req, res, next) {
  res.send('API is working properly');
});

router.post('/sensor1', function(req, res, next) {
  const val = parseInt(req.body.value);
  const time = new Date(req.body.time);

  console.log('server got a value:', val, time);

  if (!isNaN(val)) {
    array.push({ time, val });
    const cutoff = new Date();
    cutoff.setMinutes(cutoff.getMinutes() - 1);
    array = array.filter(item => item.time > cutoff);
    sum = array.reduce((a, b) => a + b.val, 0);
    const movingAverage = sum / array.length;
    console.log('debug', sum, array.length, movingAverage);
    res.send(movingAverage.toString());
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
