const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

// Models

const User = require('../models/User.js');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds).then((hash) => {
    
    const user = new User({
      username,
      password: hash
    });
  
    const promise = user.save();
  
    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
       res.json(err)
     });
    });

  });

  router.post('/authenticate', (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({
      username
    }, 
    (err, user) => {
      if(err)
        throw err;

      if(!user){
        res.json({
          status: false,
          message: 'Authenticaion Failed, User Not Found'
        });
      }
      else{
        bcrypt.compare(password, user.password).then((result) => {
          if(!result){
            res.json({
              status: false,
              message: 'Authenticaion Failed, Wrong Password'
            });
          }
          else{
            const payload = {
              username
            };
            const token = jwt.sign(payload, req.app.get('api_secret_key'), { expiresIn: 720 });
            res.json({
              status: 1,
              token,
            });
          }
        });
      }

    });

  });

module.exports = router;
