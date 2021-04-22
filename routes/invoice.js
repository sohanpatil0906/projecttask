const InvoiceController = require('../controllers/InvoiceController');

const router = require('express').Router();

//Router To Render Managers Page
router.get('/', InvoiceController.renderPage);

module.exports = router;