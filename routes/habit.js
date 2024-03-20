const express = require('express');

const router = express.Router();
const habitController = require('../controllers/habit_controller');

// create a new habit
router.post('/create-habit', habitController.createHabit);
// change the status of the habit
router.get('/toggle-status', habitController.toggleStatus);
// delete habit
router.get('/delete-habit', habitController.deleteHabit);
// update habit
router.post('/edit-habit', habitController.editHabit);

module.exports = router;