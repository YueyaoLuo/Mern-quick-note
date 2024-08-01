// routes/api/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const notesCtrl = require('../../controllers/api/notes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', usersCtrl.checkToken);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.post('/notes', ensureLoggedIn, notesCtrl.create);
router.get('/notes', ensureLoggedIn, notesCtrl.index);
module.exports = router;
