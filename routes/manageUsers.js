const ManageUsersController = require('../controllers/ManageUsersController');

const router = require('express').Router();

//Router To Render Managers Page
router.get('/', ManageUsersController.renderPage);

router.post('/createUser', ManageUsersController.createUser);

router.post('/editUser/:userId', ManageUsersController.editUser);

router.delete('/deleteUser/:userId', ManageUsersController.deleteUser);

router.get('/getAllUsers', ManageUsersController.getAllUsers);

module.exports = router;