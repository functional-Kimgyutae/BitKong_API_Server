const express = require("express")
const controller = require("./controller.js")
const router = express.Router()

router.get('/:id',controller.SelectAll)
router.post('/:id',controller.InsertOne)

module.exports = router