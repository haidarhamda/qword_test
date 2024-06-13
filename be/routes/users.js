var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const userController = require('./controllers/userController');
router.post('/login',userController.login);
router.post('/register',userController.register);

module.exports = router;
