const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const authController = require('../controllers/auth')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/deleteUser', auth, authController.deleteUser)
router.post('/tokenValidate', authController.tokenValidate)

// router.post('logout', authController.logout)

module.exports = router