var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', (req, res, next) => {
  const name = req.body['name'];
  const rut = req.body['rut'];
  const power = req.body['power'];

  if (name && rut && power !== null) {
    models.contestant
      .create({
        name: name,
        rut: rut,
        power: power,
      })
      .then((contestant) => {
        if (contestant) {
          res.json({
            status: 1,
            statusCode: 'user/create',
            data: rut,
          });
        } else {
          res.status(400).json({
            status: 0,
            statusCode: 'user/create',
            description: "Couldn't create contestant",
          });
        }
      })
      .catch((err) => {
        console.log(err.toString());
        res.status(400).json({
          status: 0,
          statusCode: 'database/error',
          description: err.toString(),
        });
      });
  } else {
    res.status(400).json({
      status: 0,
      statusCode: 'user/create/wrong-body',
      description: 'The body is wrong! :(',
    });
  }
});

module.exports = router;
