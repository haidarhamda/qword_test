var express = require('express');
var router = express.Router();

const paymentController = require('./controllers/paymentController');
router.get('/:userId', paymentController.getPayments);
router.get('/:email', paymentController.getPaymentsByEmail);
router.post('/', paymentController.createPayment);
module.exports = router;