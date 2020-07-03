var express = require('express');
const models = require('../models');
const multer = require('multer');
const fetch = require('node-fetch');
const { sequelize, Sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const { Op } = Sequelize.Op;

const spawn = require("child_process").spawn;

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.BACKEND_ROUTE +'/uploads')
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, file.fieldname + '-' + Date.now() + ext)
    }
  })
   
var upload = multer({ storage: storage })

var router = express.Router();

const createUserIfNotExist = (rut, name) => {
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
  });
}

router.get('/submissions', (req, res, next) => {
  const rut = req.body['rut'];
  if(rut){
    
    models.submission.findAll({
      where: {
        
      }
    })
  } else {

  }
});

router.put('/submissions/update', (req, res, next) => {
  var submissionId = parseInt(req.body['submission_id']);
  if(submissionId){
    urlSubmissionId = submissionId-1;
    const URL = 'https://uhunt.onlinejudge.org/api/subs-user/1151134/' + urlSubmissionId;
    console.log("El sub id: ",submissionId)
    console.log(" URL: ", URL)
    fetch(URL)
    .then(res => res.json())
    .then((data) => {
      const match = data.subs.filter(inner => inner[0] === submissionId)[0];
      console.log("match", match);
      var status;
      if(match[2] === 90){
        status = 1;
      } else if(match[2] === 50){
        status = 3;
      } else if(match[2] === 30){
        status = 4;
      } else if(match[2] === 20){
        status = 0;
      } else {
        status = 2;
      }
      console.log("status", status);

      models.submission.update({status: status}, {
        where: {
          id: submissionId
        }
      }).then(updated => {
        if (updated) {
          res.json({
            status: 1,
            statusCode: 'status/update-found',
            data: {submissionId, status}
          });
        } else {
          res.json({
            status: 0,
            statusCode: 'status/update-not-found',
            description: 'submission id not found'
          });
        }
      });
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
      statusCode: 'tournament/wrong-parameter',
      description: 'The parameters are wrong! :('
    });
  }
  
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  
});

router.get('/ranking/personal/:id', async (req, res) => {
  const tournamentId = req.params.id;

  const people = await sequelize.query(`
  with startdate as ( select start from tournaments where id = ${tournamentId} ),
  questions as ( select "questionId" as question_id from tournament_questions where "tournamentId" = ${tournamentId} ),
  submissions2 as ( select * from submissions where "questionId" in (select question_id from questions) ),
  ans as (
    select s."contestantRut", count(*) as accepted,
    sum(CASE WHEN s.status = 1 THEN (ROUND(EXTRACT(epoch from (startdate.start - s."createdAt")/60))) ELSE 30 END) as time
    from submissions2 s, startdate
    where s."contestantRut" is not null
    group by s."contestantRut" order by accepted, time
  )
  select name, ans.* from contestants, ans where contestants.rut = ans."contestantRut";`, { type: QueryTypes.SELECT });

  console.log(people);

  res.json({
    status: 1,
    statusCode: 'people/ranking',
    data: people
  });  
});

router.get('/ranking/team/:id', async (req, res) => {
  const tournamentId = req.params.id;

  const people = await sequelize.query(`
    with startdate as ( select start from tournaments where id = ${tournamentId} ),
    questions as ( select "questionId" as question_id from tournament_questions where "tournamentId" = ${tournamentId} ),
    submissions2 as ( select * from submissions where "questionId" in (select question_id from questions) ),
    ans as (
        select s."teamId", count(*) as accepted,
        sum(CASE WHEN s.status = 1 THEN (ROUND(EXTRACT(epoch from (startdate.start - s."createdAt")/60))) ELSE 30 END) as time
        from submissions2 s, startdate
        where s."teamId" is not null
        group by s."teamId" order by accepted, time
    )
    select name, ans.* from teams, ans where teams.id = ans."teamId";`, { type: QueryTypes.SELECT });

  res.json({
    status: 1,
    statusCode: 'people/ranking',
    data: people
  });  
});

router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
    if (id) {
        models.tournament.findOne({
            where: {
                id: id
            },
            include: ['questions']
        }).then( tournament => {
            if (tournament) {
                res.json({
                  status: 1,
                  statusCode: 'tournament/found',
                  data: tournament.toJSON()
                });
              } else {
                res.status(400).json({
                  status: 0,
                  statusCode: 'tournament/not-found',
                  description: "Couldn't find the tournament"
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
            statusCode: 'tournament/wrong-parameter',
            description: 'The parameters are wrong! :('
        });
    }
});

router.post('/create/tournament', upload.array('files'), (req, res, next) => {
    const name = req.body['name'];
    const startDate = req.body['start'];
    const endDate = req.body['end'];
    const prices = req.body['prices'];
    const category = req.body['category'];
    const type = req.body['type'];
    const questions = req.body['questions'];
    
    // TODO: check if the user is a teacher
    if( name && startDate && endDate && category && questions && req.files.length >= 1){
        models.tournament.create({
            name: name,
            start: startDate,
            end: endDate,
            type: type,
            category: category,
            prices: prices ? prices : "",
        }).then(tournament => {
            if(tournament){
                for(let i=0; i < questions.length; i++){
                  models.question.findOne({
                    where: {
                      judge: questions[i]['judge'],
                      judgeid: questions[i]['id']
                    }
                  }).then( questionExists => {
                    if(!questionExists){
                      models.question.create({
                        name: questions[i]['name'],
                        judge: questions[i]['judge'],
                        judgeid: questions[i]['id'],
                        file: req.files[i].path
                      }).then( question => {
                        if (!question) {
                          res.status(400).json({
                            status: 0,
                            statusCode: 'progcomp/create/tournament/error',
                            description: "Couldn't create question " + fileIndex-1 + " for the tournament"
                          });
                        } else {
                          question.addTournaments(tournament.id)
                        }
                      }).catch(error => {
                        res.status(400).json({
                          status: 0,
                          statusCode: 'database/question/error',
                          description: error.toString()
                        });
                      });
                    } else {
                      questionExists.addTournaments(tournament.id)
                    }
                  });
                }

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
});

router.post('/submit', upload.single('file'), (req, res, next) => {
  const questionId = req.body['question_id'];
  const lang = req.body['lang'];
  const file = req.file;
  const code = req.body['code'];
  const contestantRut = req.body['contestant_rut'];
  const teamId = req.body['team_id'];
  var submissionId;
  var submissionStatus;

  scriptPath = process.env.BACKEND_ROUTE +"/submit_problem.py"

  if (questionId && lang && (file || code) && (contestantRut || teamId)){
    models.question.findOne({
      where: {
        id: questionId
      }
    }).then( question => {
      if(question){
        const pythonProcess = spawn('python3',[scriptPath, 'eit0', 'torneoseit', question.judgeid, lang, req.file.path, 0]);
  
        pythonProcess.stdout.on('data', (data) => {
          console.log(data.toString());
          var parsedData = data.toString();
          var separatedData = parsedData.split(",");
          submissionId = separatedData[0].trim();
          submissionStatus = separatedData[1];
        });
  
  
        // pythonProcess.stderr.on('data', (data) => {
        //   res.json({
        //     status: 0,
        //     statusCode: 'progcomp/submit/error',
        //     description: "Received an error from the submission script",
        //     error: data.toString()
        //   });
        // });
  
        pythonProcess.on('exit', (code) => {
          console.log("Python process quit with code : " + code);
          
          if(code != 0){
            res.json({
              status: 0,
              statusCode: 'progcomp/submit/error',
              description: "Received an error from the submission script"
            });
          } else {
            models.submission.create({
              id: submissionId,
              status: submissionStatus,
              languaje: lang,
              code: code,
              file: req.file.path,
              contestantRut: contestantRut,
              teamId: teamId,
              questionId: questionId
            }).then( submission => {
              if(submission){
                res.json({
                  status: 1,
                  statusCode: 'progcomp/submit',
                  data: {submissionId, submissionStatus}
                });
              } else {
                res.status(400).json({
                  status: 0,
                  statusCode: 'progcomp/submit',
                  description: "Couldn't create submission"
                });
              }
            }).catch(err => {
              res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: err.toString()
              });
            });
          }
        });
      } else {
        res.status(400).json({
          status: 0,
          statusCode: 'progcomp/submit',
          description: "Question does not exist"
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
      statusCode: 'progcomp/submit',
      description: 'The body is wrong! :('
    });
  }
  
});

router.post('/add-team-to-tournament', async (req, res, next) => {
  const teamId = req.body.team_id;
  const tournamentId = req.body.tournament_id;

  let Tournament = await models.tournament.findOne({
    where: {
      id: tournamentId
    }
  });  

  Tournament.addTeams(teamId);
  res.json({
    status: 1,
    statusCode: 'tournament/added/team'
  });
});

router.post('/add-contestant-to-tournament', async (req, res, next) => {
  const contestantId = req.body.contestant_id;
  const tournamentId = req.body.tournament_id;

  let Tournament = await models.tournament.findOne({
    where: {
      id: tournamentId
    }
  });  

  Tournament.addContestants(contestantId);
  res.json({
    status: 1,
    statusCode: 'tournament/added/contestant'
  });
});

module.exports = router;
