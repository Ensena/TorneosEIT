var express = require('express');
var router = express.Router();
const models = require('../models');
const contestant = require('../models/contestant');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', (req, res, next) => {
    rut = req.body['rut'];
    name = req.body['name'];
    teamId = req.body['team_id'];
    if(rut){
        models.contestant.findOne({
            where: {
                rut: rut
            }
        }).then( contestantExists =>{
            if(!contestantExists){
                models.contestant.create({
                    rut: rut,
                    name: name
                }); //should get the errors
            } 
        }).then( trash => {
            models.team.findOne({ 
                where: {
                    id: teamId
                }
            }).then(team => {
                if(team){
                    team.addMembers(rut)
                    res.json({
                        status: 1,
                        statusCode: 'team/add',
                        data: team.name
                    });    
                } else {
                    res.json({
                        status: 0,
                        statusCode: 'team/add/error',
                        description: "Couldn't add contestant to the team"
                    });   
                }
            }).catch(error => {
                res.status(400).json({
                  status: 0,
                  statusCode: 'database/error',
                  description: error.toString()
                });
            });
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
            statusCode: 'team/add/wrong-body',
            description: 'The body is wrong! :('
        });
    }
})

router.post('/', (req, res, next) => {
    name = req.body['name'];
    member = req.body['member'];
    if(name && member){
        models.contestant.findOne({
            where: {
                rut: member
            }
        }).then( memberExists =>{
            if(!memberExists){
                models.contestant.create({
                    rut: member,
                }).then(newContestant => {
                    if(!newContestant){
                        res.status(400).json({
                            status: 0,
                            statusCode: 'team/CreateContestantError',
                            description: "Couldn't create contestant"
                        });
                    }
                }).catch(error => {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'database/error',
                        description: error.toString()
                    });
                });
            }
        }).then( useless => {
            models.team.findOne({where: {name: name}}).then(exists => {
                if(exists){
                    res.status(400).json({
                        status: 0,
                        statusCode: 'team/error',
                        description: "Couldn't create team, that name is taken"
                    });
                } else {
                    models.team.create({
                        name: name,
                    }).then( team => {
                        if(team){
                            team.addMembers(member);
    
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
                }
            }).catch(error => {
                res.status(400).json({
                    status: 0,
                    statusCode: 'database/error',
                    description: error.toString()
                });
            });
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
