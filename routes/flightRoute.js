const express = require('express');
const router = express.Router();
const controller = require('../controllers/flightController');

router.route('/').get(controller.getAllFlights).post(controller.addFlight);
router.route('/:id').get(controller.getOneFlight).put(controller.updateFlight).delete(controller.deleteFlight);

module.exports = router;

