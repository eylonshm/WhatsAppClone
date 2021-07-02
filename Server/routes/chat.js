const express = require('express')
const router = express.Router()

const chatController = require('../controllers/chat')

router.get('/getChats/:userId', chatController.getChats) 
router.get('/getChatMessages/:chatId', chatController.getChatMessages)
router.post('/sendMessage/:chatId', chatController.sendMessage)

module.exports = router

