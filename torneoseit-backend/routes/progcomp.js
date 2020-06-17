var express = require('express');
const models = require('../models');
const tournament = require('../models/tournament');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create/tournament', (req, res, next) => {
    const name = req.body['name'];
    const startDate = req.body['start'];
    const endDate = req.body['end'];
    const prices = req.body['prices'];
    const category = req.body['category'];
    const type = req.body['type'];
    const questions = req.body['questions'];
    
    if( name && startDate && endDate && prices && category && questions){
        models.tournament.create({
            name: name,
            start: startDate,
            end: endDate,
            type: type,
            prices: prices,
            category: category
        }).then(tournament => {
            if(tournament){
                // TODO: create row in questions table and relation between them
                res.json({
                    status: 1,
                    statusCode: 'progcomp/create/tournament',
                    data: questions
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'progcomp/create/tournament/error',
                    description: "Couldn't create tournament"
                  });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
              });
        })
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'progcomp/create/tournament/wrong-body',
            description: 'The body is wrong! :('
          });
    }
    var i = 0;

    questions.forEach( q => {
        console.log("Question",i++, q);
    });
});

module.exports = router;
