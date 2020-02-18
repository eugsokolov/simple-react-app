var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  /* Simple login function */
  const user = req.body.userName;
  const pass = req.body.password;
  if (user === 'admin@example.com' && pass === 'password') {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
