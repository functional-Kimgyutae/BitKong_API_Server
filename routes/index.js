const express = require('express')
const user = require('./user/index')
const coinWallet = require('./coin-wallet/index')
const coinBoard = require('./coin-board/index')
const executionHistory = require('./execution-history/index')
const chargingHistory = require('./charging-history/index')
const serviceCenter = require('./service-center/index')
const router = express.Router();

// router.use('/main',main)
router.use('/user',user);
router.use('/coin-wallet',coinWallet);
// router.use('/coin-board',coinBoard);
router.use('/execution-history',executionHistory);
router.use('/charging-history',chargingHistory);
// router.use('/service-center',serviceCenter);




module.exports = router;