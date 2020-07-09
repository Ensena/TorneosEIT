var express = require('express');
var router = express.Router();
const models = require('../models');
const contestant = require('../models/contestant');

/* GET users listing. */
router.get('/:rut', (req, res, next) => {
  const { rut } = req.params;
  if (rut) {
    models.contestant
      .findOne({
        where: {
          rut: rut,
        },
        include: {
          model: models.team,
          as: 'teams',
          include: {
            model: models.contestant,
            as: 'members',
          },
        },
      })
      .then((teams) => {
        if (teams) {
          res.json({
            status: 1,
            statusCode: 'team/found',
            data: teams.toJSON(),
          });
        } else {
          res.status(400).json({
            status: 0,
            statusCode: 'team/not-found',
            description: "Couldn't find the teams or the user",
          });
        }
      });
  } else {
    res.status(400).json({
      status: 0,
      statusCode: 'team/wrong-body',
      description: 'The body is wrong! :(',
    });
  }
});

router.post('/add', (req, res, next) => {
  console.log(req.body);
  const rut = req.body['rut'];
  const teamId = req.body['team_id'];
  if (rut) {
    models.contestant
      .findOne({
        where: {
          rut: rut,
        },
      })
      .then((contestantExists) => {
        if (!contestantExists) {
          res.json({
            status: 0,
            statusCode: 'team/add/error',
            description: "Couldn't add contestant to the team",
          });
        }
      })
      .then((trash) => {
        models.team
          .findOne({
            where: {
              id: teamId,
            },
          })
          .then((team) => {
            if (team) {
              team.addMembers(rut);
              res.json({
                status: 1,
                statusCode: 'team/add',
                data: team.name,
              });
            } else {
              res.json({
                status: 0,
                statusCode: 'team/add/error',
                description: "Couldn't add contestant to the team",
              });
            }
          })
          .catch((error) => {
            res.status(400).json({
              status: 0,
              statusCode: 'database/error',
              description: error.toString(),
            });
          });
      })
      .catch((error) => {
        res.status(400).json({
          status: 0,
          statusCode: 'database/error',
          description: error.toString(),
        });
      });
  } else {
    res.status(400).json({
      status: 0,
      statusCode: 'team/add/wrong-body',
      description: 'The body is wrong! :(',
    });
  }
});

router.post('/', (req, res, next) => {
  name = req.body['name'];
  member = req.body['member'];
  if (name && member) {
    models.contestant
      .findOne({
        where: {
          rut: member,
        },
      })
      .then((memberExists) => {
        if (!memberExists) {
          models.contestant
            .create({
              rut: member,
            })
            .then((newContestant) => {
              if (!newContestant) {
                res.status(400).json({
                  status: 0,
                  statusCode: 'team/CreateContestantError',
                  description: "Couldn't create contestant",
                });
              }
            })
            .catch((error) => {
              res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString(),
              });
            });
        }
      })
      .then((useless) => {
        models.team
          .findOne({ where: { name: name } })
          .then((exists) => {
            if (exists) {
              res.status(400).json({
                status: 0,
                statusCode: 'team/error',
                description: "Couldn't create team, that name is taken",
              });
            } else {
              models.team
                .create({
                  name: name,
                  ownerid: member,
                })
                .then((team) => {
                  if (team) {
                    team.addMembers(member);
                    res.json({
                      status: 1,
                      statusCode: 'team/',
                      data: { name, member },
                    });
                  } else {
                    res.status(400).json({
                      status: 0,
                      statusCode: 'team/error',
                      description: "Couldn't create team",
                    });
                  }
                })
                .catch((error) => {
                  res.status(400).json({
                    status: 0,
                    statusCode: 'database/error',
                    description: error.toString(),
                  });
                });
            }
          })
          .catch((error) => {
            res.status(400).json({
              status: 0,
              statusCode: 'database/error',
              description: error.toString(),
            });
          });
      })
      .catch((error) => {
        res.status(400).json({
          status: 0,
          statusCode: 'database/error',
          description: error.toString(),
        });
      });
  } else {
    res.status(400).json({
      status: 0,
      statusCode: 'team/wrong-body',
      description: 'The body is wrong! :(',
    });
  }
});

router.delete('/delete', (req, res, next) => {
  const userId = req.body['rut_usuario'];
  const teamId = req.body['team_id'];
  if (userId && teamId) {
    models.team
      .findOne({
        where: {
          id: teamId,
        },
      })
      .then((team) => {
        if (team) {
          team.removeMember(userId);
          res.json({
            status: 1,
            statusCode: 'user/delete-found',
            description: 'user removed successfully from the team',
          });
        } else {
          res.status(400).json({
            status: 0,
            statusCode: 'team/not-found',
            description: "Couldn't find the team",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: 0,
          statusCode: 'database/error',
          description: error.toString(),
        });
      });
  } else {
    res.status(400).json({
      status: 0,
      statusCode: 'team/wrong-body',
      description: 'The body is wrong! :(',
    });
  }
});

module.exports = router;
