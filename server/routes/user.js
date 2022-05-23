const express = require('express');
const router = express.Router();

// import controller
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { read, update, readAll } = require('../controllers/user');

router.get('/user/:id', requireSignin, read);
router.get('/user/all/:id', requireSignin, readAll);
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMiddleware, update);

module.exports = router;