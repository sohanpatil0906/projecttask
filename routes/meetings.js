const MeetingsController = require('../controllers/MeetingsController');

const router = require('express').Router();

//Router To Render Products
router.get('/', MeetingsController.renderPage);

router.post('/createMeeting', MeetingsController.createMeeting);

router.post('/editMeeting/:productId', MeetingsController.editMeeting);

router.delete('/deleteMeeting/:productId', MeetingsController.deleteMeeting);

router.get('/getAllMeetings', MeetingsController.getAllMeetings);

module.exports = router;