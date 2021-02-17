const AuthController = require('../controllers/AuthController');
const router = require('express').Router();

//Route To Render Log In Page
router.get('/login', AuthController.renderLoginPage);

//Route To Log In User
router.post('/login', AuthController.loginUser);

//Route To Logout User
router.get('/logout', AuthController.logoutUser);

//Route To Render Blank Page
router.get('/blank', AuthController.renderBlankPage);

module.exports = router;

