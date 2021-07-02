const {db} = require('../firebase')

exports.getChats = async (req, res, next) => {
    const userId = req.params.userId
    const userDoc = await db.collection('users').doc(userId).get()
    try {
        if(!userDoc) {
            const error = new Error('no User Found!')
            error.statusCode = 404
            throw error
        }
        const userChats = userDoc.data().chats
        //UserChats = [ID,ID,ID]
        res.status(200).json({
            message: 'UserChats fetched successfully.',
            userChats: userChats
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getChatMessages = async (req, res, next) => {
    const chatId = req.params.chatId
    const collectionRef = db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timeStamp', 'asc')
    try {
        const chatsQuerySnapshot  = await collectionRef.get()
        const chatData = chatsQuerySnapshot.docs.map(msg => {
            return {
                authorID: msg.data().authorID,
                messageContent: msg.data().messageContent,
                timeStamp: msg.data().timeStamp,
            }})
        //Chat Data = [{},{},{}]
        res.status(200).json({
            message: 'Chat Has Found',
            chatData: chatData
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.sendMessage = async (req, res, next) => {
    console.log('SENDING')
    const chatId = req.params.chatId
    const message = {
        messageContent: req.body.message.messageContent,
        authorID: req.body.message.authorID,
        timeStamp: req.body.message.timeStamp,
    }
    try {
        await db.collection('chats').doc(chatId).collection('messages').add(message)
        res.status(201).json({
            message: 'Message created successfully!'
        }) 
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
    }
}