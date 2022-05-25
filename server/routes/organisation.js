const express = require('express');
const router = express.Router();

// import controller
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { read, update, readAll, create } = require('../controllers/organisation');

router.get('/organisation/:id', requireSignin, read);
router.get('/organisation/all', readAll);
router.put('/organisation/update', requireSignin, update);
router.put('/organisation/update', requireSignin, adminMiddleware, update);
router.post('/organisation/create', create);

module.exports = router;