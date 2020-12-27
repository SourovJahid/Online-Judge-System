const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')

router.get('/login', userController.loginPage)
router.post('/login', userController.login)

module.exports = router