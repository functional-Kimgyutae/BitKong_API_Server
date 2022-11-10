const express = require("express")
const controller = require("./controller.js")
const router = express.Router()

router.get('/:id',controller.SelectOne)
router.post('',controller.InsertUser)
router.put('/:id',controller.UpdateUser)
router.post('/login',controller.LoginPro)
router.get('/exist/:id',controller.IdExist)

module.exports = router