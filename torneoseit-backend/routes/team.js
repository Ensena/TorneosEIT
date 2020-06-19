var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
    name = req.body['name'];
    member = req.body['member'];
    if(name && member){
        models.team.create({
            name: name,
            member: [member]
        }).then( team => {
            if(team){
                res.json({
                    status: 1,
                    statusCode: 'team/',
                    data: {name, member}
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'team/error',
                    description: "Couldn't create team"
                  });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'team/wrong-body',
            description: 'The body is wrong! :('
          });
    }
    
});

module.exports = router;
