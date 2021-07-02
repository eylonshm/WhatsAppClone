import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'
import AttachFile from '@material-ui/icons/AttachFile'
import Mic from '@material-ui/icons/Mic'
import Send from '@material-ui/icons/Send'
import ChatHeader from './ChatHeader/ChatHeader'
import Message from '../Message/Message'
import DateTag from '../DateTag/DateTag'
import { connect } from 'react-redux'

const Chat = (props) => {
  const [isTyping, setIsTyping] = useState(false)
  const [inputMessageValue, setInputMessageValue] = useState('')
  const [chatMessages, setchatMessages] = useState([])

  const sendButton = isTyping ? <SendIcon /> : <MicIcon />
  // This is a Refernce for bottom scroll when sending a new message
  const ref = useRef()
  useEffect(() => {
    fetchAndSetMessages()
  }, [props.currentChatID])

  const fetchAndSetMessages = async () => {
    const chatMessagesResponse = await (await fetch(`http://localhost:8080/getChatMessages/${props.currentChatID}`)).json()
    const messages = chatMessagesResponse.chatData
    setchatMessages(messages)
    return null
  }
  const onChangeHandler = (event) => {
    setInputMessageValue(event.target.value)
    noRenders(event)
  }

  const noRenders = useCallback((event) => {
    if (event.target.value.length === 0) {
      setIsTyping(false)
    } else {
      setIsTyping(true)
    }
  }, [])

  const sendMessage = async (event) => {
    event.preventDefault()
    //Create The message
    const message = {
      messageContent: inputMessageValue,
      authorID: props.userUID,
      timeStamp: Date.now(),
    }
    //Clear Message Input at the end
    setInputMessageValue('')
    //Post message to FireBase/CurrentChatID/messages
    try {
      await fetch(`http://localhost:8080/sendMessage/${props.currentChatID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      })
      await fetchAndSetMessages()
      ref.current.scrollTop = ref.current.scrollHeight
    } catch (err) {
      console.log(err)
    }
  }
  let chatMessagesKeyCounter = 0
  return (
    <ChatWrapper>
      <ChatHeader />
      <ChatBody ref={ref}>
        <DateTag />
        {chatMessages.map((msg) => {
          chatMessagesKeyCounter++
          return (
            <Message
              key={chatMessagesKeyCounter}
              messageOwnerID={msg.authorID}
              messageContent={msg.messageContent}
              messageTimestamp={msg.timeStamp}
            />
          )
        })}
      </ChatBody>
      <ChatFooter>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <ChatFooterForm>
          <ChatFooterMessageInput value={inputMessageValue} placeholder='Type a message' type='text' onChange={onChangeHandler} />
          <ChatFooterFormButton type='submit' onClick={sendMessage} />
        </ChatFooterForm>
        <IconButton>{sendButton}</IconButton>
      </ChatFooter>
    </ChatWrapper>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  if (!state.auth.user) return { userUID: null, currentChatID: state.chats.currentChatID }
  return {
    userUID: state.auth.user.uid,
    currentChatID: state.chats.currentChatID,
  }
}

export default connect(mapStateToProps)(Chat)

const ChatWrapper = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
`
const ChatBody = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-repeat: repeat;
  background-position: center;
  padding: 30px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 4px;
    opacity: 0.2;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    opacity: 0.2;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgb(245, 245, 245);
    opacity: 0.4;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    opacity: 0.2;
  }
`
const ChatFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 62px;
`
const InsertEmoticonIcon = styled(InsertEmoticon)``
const AttachFileIcon = styled(AttachFile)`
  transform: rotate(315deg);
`
const MicIcon = styled(Mic)``
const SendIcon = styled(Send)``
const ChatFooterForm = styled.form`
  flex: 1;
  display: flex;
`
const ChatFooterFormButton = styled.button`
  display: none;
`
const ChatFooterMessageInput = styled.input`
  flex: 1;
  border-radius: 30px;
  padding: 13.5px;
  border: none;
  outline: none;
  color: rgba(0, 0, 0, 0.6);

  //PlaceHolder support all browsers
  &::-webkit-input-placeholder {
    color: darkgray;
  }

  &::-moz-placeholder {
    color: lightgray;
  }

  &::-ms-placeholder {
    color: lightgray;
  }

  &::placeholder {
    color: darkgray;
  }
`
