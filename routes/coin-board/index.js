const express = require("express")
const controller = require("./controller.js")
const router = express.Router()

router.get('',controller.SelectAll)
router.get('/:id',controller.SelectOne)
router.post('',controller.InsertOne)
router.put('/view/:id',controller.UpdateView)
router.put('/:id',controller.UpdateOne)
router.delete('/:id',controller.DeleteOne)
module.exports = router