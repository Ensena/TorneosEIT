var express = require('express');
const models = require('../models');
const multer = require('multer');
const { sequelize, Sequelize } = require('../models');
const { Op } = Sequelize.Op;

const spawn = require("child_process").spawn;

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/Thomas/Documents/Universidad/11vo Semestre/TorneosEIT/torneoseit-backend/uploads')
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

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  
});

router.get('/ranking/personal/:id', (req, res) => {
  const tournamentId = req.params.id;
  if(tournamentId){
    models.tournament.findOne({
      where: {
        id: tournamentId
      },
      include: ['questions']
    }).then( async(tournament) => {
      const tournamentJSON = tournament.toJSON();
      console.log(tournamentJSON);
      if(tournamentJSON){
        var questionIds = [];
        console.log(tournamentJSON.questions);

        for(let i=0; i < tournamentJSON.questions.length; i++){
          questionIds.push(tournamentJSON.questions[i].id);
        }

        const countAccepted = await models.submission.findAll({
          group: 'contestant_rut',
          // order: sequelize.fn('count', 'id'),
          attributes: ['contestant_rut', [sequelize.fn('count', sequelize.col('submission.id')), 'count']],
          where: {
            id: {[Sequelize.Op.in]: questionIds},
            createdAt: {[Sequelize.Op.gte]: tournamentJSON.createdAt},
            status: {[Sequelize.Op.eq]: 1}
          }
        });
          
        const sumMinutes = await models.submission.findAll({
          group: 'contestant_rut',
          // order: sequelize.fn('count', 'id'),
          attributes: ['contestant_rut', [models.sequelize.literal(`sum(CASE WHEN status = 1 THEN (EXTRACT(epoch from ("submission"."createdAt" - '${tournamentJSON.createdAt.toISOString()}')/60)) ELSE 30 END)`), 'minutes']],
          where: {
            id: {[Sequelize.Op.in]: questionIds},
            createdAt: {[Sequelize.Op.gte]: tournamentJSON.createdAt}
          }
        });

        //SELECT contestant_rut, count(*), T.sum FROM submissions, 
        //   (SELECT contestant_rut, sum(CASE WHEN status = 1 THEN (EXTRACT(epoch from (submissions.createdAt - '${tournamentJSON.createdAt.toISOString()}')/60)) ELSE 30 END) 
      //  FROM submissions where status != 0 GROUP BY contestant_rut) as T
        //  where status = 1 and submissions.contestant_rut = T.contestant_rut GROUP BY contestant_rut ORDER BY count(*), T.sum DESC

      } else {

      }
    })
  } else {

  }
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

  scriptPath = "/Users/Thomas/Documents/Universidad/11vo Semestre/TorneosEIT/torneoseit-backend/submit_problem.py"

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
                description: error.toString()
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
    }).catch(err => {
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


module.exports = router;
